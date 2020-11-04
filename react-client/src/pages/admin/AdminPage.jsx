import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import BaseLayout from '../../components/ui_layout/BaseLayout';
import useUserAuthentication from '../../hooks/useUserAuthentication';

const AdminPage = ({ history }) => {
  const isUserAuthenticated = useUserAuthentication();
  if (!isUserAuthenticated) {
    history.push('/login');
  }

  return (
    <BaseLayout>
      <Grid container>
        <Grid item>
          <Typography variant='h2'>Secret Page</Typography>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default AdminPage;
