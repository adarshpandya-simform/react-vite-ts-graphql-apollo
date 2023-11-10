import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';

import { ADD_TODO_MUTATION } from '../../graphql/mutation/addTodoMutation';
import { GET_TODOS } from '../../graphql/queries/getTodos';

interface AddTodoMutationVariables {
  title: string;
  completed: boolean;
}

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [addTodo] = useMutation<
    typeof ADD_TODO_MUTATION,
    AddTodoMutationVariables
  >(ADD_TODO_MUTATION, {
    onCompleted: () => {
      setTitle('');
    },
    refetchQueries: [GET_TODOS],
  });

  const handleAddTodo = async (): Promise<void> => {
    await addTodo({ variables: { title, completed: false } });
    setTitle('');
  };

  return (
    <Grid container columnSpacing={1} alignItems='center'>
      <Grid item xs={6} md={8}>
        <TextField
          fullWidth
          label='Enter Todo'
          size='small'
          variant='outlined'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={(e) => {
            e.key === 'Enter' && handleAddTodo();
          }}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={handleAddTodo}
        >
          ADD TODO
        </Button>
      </Grid>
    </Grid>
  );
};
