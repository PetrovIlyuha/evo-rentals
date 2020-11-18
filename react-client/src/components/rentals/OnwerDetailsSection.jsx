import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  ownerSection: {
    padding: '20px 40px',
    background: 'linear-gradient(to left, #8e9eab, #eef2f3)',
    width: '47%',
    marginBottom: 30,
  },
  contactPill: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
    padding: '3px 5px',
    marginRight: 10,
    color: 'white',
  },
}));

const OnwerDetailsSection = ({ ownerDetails, rentalByID }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.ownerSection}>
      <Grid item lg={12} md={12}>
        <Typography variant='h3'>Owner Contacts</Typography>
        <Typography variant='h4' style={{ marginTop: 20 }}>
          <span className={classes.contactPill}>Phone:</span> {rentalByID.phone}
        </Typography>
        <Typography variant='h4' style={{ marginTop: 20 }}>
          <span className={classes.contactPill}>Email:</span>{' '}
          {ownerDetails.email}
        </Typography>
        <Typography variant='h4' style={{ marginTop: 20 }}>
          <span className={classes.contactPill}>Owner username: </span>
          {ownerDetails.username}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OnwerDetailsSection;
