import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGlobe from 'react-globe';

import BaseLayout from '../../components/ui_layout/BaseLayout';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

import RentalCard from './RentalCard';
import { listAllRentals } from '../../redux/rentals_slice/rentalActions';
import Loading from '../../components/ui_layout/Loading';
import { Typography } from '@material-ui/core';
import useRentalFilterHome from '../../hooks/useRentalFilterHome';
import HomeCategoryFilter from '../../components/rentals/HomeCategoryFilter';

const useStyles = makeStyles(theme => ({
  globeContainer: {
    marginTop: '-4rem',
    marginBottom: '2rem',
  },
  globe: {
    height: '20vh',
  },
}));
const RentalsHome = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rentals: allRentals, loading } = useSelector(state => state.rentals);
  const { userId } = useSelector(state => state.userLogin);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(
      allRentals?.reduce((acc, item) => Math.max(item.dailyPrice, acc), 0),
    );
  }, [allRentals]);

  const handleSliderChange = (event, newValue) => {
    setPrice(newValue);
  };

  const {
    homePageRentalsFilterSystem,
    listedCategories,
    setListedCategories,
    uniqueCategories,
  } = useRentalFilterHome(allRentals, price);

  useEffect(() => {
    dispatch(listAllRentals());
  }, [dispatch]);

  if (loading) {
    return <Loading size='50px' loading={loading} />;
  }

  const toggleShowCategory = category => {
    if (!listedCategories.includes(category)) {
      setListedCategories([...listedCategories, category]);
    } else {
      const newCategories = listedCategories.filter(cat => cat !== category);
      setListedCategories([...newCategories]);
    }
  };

  return (
    <BaseLayout>
      <Grid
        container
        align='center'
        direction='row'
        justify='around'
        spacing={2}
        className={classes.globeContainer}>
        <Grid item lg={12} md={12} xs={12} className={classes.globe}>
          <ReactGlobe style={{ height: '10vh' }} />
        </Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item lg={6} md={6} xs={6}>
          <HomeCategoryFilter
            toggleShowCategory={toggleShowCategory}
            uniqueCategories={uniqueCategories}
            listedCategories={listedCategories}
          />
        </Grid>
        <Grid item lg={4} md={4} xs={4}>
          <Typography variant='h3'>Price Filter: $ {price}</Typography>
          <Slider
            value={price || 100}
            onChange={handleSliderChange}
            aria-labelledby='input-slider'
          />
        </Grid>
      </Grid>
      <Grid container justify='center' align='center' spacing={3}>
        {allRentals &&
          homePageRentalsFilterSystem(allRentals).map((rental, index) => {
            const isOwner = userId === rental.owner._id;
            return (
              <Grid item lg={3} md={3} xs={12} sm={6} key={index}>
                <RentalCard rental={rental} isOwner={isOwner} />
              </Grid>
            );
          })}
      </Grid>
    </BaseLayout>
  );
};

export default RentalsHome;
