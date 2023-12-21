import React from 'react';
import { Grid, Paper, SxProps } from '@mui/material';

import { AddTodoForm } from '../AddTodoForm/AddTodoForm';
import { TodosContainer } from '../TodosContainer/TodosContainer';

const paperStyle: SxProps = {
  width: '60%',
  height: '75%',
  padding: '20px',
} as const;

const gridStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px'
} as const;

export const ApplicationContainer: React.FC = () => {
  return (
    <Paper sx={paperStyle} elevation={5}>
      <Grid sx={gridStyle}>
        <Grid item xs={1} lg={1} md={1}>
          <AddTodoForm />
        </Grid>
        <Grid overflow={'auto'} item xs={10} lg={10} md={10}>
          <TodosContainer />
        </Grid>
      </Grid>
    </Paper>
  );
};
