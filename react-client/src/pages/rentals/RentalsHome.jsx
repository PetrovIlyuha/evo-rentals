import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGlobe from 'react-globe';

import BaseLayout from '../../components/ui_layout/BaseLayout';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

import RentalCard from './RentalCard';

import { listAllRentals } from '../../redux/rentals_slice/rentalActions';
import Loading from '../../components/ui_layout/Loading';

const useStyles = makeStyles(theme => ({
  globeContainer: {
    marginTop: '-4rem',
    marginBottom: '2rem',
  },
  globe: {
    height: '20vh',
  },
}));
const RentalsHome = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rentals: allRentals, loading } = useSelector(state => state.rentals);

  useEffect(() => {
    dispatch(listAllRentals());
  }, [dispatch]);

  if (loading) {
    return <Loading size='50px' loading={loading} />;
  }
  return (
    <BaseLayout>
      <Grid
        container
        justify='center'
        align='center'
        spacing={2}
        className={classes.globeContainer}>
        <Grid item lg={12} md={12} xs={12} className={classes.globe}>
          <ReactGlobe style={{ height: '10vh' }} />
        </Grid>
      </Grid>
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
