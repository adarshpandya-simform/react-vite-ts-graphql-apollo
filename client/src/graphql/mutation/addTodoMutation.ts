import { gql } from '@apollo/client';

export const ADD_TODO_MUTATION = gql`
  mutation addTodo($title: String!, $completed: Boolean) {
    addTodo(title: $title, completed: $completed) {
      todo {
        id
        title
        completed
        timestamp
      }
    }
  }
`;
