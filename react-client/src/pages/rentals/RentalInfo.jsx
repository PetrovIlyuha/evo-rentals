import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { firstUpperLetter } from '../../utils/stringFunctions';

const RentalInfo = ({ rentalByID, classes, assets }) => {
  return (
    <Grid item lg={12} md={12} sm={12}>
      <Divider />
      <Grid container className={classes.location}>
        <Grid lg={4} md={4} sm={4} item>
          <Typography variant='body1'>
            <Typography variant='body2'>City:</Typography>{' '}
            {rentalByID && firstUpperLetter(rentalByID.city)}
          </Typography>
        </Grid>
        <Grid item lg={4} md={4} sm={4}>
          <Typography variant='body1'>
            <Typography variant='body2'> Street:</Typography>{' '}
            {rentalByID && firstUpperLetter(rentalByID.street)}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container className={classes.assetsGrid}>
        {assets.map((asset, index) => (
          <Grid
            key={index}
            item
            lg={4}
            md={6}
            sm={12}
            className={classes.asset}>
            {asset.icon} {asset.text}
          </Grid>
        ))}
      </Grid>
      <Grid item lg={12} md={10}>
        <Typography className={classes.description}>
          Description: <br />
          {rentalByID.description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RentalInfo;
