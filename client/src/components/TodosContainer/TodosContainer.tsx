import { useState } from 'react';
import { CircularProgress } from '@mui/material';

import { TodoFilter } from '../TodoFilter/TodoFilter';
import { TodosList } from '../TodosList/TodosList';
import { useGetTodosQuery } from '../../graphql/generated/getTodos.generated';

export const TodosContainer: React.FC = () => {
  const { data, loading, error } = useGetTodosQuery();
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
