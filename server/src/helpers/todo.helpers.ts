import { Todo, TodosModel } from '../models';

export type TodoWithId = Pick<Todo, 'completed' | 'timestamp' | 'title'> & {
  id: String;
};

export interface TodoMutationResponse {
  todo: TodoWithId | null;
}

export type GetTodosResponse = TodoWithId[] | null;

export const insertTodo = async (todo: Todo): Promise<TodoMutationResponse> => {
  const todoDocument = new TodosModel(todo);

  const { _id, title, timestamp, completed } = await todoDocument.save();
  return {
    todo: { id: _id.toString(), title, timestamp, completed },
  };
};

export const deleteTodo = async (id: string): Promise<TodoMutationResponse> => {
  const deletedTodo: TodoMutationResponse = await TodosModel.findByIdAndDelete(
    id
  )
    .lean()
    .then((todo) => {
      if (todo) {
        const { _id, title, completed, timestamp } = todo;
        return {
          todo: {
            id: _id.toString(),
            title: title,
            timestamp: timestamp,
            completed: completed,
          },
        };
      }
      return {
        todo: null,
      };
    });
  return deletedTodo;
};

export const updateTodo = async ({
  completed,
  title,
  id,
}: Required<
  Pick<TodoWithId, 'id' | 'completed' | 'title'>
>): Promise<TodoMutationResponse> => {
  const updatedTodo: TodoMutationResponse = await TodosModel.findByIdAndUpdate(
    id,
    { $set: { title, completed } },
    { new: true }
  )
    .lean()
    .then((todo) => {
      if (todo) {
        return {
          todo: {
            id: todo._id.toString(),
            title: todo.title,
            completed: todo.completed,
            timestamp: todo.timestamp,
          },
        };
      }
      return {
        todo: null,
      };
    });
  return updatedTodo;
};

export const getTodos = async (): Promise<GetTodosResponse> => {
  const todos: GetTodosResponse = await TodosModel.find()
    .lean()
    .then((todos) => {
      return todos.map(({ _id, title, completed, timestamp }) => ({
        id: _id.toString(),
        title: title,
        completed: completed,
        timestamp: timestamp,
      }));
    });

  return todos;
};
