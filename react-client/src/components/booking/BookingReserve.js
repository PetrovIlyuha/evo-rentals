import React from 'react';
import { Formik, Form, Field } from 'formik';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import * as Yup from 'yup';
import {
  Button,
  Typography,
  makeStyles,
  Grid,
  Box,
  withStyles,
} from '@material-ui/core';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '1rem 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '300px',
    height: '490px',
    backgroundColor: 'lightgreen',
  },
}));

const InputField = withStyles({
  root: {
    color: 'black',
    marginTop: '10px',
    '& label.Mui-focused': {
      color: '#62EC62',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },
    '& label': {
      color: '#C28CAE',
    },
    '& .MuiInputBase-input': {
      fontWeight: '700',
      color: '#675BA2',
      backgroundColor: '#D6DCDF',
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
  return (
    <Formik
      initialValues={{
        startDate: new Date(),
        endDate: new Date(Date.now() + 1),
        guests: 0,
      }}
      validationSchema={Yup.object({
        startDate: Yup.string().required('Choose start date.'),
        endDate: Yup.string().required('Choose end date'),
        guests: Yup.number().required('Guests field required'),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          console.dir({ values });
          alert(values);
          setSubmitting(false);
        } catch (error) {
          setErrors({
            error: 'Could not create new rental! Try later...',
          });
          console.error(error);
        }
      }}>
      {({ values, errors }) => (
        <Grid item lg={6} md={6} xs={12} className={classes.root}>
          <Form>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Typography variant='h3' style={{ textAlign: 'center' }}>
                $ {rentalByID.dailyPrice}
                <span>/ night</span>
              </Typography>
              <Box component='form'>
                <Box margin={3}>
                  <Field
                    component={DatePicker}
                    name='startDate'
                    label='Start date'
                  />
                </Box>
                <Box margin={3}>
                  <Field
                    component={DatePicker}
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
                  <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    elevation={10}
                    onClick={() => alert(JSON.stringify(values))}
                    type='submit'
                    // endIcon={<GiTwirlCenter />}>
                  >
                    Reserve place
                  </Button>
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
