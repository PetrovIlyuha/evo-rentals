import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import cogoToast from 'cogo-toast';
import lottie from 'lottie-web';
import loginAnimation from '../../assets/animations/LoginAnimation.json';

import BaseLayout from '../../components/ui_layout/BaseLayout';
import Loading from '../../components/ui_layout/Loading';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LoginImage from '../../assets/LoginImage';
import { Box, Divider, TextField, Typography } from '@material-ui/core';
import { GiTwirlCenter } from 'react-icons/gi';
import { makeStyles, withStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/user_slice/authActions';

const useStyles = makeStyles(theme => ({
  loginLayout: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  loginForm: {
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

let loginAnimated = null;
const Login = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId, loading } = useSelector(state => state.userLogin);
  useEffect(() => {
    if (userId) {
      cogoToast.loading('Checking your credentials').then(() => {
        cogoToast.success('Welcome to Evo Rentals!');
      });
      setTimeout(() => {
        history.push('/');
      }, 2500);
    }
  }, [history, userId]);

  useEffect(() => {
    lottie.loadAnimation({
      container: loginAnimated,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loginAnimation,
    });
  });

  if (loading) {
    return <Loading size='50px' loading={loading} />;
  }
  return (
    <BaseLayout>
      <Grid
        container
        justify='center'
        spacing={3}
        className={classes.loginLayout}>
        <Grid item lg={6} md={12}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required.'),
              password: Yup.string().required().min(6),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                dispatch(loginUser(values));
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
                <Grid container justify='center' className={classes.loginForm}>
                  <Box componet='form'>
                    <Typography variant='h5' className={classes.formTitle}>
                      Login
                    </Typography>
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
                    <Button
                      className={classes.button}
                      variant='outlined'
                      type='submit'
                      disabled={isSubmitting}
                      fullWidth={true}
                      endIcon={<GiTwirlCenter />}>
                      Login
                    </Button>
                  </Box>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>

        <Grid item lg={6} md={12} className={classes.promoSectionRegister}>
          {/* <LoginImage /> */}
          <div
            style={{ width: '100%', margin: '0 auto' }}
            ref={ref => (loginAnimated = ref)}></div>
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

export default Login;
