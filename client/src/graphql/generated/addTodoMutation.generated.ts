import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddTodoMutationVariables = Types.Exact<{
  title: Types.Scalars['String']['input'];
  completed?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type AddTodoMutation = { __typename?: 'Mutation', addTodo: { __typename?: 'MutatedTodo', todo?: { __typename?: 'Todo', id: string, title: string, completed: boolean, timestamp: string } | null } };


export const AddTodoDocument = gql`
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
export type AddTodoMutationFn = Apollo.MutationFunction<AddTodoMutation, AddTodoMutationVariables>;

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutation, { data, loading, error }] = useAddTodoMutation({
 *   variables: {
 *      title: // value for 'title'
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useAddTodoMutation(baseOptions?: Apollo.MutationHookOptions<AddTodoMutation, AddTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument, options);
      }
export type AddTodoMutationHookResult = ReturnType<typeof useAddTodoMutation>;
export type AddTodoMutationResult = Apollo.MutationResult<AddTodoMutation>;
export type AddTodoMutationOptions = Apollo.BaseMutationOptions<AddTodoMutation, AddTodoMutationVariables>;