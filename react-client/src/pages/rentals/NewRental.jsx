import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  MenuItem,
  FormControlLabel,
  Typography,
  withStyles,
} from '@material-ui/core';
import { TextField, Switch } from 'formik-material-ui';
import Box from '@material-ui/core/Box';
import { Grid, makeStyles } from '@material-ui/core';

import BaseLayout from '../../components/ui_layout/BaseLayout';
import { useDispatch, useSelector } from 'react-redux';
import cogoToast from 'cogo-toast';
import Loading from '../../components/ui_layout/Loading';
import NewRentalImage from '../../assets/NewRentalImage';

import { GiTwirlCenter } from 'react-icons/gi';
import { useEffect } from 'react';
import { createRental } from '../../redux/rentals_slice/rentalActions';

const useStyles = makeStyles(theme => ({
  newRentalLayout: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  newRentalForm: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    boxShadow: '4px 6px 20px 4px rgba(0,0,0,0.4)',
    height: '100%',
    padding: '15px 0px',
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all .2s ease',
    background: 'linear-gradient(to right, #2980b9, #6dd5fa, #ffffff);',
    [theme.breakpoints.down('md')]: {
      width: '60%',
      marginLeft: '17%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      marginLeft: '5%',
      height: '85vh',
    },
  },
  formTitle: {
    color: '#42308E',
    fontWeight: '700',
    margin: '20px 0px',
  },
  multiSelect: {
    height: '40px',
    backgroundColor: 'blue',
    color: 'lightgreen',
    marginBottom: '20px',
  },
  fieldLabel: {
    color: '#58CA7F',
    fontSize: '16px',
    marginLeft: '2rem',
  },

  placeinput: {
    width: '500px',
    fontSize: '15px',
    [theme.breakpoints.down('md')]: {
      width: '400px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '340px',
    },
  },
  button: {
    backgroundColor: '#6E8394',
    color: 'whitesmoke',
    '&:hover': {
      backgroundColor: '#565F87',
    },
  },
  imageBlockRight: {
    transition: 'all .3s ease',
    '&:hover': {
      background: 'lightgreen',
      boxShadow: '2px 4px 12px 2px rgba(0,0,0,0.24)',
    },
    [theme.breakpoints.down('md')]: {
      width: '60%',
      marginTop: '20px',
      marginLeft: '17%',
    },
  },
  allFieldsError: {
    // padding: '2px 4px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '4px',
    position: 'absolute',
    top: '120px',
    left: '30px',
  },
  placePropGridItem: {
    marginRight: '15px',
  },
}));

const InputField = withStyles({
  root: {
    color: 'black',
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
      padding: '1.4rem 1rem',
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

const NewRental = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector(state => state.createRental);

  useEffect(() => {
    if (success) {
      cogoToast.success('Rental was created!');
    }
    if (error) {
      cogoToast.error('Rental Creation failed. Contact the administrator!');
    }
  }, [success, error]);
  if (loading) {
    return <Loading size='50px' loading={loading} />;
  }
  const categories = ['House', 'Apartments', 'Condominium'];

  return (
    <BaseLayout>
      <Grid
        container
        justify='center'
        spacing={3}
        className={classes.newRentalLayout}>
        <Grid item lg={6} md={12}>
          <Formik
            initialValues={{
              title: '',
              city: '',
              street: '',
              category: '',
              image: '',
              image2: '',
              numOfRooms: 0,
              numOfGuests: 0,
              numOfBeds: 0,
              description: '',
              dailyPrice: '',
              phone: '',
              shared: false,
            }}
            validationSchema={Yup.object({
              title: Yup.string().required('Title is required.'),
              city: Yup.string().required('City is required'),
              street: Yup.string().required('Street is required'),
              image: Yup.string().required('Image url is required'),
              image2: Yup.string().required('Second Image url is required'),
              numOfRooms: Yup.number()
                .moreThan(0)
                .required('Number of rooms field is required'),
              numOfGuests: Yup.number()
                .moreThan(0)
                .required('Number of guests field is required'),
              numOfBeds: Yup.number()
                .moreThan(0)
                .required('Number of beds field is required'),
              category: Yup.string().required(
                'Please fill in the rental category',
              ),
              description: Yup.string().required('Description is required'),
              dailyPrice: Yup.number().required('Daily price is required'),
              phone: Yup.number().required('Phone number is required'),
              shared: Yup.bool().required(
                'Shared option is a required attribute',
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                dispatch(createRental(values));
                setSubmitting(false);
              } catch (error) {
                setErrors({
                  error: 'Could not create new rental! Try later...',
                });
                console.error(error);
              }
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form>
                <Grid
                  container
                  justify='center'
                  className={classes.newRentalForm}>
                  <Box componet='form'>
                    <Typography variant='h5' className={classes.formTitle}>
                      New Rental
                    </Typography>
                    <Typography
                      className={classes.allFieldsError}
                      variant='subtitle'>
                      {Object.keys(errors).length > 0 &&
                        "Please don't skip the fields"}
                    </Typography>
                    <Box margin={1}>
                      <Field
                        component={InputField}
                        type='text'
                        label='title'
                        variant='outlined'
                        className={classes.placeinput}
                        name='title'
                      />
                    </Box>

                    <Box margin={1}>
                      <Field
                        component={InputField}
                        type='text'
                        variant='outlined'
                        className={classes.placeinput}
                        label='city'
                        name='city'
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Field
                      component={InputField}
                      type='text'
                      className={classes.placeinput}
                      label='street'
                      variant='outlined'
                      name='street'
                    />
                  </Box>

                  <Box margin={1}>
                    <Field
                      component={InputField}
                      type='text'
                      name='category'
                      select
                      variant='standard'
                      helperText='Please select rental category'
                      margin='normal'
                      InputLabelProps={{
                        shrink: true,
                      }}>
                      {categories.map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                  <Box>
                    <Field
                      component={InputField}
                      type='text'
                      label='Image url'
                      className={classes.placeinput}
                      variant='outlined'
                      name='image'
                    />
                  </Box>
                  <Box>
                    <Field
                      component={InputField}
                      type='text'
                      label='Second Image url'
                      className={classes.placeinput}
                      variant='outlined'
                      name='image2'
                    />
                  </Box>
                  <Grid
                    item
                    container
                    justify='center'
                    className={classes.placePropertiesGrid}>
                    <Grid item md={3}>
                      <Box>
                        <Field
                          component={InputField}
                          type='number'
                          label='Rooms'
                          className={classes.placePropGridItem}
                          variant='outlined'
                          name='numOfRooms'
                        />
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box>
                        <Field
                          component={InputField}
                          type='number'
                          label='Guests'
                          className={classes.placePropGridItem}
                          variant='outlined'
                          name='numOfGuests'
                        />
                      </Box>
                    </Grid>
                    <Grid item md={3}>
                      <Box>
                        <Field
                          component={InputField}
                          type='number'
                          label='Beds'
                          className={classes.placePropGridItem}
                          variant='outlined'
                          name='numOfBeds'
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Box>
                    <Field
                      as='textarea'
                      type='text'
                      label='Place Description'
                      className={classes.placeinput}
                      variant='outlined'
                      rows='5'
                      name='description'
                      placeholder='Provide an engaging description for the place'
                    />
                  </Box>

                  <Box>
                    <Field
                      component={InputField}
                      label='dailyPrice'
                      type='number'
                      name='dailyPrice'
                      className={classes.placeinput}
                      variant='outlined'
                    />
                  </Box>

                  <Box>
                    <Field
                      component={InputField}
                      label='phone'
                      type='text'
                      name='phone'
                      className={classes.placeinput}
                      variant='outlined'
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      control={
                        <Field
                          component={Switch}
                          type='checkbox'
                          name='shared'
                        />
                      }
                      label={values.shared ? 'Shared' : 'Not Shared'}
                    />
                  </Box>
                  <Button
                    className={classes.button}
                    type='submit'
                    disabled={Object.keys(errors).length > 0}
                    endIcon={<GiTwirlCenter />}>
                    Create New Place
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>

        <Grid item lg={6} md={12} className={classes.imageBlockRight}>
          <NewRentalImage />
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default NewRental;
