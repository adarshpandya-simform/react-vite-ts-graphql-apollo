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

import { TodoStatus } from '../TodoFilter/TodoFilter';
import { useDeleteTodoMutation } from '../../graphql/generated/deleteTodoMutation.generated';
import { useUpdateTodoMutation } from '../../graphql/generated/updateTodoMutation.generated';
import { GetTodosDocument } from '../../graphql/generated/getTodos.generated';
import { Todo } from '../../graphql/generated/types';

interface TodosListProps {
  todos: Todo[];
  filter: string;
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
  const [deleteTodo] = useDeleteTodoMutation({
    refetchQueries: [GetTodosDocument],
  });

  const [updateTodo] = useUpdateTodoMutation({
    refetchQueries: [GetTodosDocument],
  });

  const handleDeletetodo = async (id: string): Promise<void> => {
    await deleteTodo({ variables: { id } });
  };

  const handleUpdateTodo = async ({
    completed,
    id,
    title,
  }: Omit<Todo, 'timestamp'>): Promise<void> => {
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
          onClick={() => handleUpdateTodo({ id, title, completed })}
        >
          <ListItemAvatar>
            <Checkbox
              onClick={() => handleUpdateTodo({ id, title, completed })}
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
