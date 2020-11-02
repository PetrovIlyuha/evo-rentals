import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BaseLayout from '../../components/ui_layout/BaseLayout';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

import RentalCard from './RentalCard';

import { listAllRentals } from '../../redux/rentals_slice/rentalActions';
import Loading from '../../components/ui_layout/Loading';

const useStyles = makeStyles(theme => ({}));
const RentalsHome = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { rentals: allRentals, error, loading } = useSelector(
    state => state.rentals,
  );

  useEffect(() => {
    dispatch(listAllRentals());
  }, [dispatch]);

  if (loading) {
    return <Loading size='50px' loading={loading} />;
  }
  return (
    <BaseLayout>
      <Grid container justify='center' align='center' spacing={3}>
        {allRentals &&
          allRentals.map((rental, index) => {
            return (
              <Grid item lg={3} md={3} xs={12} sm={6} key={index}>
                <RentalCard rental={rental} />
              </Grid>
            );
          })}
      </Grid>
    </BaseLayout>
  );
};

export default RentalsHome;
