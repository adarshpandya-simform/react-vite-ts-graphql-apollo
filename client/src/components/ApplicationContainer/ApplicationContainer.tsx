import { Grid, Paper, SxProps } from '@mui/material';
import { AddTodoForm } from '../AddTodoForm/AddTodoForm';
import React from 'react';

const paperStyle: SxProps = {
  width: '60%',
  height: '75%',
  padding: '20px',
};

export const ApplicationContainer: React.FC = () => {
  return (
    <Paper sx={paperStyle} elevation={5}>
      <Grid container height={'100%'} direction={'column'}>
        <Grid item xs={1} lg={1} md={1}>
          <AddTodoForm />
        </Grid>
      </Grid>
    </Paper>
  );
};
