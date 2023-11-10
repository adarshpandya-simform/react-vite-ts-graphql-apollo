import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';

import { GET_TODOS } from '../../graphql/queries/getTodos';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { TodosList } from '../TodosList/TodosList';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  timestamp: string;
}

export interface GetTodos {
  todos: Todo[];
}

export const TodosContainer: React.FC = () => {
  const { data, loading, error } = useQuery<GetTodos>(GET_TODOS);
  const [filter, setFilter] = useState('All');

  if (loading) {
    return <CircularProgress color='primary' />;
  }

  if (error) {
    return <code>{JSON.stringify(error)}</code>;
  }

  return (
    <>
      <TodoFilter onChange={(value) => setFilter(value)} />
      <TodosList todos={data?.todos ?? []} filter={filter} />
    </>
  );
};
