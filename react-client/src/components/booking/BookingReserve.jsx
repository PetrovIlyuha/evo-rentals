import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import Loading from '../ui_layout/Loading';

import {
  Typography,
  makeStyles,
  Grid,
  Box,
  withStyles,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import ConfirmationModal from './ConfirmationModal';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '1rem 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '300px',
    height: '490px',
    color: 'white',
    backgroundColor: 'rgba(47,25,112,0.4)',
    backgroundImage:
      'radial-gradient(#fdfdff 1px, transparent 1px), radial-gradient(#fdfdff 1px, #171771 1px)',
    backgroundSize: '40px 40px',
    backgroundPosition: '0 0, 20px 20px',
  },
  datePicker: {
    '& .MuiInputBase-input': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'yellow',
    },
  },
}));

const InputField = withStyles({
  root: {
    color: 'white',
    backgroundColor: 'black',
    marginTop: '10px',
    '& label.Mui-focused': {
      color: '#62EC62',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    '& label': {
      color: 'yellow',
    },
    '& .MuiInputBase-input': {
      fontWeight: '700',
      color: '#EDE342',
      backgroundColor: '#5D4BCD',
      padding: '0.8rem 1rem',
      verticalAlign: 'middle',
      borderRadius: '5px',
      '&:focus': {
        backgroundColor: '#675BA2',
        color: '#D6DCDF',
      },
      '&:active': {
        backgroundColor: '#675BA2',
        color: '#D6DCDF',
      },
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: 'lightgray',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'lightgreen',
        color: 'black',
      },
    },
    marginBottom: '1.2rem',
  },
})(TextField);

const BookingReserve = ({ rentalByID }) => {
  const classes = useStyles();
  const [submit, setSubmit] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const numberOfNightsBetweenDates = (startDate, endDate) => {
    let dayCount = 0;
    while (endDate > startDate) {
      dayCount++;
      startDate.setDate(startDate.getDate() + 1);
    }
    return dayCount;
  };

  if (submit) {
    return <Loading />;
  }

  return (
    <Formik
      initialValues={{
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        guests: 0,
      }}
      validate={values => {
        let errors = {};
        if (values.startDate < new Date()) {
          values.startDate = new Date();
        }
        if (values.startDate >= values.endDate) {
          errors.endDate = 'End date must be after start date';
          values.endDate = new Date().setDate(values.startDate.getDate() + 1);
        }
        if (values.guests <= 0) {
          errors.guests = 'Number of guests should be at least 1';
        }
        if (values.guests > rentalByID.numOfGuests) {
          errors.guests = `Max number of guests ${rentalByID.numOfGuests}`;
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {}}>
      {({ values, errors }) => (
        <Grid item lg={6} md={6} xs={12} className={classes.root}>
          <Form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Typography
                variant='h3'
                style={{
                  color: 'yellow',
                  backgroundColor: '#4D35B0',
                  borderRadius: 4,
                  textAlign: 'center',
                }}>
                $ {rentalByID.dailyPrice}
                <span>/ night</span>
              </Typography>
              <Box component='form'>
                <Box margin={3}>
                  <Field
                    component={DatePicker}
                    className={classes.datePicker}
                    name='startDate'
                    label='Start date'
                  />
                </Box>
                <Box margin={3}>
                  <Field
                    component={DatePicker}
                    className={classes.datePicker}
                    name='endDate'
                    label='Ending date'
                  />
                </Box>
                <Box margin={2}>
                  <Field
                    component={InputField}
                    type='number'
                    label='Number of guests'
                    variant='outlined'
                    name='guests'
                  />
                </Box>
                <Box margin={2}>
                  <Typography
                    style={{
                      color: 'yellow',
                      backgroundColor: '#4D35B0',
                      borderRadius: 4,
                      textAlign: 'center',
                    }}>
                    Rental Cost: ${' '}
                    {numberOfNightsBetweenDates(
                      new Date(values.startDate),
                      new Date(values.endDate),
                    ) * rentalByID.dailyPrice}
                  </Typography>
                </Box>
                <Box margin={2}>
                  <Typography
                    style={{
                      color: 'yellow',
                      backgroundColor: '#4D35B0',
                      borderRadius: 4,
                      textAlign: 'center',
                    }}>
                    {' '}
                    for{' '}
                    {numberOfNightsBetweenDates(
                      new Date(values.startDate),
                      new Date(values.endDate),
                    ) > 1
                      ? `${numberOfNightsBetweenDates(
                          new Date(values.startDate),
                          new Date(values.endDate),
                        )} Days stay`
                      : `${numberOfNightsBetweenDates(
                          new Date(values.startDate),
                          new Date(values.endDate),
                        )} Day stay`}
                  </Typography>
                </Box>
                <Box margin={4}>
                  <ConfirmationModal
                    formValues={values}
                    errors={errors}
                    submitError={submitError}
                    setSubmitError={setSubmitError}
                    setSubmit={setSubmit}
                    days={numberOfNightsBetweenDates(
                      new Date(values.startDate),
                      new Date(values.endDate),
                    )}
                    price={rentalByID.dailyPrice}
                  />
                </Box>
              </Box>
            </MuiPickersUtilsProvider>
          </Form>
        </Grid>
      )}
    </Formik>
  );
};

export default BookingReserve;
