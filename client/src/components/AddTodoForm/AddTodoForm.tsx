import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

import { useAddTodoMutation } from '../../graphql/generated/addTodoMutation.generated';
import { GetTodosDocument } from '../../graphql/generated/getTodos.generated';

export const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [addTodo] = useAddTodoMutation({
    onCompleted: () => {
      setTitle('');
    },
    refetchQueries: [GetTodosDocument],
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
