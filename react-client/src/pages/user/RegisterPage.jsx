import React, { useState, useEffect } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import BaseLayout from '../../components/ui_layout/BaseLayout';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import RegisterImage from '../../assets/RegisterImage';
import Loading from '../../components/ui_layout/Loading';
import { Box, Divider, TextField, Typography } from '@material-ui/core';
import { BsCheckCircle } from 'react-icons/bs';
import { makeStyles, withStyles } from '@material-ui/styles';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/user_slice/authActions.js';

const useStyles = makeStyles(theme => ({
  registerLayout: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  registerForm: {
    display: 'flex',
    flexDirection: 'column',
    height: '60vh',
    width: '100%',
    alignItems: 'center',
    transition: 'all .2s ease',
    background:
      'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(255,0,104,0.6895133053221288) 100%)',
    '&:hover': {
      boxShadow: '2px 4px 12px rgba(0,0,0,0.3)',
      transform: 'scale(1.03)',
    },
    [theme.breakpoints.down('md')]: {
      width: '60%',
      marginLeft: '17%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
      marginLeft: '10%',
      height: '40vh',
    },
  },
  formTitle: {
    color: '#B4F0B9',
  },
  errorMessage: {
    position: 'relative',
    top: '-2%',
    color: 'yellow',
  },
  loginInput: {
    width: '300px',
    [theme.breakpoints.down('md')]: {
      width: '400px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.down('xs')]: {
      width: '260px',
    },
  },
  button: {
    backgroundColor: '#6E8394',
    color: 'whitesmoke',
    '&:hover': {
      backgroundColor: '#565F87',
    },
  },
  promoSectionRegister: {
    transition: 'all .3s ease',
    '&:hover': {
      boxShadow: '2px 4px 12px 2px rgba(0,0,0,0.24)',
    },
    [theme.breakpoints.down('md')]: {
      width: '60%',
      marginLeft: '17%',
    },
  },
  promoText: {
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '2em',
    width: '70%',
  },
}));

const InputField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#B4F0B9',
    },
    '& label': {
      color: '#C28CAE',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray',
        background: 'rgba(0,255,166,0.1822303921568627)',
      },
      '&:hover fieldset': {
        borderColor: 'lightgray',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'lightblue',
      },
    },
    marginBottom: '1.1rem',
  },
})(TextField);

const Register = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector(state => state.userRegister);

  useEffect(() => {
    if (Object.keys(user).length) {
      history.push('/login');
    }
  }, [user, history]);
  if (loading) {
    return <Loading size='50px' loading={loading} />;
  }
  console.log(error);
  return (
    <BaseLayout>
      <Grid
        container
        justify='center'
        spacing={3}
        className={classes.registerLayout}>
        <Grid item lg={6} md={12}>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              passwordConfirmation: '',
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .required('Provide your username')
                .min(3, 'Too short of a name!'),
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required.'),
              password: Yup.string().required().min(6),
              passwordConfirmation: Yup.string().oneOf(
                [Yup.ref('password'), null],
                'Passwords must match',
              ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                dispatch(registerUser(values));
                setSubmitting(false);
              } catch (error) {
                setErrors({
                  auth: 'Check your credentials. Something is wrong...',
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
                  className={classes.registerForm}>
                  <Box componet='form'>
                    <Typography variant='h5' className={classes.formTitle}>
                      Register
                    </Typography>
                    <InputField
                      label='username'
                      type='text'
                      name='username'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      xs={6}
                      className={classes.loginInput}
                      variant='outlined'
                      inputProps={{ style: { color: '#B4F0B9' } }}
                      margin='dense'
                      size='medium'
                    />
                    <div className={classes.errorMessage}>
                      {errors.username && touched.username && errors.username}
                    </div>
                    <div>
                      <InputField
                        fullWidth={true}
                        label='email'
                        type='email'
                        name='email'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        xs={6}
                        className={classes.loginInput}
                        variant='outlined'
                        inputProps={{ style: { color: '#B4F0B9' } }}
                        margin='dense'
                        size='medium'
                      />
                      <div className={classes.errorMessage}>
                        {errors.email && touched.email && errors.email}
                      </div>
                    </div>
                    <InputField
                      fullWidth={true}
                      type='password'
                      name='password'
                      label='Your password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      inputProps={{ style: { color: '#B4F0B9' } }}
                      className={classes.loginInput}
                      margin='dense'
                      size='medium'
                      variant='outlined'
                    />
                    <div className={classes.errorMessage}>
                      {errors.password && touched.password && errors.password}
                    </div>
                    <InputField
                      fullWidth={true}
                      type='password'
                      label='Your password confirmation'
                      name='passwordConfirmation'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.passwordConfirmation}
                      inputProps={{ style: { color: '#B4F0B9' } }}
                      className={classes.loginInput}
                      margin='dense'
                      size='medium'
                      variant='outlined'
                    />
                    <div className={classes.errorMessage}>
                      {errors.passwordConfirmation &&
                        touched.passwordConfirmation &&
                        errors.passwordConfirmation}
                    </div>
                    <Button
                      className={classes.button}
                      variant='outlined'
                      type='submit'
                      disabled={isSubmitting}
                      fullWidth={true}
                      endIcon={<BsCheckCircle />}>
                      Register
                    </Button>
                  </Box>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>

        <Grid item lg={6} md={12} className={classes.promoSectionRegister}>
          <RegisterImage />
          <Divider />
          <Typography variant='h6' className={classes.promoText}>
            Being our registered user means a lot of unique experiences and
            features. So, what are you waiting for?
          </Typography>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default Register;
