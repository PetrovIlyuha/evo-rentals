import React, { useState } from 'react';
import { format } from 'date-fns';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.darkBlue,
    color: theme.palette.common.darkYellow,
    fontSize: 20,
  },
  body: {
    fontSize: 15,
    fontWeight: 700,
    color: 'white',
    borderRight: '2px solid white',
    borderRadius: '10px',
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.common.lightBlue,
      color: 'white',
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.common.darkBlue,
      color: theme.palette.common.darkYellow,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  table: {
    width: 700,
    minHeight: 100,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: 400,
      marginLeft: 100,
    },
    [theme.breakpoints.down('xs')]: {
      width: 300,
      margin: 0,
    },
  },
}));

function ExistingBookingsByLocation({ bookings, history }) {
  const classes = useStyles();
  const [showBookings, setShowBookings] = useState(true);

  return (
    <>
      <Button
        variant='contained'
        color='secondary'
        style={{ marginBottom: 20, width: 100 }}
        onClick={() => setShowBookings(state => !state)}>
        {showBookings ? 'Hide' : 'Show'}
      </Button>
      {showBookings && (
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell align='right'>Arrival Date</StyledTableCell>
                <StyledTableCell align='right'>Departure Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings
                .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
                .map((booking, index) => (
                  <StyledTableRow key={index} style={{ cursor: 'pointer' }}>
                    <StyledTableCell component='th' scope='row' align='right'>
                      {format(new Date(booking.startDate), 'dd MMMM yyyy')}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {format(new Date(booking.endDate), 'dd MMMM yyyy')}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default withRouter(ExistingBookingsByLocation);
