import { deleteTodo, getTodos, insertTodo, updateTodo } from '../helpers';

export const resolvers = {
  Query: {
    todos: async () => await getTodos(),
  },

  Mutation: {
    addTodo: async (
      _: unknown,
      { title, completed }: { title: string; completed?: boolean }
    ) => await insertTodo({ title, completed }),

    deleteTodo: async (_: unknown, { id }: { id: string }) =>
      await deleteTodo(id),

    updateTodo: async (
      _: unknown,
      {
        id,
        title,
        completed,
      }: { id: string; title: string; completed: boolean }
    ) => await updateTodo({ id, completed, title }),
  },
};
