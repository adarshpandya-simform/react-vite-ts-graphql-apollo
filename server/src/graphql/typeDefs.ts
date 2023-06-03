export const typeDefs = /* GraphQL */ `
  type Todo {
    id: String!
    title: String!
    completed: Boolean!
    timestamp: String!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!, completed: Boolean): MutatedTodo!
    deleteTodo(id: String!): MutatedTodo!
    updateTodo(id: String!, title: String!, completed: Boolean!): MutatedTodo!
  }

  type MutatedTodo {
    todo: Todo
  }
`;
