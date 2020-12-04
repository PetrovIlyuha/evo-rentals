import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import { FaCity } from 'react-icons/fa';
import { RiCodeFill } from 'react-icons/ri';
import { BiDollarCircle } from 'react-icons/bi';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  Hidden,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { firstUpperLetter } from '../../utils/stringFunctions';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    backgroundColor: '#EDF3EE',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 300,
    },
  },
  media: {
    height: 140,
    transition: 'all .44s ease-in-out',
    '&:hover': {
      transform: 'scale(1.15)',
      height: 140,
    },
    [theme.breakpoints.down('sm')]: {
      height: 100,
    },
  },
  cardStyles: {
    backgroundColor: theme.palette.common.lightBlue,
  },
  rentalShortDetails: {
    backgroundColor: '#483B83',
    color: '#B4F0B9',
  },
  singleShortDetail: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.55rem',
      margin: '0 10px',
    },
  },
  rentalViews: {
    marginRight: '-40%',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      fontSize: '0.65rem',
    },
  },
  unfoldedDescription: {
    backgroundColor: '#27166E',
    color: '#CCCED9',
  },
  myPosting: {
    ...theme.typography.h2,
    background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
    color: 'white',
    height: '35px',
  },
  cardActionButton: {
    [theme.breakpoints.down('sm')]: {
      maxHeight: '2rem',
    },
    '& .MuiButton-label': {
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.5rem',
      },
    },
    '& .MuiButton-label > a': {
      color: 'white',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.5rem',
      },
    },
  },
}));

export default function RentalCard({ rental, isOwner }) {
  const classes = useStyles();
  const theme = useTheme();
  const onSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const smallScreenTitle = rental.title
    .toLowerCase()
    .split(' ')
    .filter(t => t === 'apartment' || t === 'condo' || t === 'flat');

  return (
    <Card className={classes.root}>
      {isOwner && (
        <CardHeader title='My Posting' className={classes.myPosting} />
      )}
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={rental.image}
          title={rental.title}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {onSmallScreen ? smallScreenTitle : rental.title}
          </Typography>
          <Paper
            elevation={1}
            className={classes.rentalShortDetails}
            style={{ marginBottom: '1rem' }}>
            <Typography className={classes.singleShortDetail}>
              <div>
                <FaCity color='yellow' /> City:
              </div>
              {firstUpperLetter(rental.city)}
            </Typography>
            <Divider />
            <Typography className={classes.singleShortDetail}>
              <div>
                <RiCodeFill color='yellow' /> Category:
              </div>
              {rental.category}
            </Typography>
            <Divider />
            <Typography className={classes.singleShortDetail}>
              <div>
                <BiDollarCircle color='yellow' /> Price/Day:
              </div>
              ${rental.dailyPrice}
            </Typography>
          </Paper>
          <Box margin={1}>
            <Typography variant='body1' className={classes.rentalViews}>
              Rental views: <strong>{rental.views}</strong>
            </Typography>
          </Box>
          <Hidden smDown>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                <Typography className={classes.heading}>
                  Rental Description
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.unfoldedDescription}>
                <Typography variant='body2' color='#CCCED9' component='p'>
                  {rental.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Hidden>
        </CardContent>
      </CardActionArea>
      {isOwner}
      <CardActions style={{ marginTop: onSmallScreen ? '-2rem' : '' }}>
        <Button
          size='small'
          color='secondary'
          variant='contained'
          className={classes.cardActionButton}>
          Research later
        </Button>
        <Button
          size='small'
          color='primary'
          variant='contained'
          className={classes.cardActionButton}>
          <Link to={`/rental/${rental._id}`}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
}
