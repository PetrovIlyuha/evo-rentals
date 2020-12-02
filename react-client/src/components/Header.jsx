import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import cogoToast from 'cogo-toast';
import { Link, NavLink, withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Tooltip from '@material-ui/core/Tooltip';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { GiEgyptianWalk } from 'react-icons/gi';
import { IoMdLogIn } from 'react-icons/io';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdSettingsApplications, MdCreateNewFolder } from 'react-icons/md';

import Logo from '../assets/Logo';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/styles';

import { useDispatch, useSelector } from 'react-redux';
import { USER_LOGOUT, USER_REGISTER_RESET } from '../redux/user_slice/types';
import { listAllRentals } from '../redux/rentals_slice/rentalActions';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  toolbarMargin: { ...theme.mixins.toolbar, marginBottom: '3rem' },
  logo: {
    marginLeft: 0,
    padding: 10,
    margin: 5,
    '&:hover': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('sm')]: {
      width: 100,
    },
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
    [theme.breakpoints.down('lg')]: {
      height: '5rem',
    },
    display: 'flex',
    justifyContent: 'space-between',
  },
  tabContainer: {
    display: 'flex',
    marginLeft: 'auto',
    maxWidth: '800px',
    marginTop: 10,
  },
  tab: {
    ...theme.typography.tab,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'yellow',
    marginRight: '2.2rem',
    marginTop: '2%',
    minWidth: 20,
    textDecoration: 'none',
    '&:hover': {
      color: 'white',
    },
    '&:focus': {
      color: '#CEEEFF',
    },
  },
  button: {
    borderRadius: 25,
    marginLeft: 50,
    marginRight: 25,
    ...theme.typography.basicButton,
    height: 40,
    '&:hover': {
      color: 'white',
      background: '#498E1C',
    },
  },
  dropDownMenu: {
    backgroundColor: '#58F37A',
    color: '#173178',
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
    '&:active': {
      color: 'white',
    },
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    paddingRight: '2rem',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    color: theme.palette.common.lightYellow,
    width: '2rem',
    height: '2rem',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'rotate(90deg)',
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.lightBlue,
    textDecoration: 'none',
  },
  drawerItem: {
    ...theme.typography.tab,
    color: theme.palette.common.lightYellow,
    textDecoration: 'none',
    textUnderline: 'none',
  },
  searchInput: {
    '& .MuiInputBase-root': {
      backgroundColor: '#7494B8',
      width: '13rem',
    },
    '& .MuiFormLabel-root': {
      color: 'yellow',
    },
  },
  searchForm: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '20rem',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 12 : 0,
  });
}

const Header = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const { rentals } = useSelector(state => state.rentals);
  const [value, setValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const uniqueCitynames = rentals?.map(r => r.city);
  const uniqueCities = Array.from(new Set(uniqueCitynames)).concat('all');

  const dispatch = useDispatch();
  const { userId, username } = useSelector(state => state.userLogin);

  const handleTabActiveChange = (e, updatedValue) => {
    e.preventDefault();
    setValue(updatedValue);
  };

  const logoutUser = () => {
    cogoToast.success("Sad you're leaving! Take care!");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_REGISTER_RESET });
    history.push('/');
  };

  const handleSearchInputChange = e => {
    if (e.target.value === 'all') {
      setSearchTerm('');
    } else {
      setSearchTerm(e.target.value.toLowerCase());
    }
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    dispatch(listAllRentals(searchTerm));
  };

  const tabs = (
    <>
      {userId ? (
        <Tabs
          indicatorColor='primary'
          value={value}
          onChange={handleTabActiveChange}
          className={classes.tabContainer}>
          <Tooltip title='Your account'>
            <NavLink to='/account' className={classes.tab}>
              <MdSettingsApplications size={30} color='yellow' />
              <Hidden mdDown>{username}'s Account</Hidden>
            </NavLink>
          </Tooltip>
          <Tooltip title='Create posting'>
            <NavLink to='/rentals/new' className={classes.tab}>
              <MdCreateNewFolder size={30} color='yellow' />
              <Hidden mdDown>Create Rental</Hidden>
            </NavLink>
          </Tooltip>
          <Tooltip title='Log out'>
            <NavLink to='/' onClick={logoutUser} className={classes.tab}>
              <GiEgyptianWalk size={30} color='yellow' />
              <Hidden mdDown>Logout</Hidden>
            </NavLink>
          </Tooltip>
        </Tabs>
      ) : (
        <Tabs
          indicatorColor='primary'
          value={value}
          onChange={handleTabActiveChange}
          className={classes.tabContainer}>
          <Tooltip title='Log in'>
            <NavLink to='/login' className={classes.tab}>
              <IoMdLogIn size={30} color='yellow' />
              <Hidden mdDown>Login</Hidden>
            </NavLink>
          </Tooltip>
          {/* <NavLink to='/admin' className={classes.tab}>
            <MdSettingsApplications size={30} color='yellow' />
            Admin Route
          </NavLink> */}
          <Tooltip title='Register'>
            <NavLink to='/register' className={classes.tab}>
              <AiOutlineUserAdd size={30} color='yellow' />
              <Hidden mdDown>Register</Hidden>
            </NavLink>
          </Tooltip>
        </Tabs>
      )}
    </>
  );

  const drawerItemsPropsNotLogin = [
    { text: 'Home', path: '/' },
    { text: 'Login', path: '/login' },
    { text: 'Register', path: '/register' },
  ];

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}>
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {!userId ? (
            drawerItemsPropsNotLogin.map((item, index) => (
              <Link to={item.path} key={index}>
                <ListItem divider button>
                  <ListItemText
                    className={classes.drawerItem}
                    disableTypography
                    onClick={() => setOpenDrawer(!openDrawer)}>
                    {item.text}
                  </ListItemText>
                </ListItem>
              </Link>
            ))
          ) : (
            <>
              <Link to='/'>
                <ListItem divider button>
                  <ListItemText
                    className={classes.drawerItem}
                    disableTypography
                    onClick={() => setOpenDrawer(!openDrawer)}>
                    Home
                  </ListItemText>
                </ListItem>
              </Link>
              <Link to='/account'>
                <ListItem divider button>
                  <ListItemText
                    className={classes.drawerItem}
                    disableTypography
                    onClick={() => setOpenDrawer(!openDrawer)}>
                    Dashboard
                  </ListItemText>
                </ListItem>
              </Link>
              <Link to='/rentals/new' className={classes.tab}>
                <ListItem divider button>
                  <ListItemText
                    className={classes.drawerItem}
                    disableTypography
                    onClick={() => setOpenDrawer(!openDrawer)}>
                    Create Rental
                  </ListItemText>
                </ListItem>
              </Link>
              <Link to='/logout' onClick={logoutUser}>
                <ListItem divider button>
                  <ListItemText
                    className={classes.drawerItem}
                    disableTypography
                    onClick={() => setOpenDrawer(!openDrawer)}>
                    Log out
                  </ListItemText>
                </ListItem>
              </Link>
            </>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple>
        {openDrawer ? (
          <HighlightOffIcon className={classes.drawerIcon} />
        ) : (
          <MenuIcon className={classes.drawerIcon} />
        )}
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position='fixed' color='primary' className={classes.appBar}>
          <Toolbar disableGutters>
            {!matches && (
              <NavLink to='/'>
                <Button disableRipple className={classes.logo}>
                  <Logo />
                </Button>
              </NavLink>
            )}
            {uniqueCities && (
              <form onSubmit={handleSearchSubmit}>
                <FormControl className={classes.searchForm}>
                  <Autocomplete
                    className={classes.searchInput}
                    id='rental-search'
                    disableClearable
                    options={uniqueCities.map(option => option)}
                    renderInput={params => (
                      <TextField
                        {...params}
                        onChange={handleSearchInputChange}
                        onBlur={handleSearchInputChange}
                        className={classes.searchInput}
                        label='Search rental by city'
                        margin='normal'
                        variant='outlined'
                        InputProps={{ ...params.InputProps, type: 'search' }}
                      />
                    )}
                  />
                  <Button
                    style={{ height: '3rem', marginTop: '.4rem' }}
                    type='submit'
                    variant='outlined'
                    color='secondary'>
                    Search
                  </Button>
                </FormControl>
              </form>
            )}
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default withRouter(Header);
