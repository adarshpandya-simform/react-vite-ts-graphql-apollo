import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  SxProps,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';

import { TodoStatus } from '../TodoFilter/TodoFilter';
import { DELETE_TODO_MUTATION } from '../../graphql/mutation/deleteTodoMutation';
import { GET_TODOS } from '../../graphql/queries/getTodos';
import { UPDATE_TODO_MUTATION } from '../../graphql/mutation/updateTodoMutation';
import { Todo } from '../TodosContainer/TodosContainer';

interface TodosListProps {
  todos: Todo[];
  filter: string;
}

interface DeleteTodoMutationVariables {
  id: string;
}

interface UpdateTodoMutationVariables {
  id: string;
  completed: boolean;
  title: string;
}

const getListItemStyle = (completed: boolean): SxProps => {
  const paddingX: SxProps = { paddingX: 0 };

  return completed
    ? { ...paddingX, background: '#EEEEEE' }
    : { ...paddingX, background: '#FFFFFF' };
};

const getListItemTextStyle = (completed: boolean): SxProps =>
  completed
    ? { color: 'gray', textDecoration: 'line-through' }
    : { color: 'black', textDecoration: 'none' };

const getDate = (timestamp: string): string =>
  new Date(+timestamp).toLocaleDateString();

export const TodosList: React.FC<TodosListProps> = ({ todos, filter }) => {
  const [deleteTodo] = useMutation<
    typeof DELETE_TODO_MUTATION,
    DeleteTodoMutationVariables
  >(DELETE_TODO_MUTATION, {
    refetchQueries: [GET_TODOS],
  });

  const [updateTodo] = useMutation<
    typeof UPDATE_TODO_MUTATION,
    UpdateTodoMutationVariables
  >(UPDATE_TODO_MUTATION, {
    refetchQueries: [GET_TODOS],
  });

  const handleDeletetodo = async (id: string): Promise<void> => {
    await deleteTodo({ variables: { id } });
  };

  const handleUpdateTodo = async (
    id: string,
    title: string,
    completed: boolean
  ): Promise<void> => {
    await updateTodo({
      variables: {
        completed: !completed,
        id,
        title,
      },
    });
  };

  if (todos.length === 0) {
    return <Typography color={'gray'}>No todos! Yayyyyy!</Typography>;
  }

  const filteredTodos =
    filter === TodoStatus.All
      ? todos
      : filter === TodoStatus.Complete
      ? todos.filter((todo) => todo.completed)
      : todos.filter((todo) => !todo.completed);

  return (
    <List>
      {filteredTodos.map(({ completed, id, title, timestamp }) => (
        <ListItem
          divider
          button
          sx={getListItemStyle(completed)}
          key={id}
          onClick={() => handleUpdateTodo(id, title, completed)}
        >
          <ListItemAvatar>
            <Checkbox
              onClick={() => handleUpdateTodo(id, title, completed)}
              checked={completed}
            />
          </ListItemAvatar>
          <ListItemText
            sx={getListItemTextStyle(completed)}
            primary={title}
            secondary={getDate(timestamp)}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => handleDeletetodo(id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
