import { gql } from '@apollo/client';

export const DELETE_TODO_MUTATION = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id) {
      todo {
        id
        title
        timestamp
      }
    }
  }
`;
