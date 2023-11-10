import { gql } from '@apollo/client';

export const UPDATE_TODO_MUTATION = gql`
  mutation updateTodo($id: String!, $title: String!, $completed: Boolean!) {
    updateTodo(id: $id, title: $title, completed: $completed) {
      todo {
        id
        title
        completed
        timestamp
      }
    }
  }
`;
