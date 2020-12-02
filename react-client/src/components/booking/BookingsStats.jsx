import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
    [theme.breakpoints.down('sm')]: {
      minWidth: 400,
    },
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.darkBlue,
    color: theme.palette.common.darkYellow,
    fontSize: 20,
    textAlign: 'right',
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
    textAlign: 'center',
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

export default function BookingsStats({ incomingBookings }) {
  const classes = useStyles();

  const rawIncome = incomingBookings.reduce(
    (total, booking) => booking.totalPrice + total,
    0,
  );

  const platformFee = 0.04;
  const incomeAfterFee = Number(rawIncome * (1 - platformFee)).toFixed(2);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Income before Fee</StyledTableCell>
            <StyledTableCell align='right'>Income After Fee</StyledTableCell>
            <StyledTableCell align='right'>
              Post-tax Revenue (13 % in your area)
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell align='right'>${rawIncome}</StyledTableCell>
            <StyledTableCell align='right'>${incomeAfterFee}</StyledTableCell>
            <StyledTableCell align='right'>
              ${Number(incomeAfterFee * 0.87).toFixed(2)}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
