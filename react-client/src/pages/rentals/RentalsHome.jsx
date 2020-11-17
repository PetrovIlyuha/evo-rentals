import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGlobe from 'react-globe';

import BaseLayout from '../../components/ui_layout/BaseLayout';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import { makeStyles } from '@material-ui/styles';

import RentalCard from './RentalCard';
import { listAllRentals } from '../../redux/rentals_slice/rentalActions';
import Loading from '../../components/ui_layout/Loading';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxHeight: '150px',
    backgroundColor: '#4D35B0',
    color: theme.palette.common.lightYellow,
    padding: '14px 5px',
    borderRadius: 10,
  },
  globeContainer: {
    marginTop: '-4rem',
    marginBottom: '2rem',
  },
  globe: {
    height: '20vh',
  },
}));
const RentalsHome = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { rentals: allRentals, loading } = useSelector(state => state.rentals);
  const { userId } = useSelector(state => state.userLogin);
  const [listedCategories, setListedCategories] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [price, setPrice] = React.useState(
    allRentals?.reduce((acc, item) => Math.max(item.dailyPrice, acc), 0),
  );

  const handleSliderChange = (event, newValue) => {
    setPrice(newValue);
  };

  useEffect(() => {
    dispatch(listAllRentals());
  }, [dispatch]);

  useEffect(() => {
    const categoriesUnique = [];
    allRentals?.forEach(rental => {
      if (!categoriesUnique.includes(rental.category)) {
        categoriesUnique.push(rental.category);
      } else {
        return;
      }
    });

    setListedCategories(categoriesUnique);
    setUniqueCategories(categoriesUnique);
  }, [allRentals]);

  if (loading) {
    return <Loading size='50px' loading={loading} />;
  }

  const toggleShowCategory = category => {
    if (!listedCategories.includes(category)) {
      setListedCategories([...listedCategories, category]);
    } else {
      const newCategories = listedCategories.filter(cat => cat !== category);
      setListedCategories([...newCategories]);
    }
  };

  const filterByCategory = () => {
    return (
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon style={{ fontSize: '2rem' }} />}
        defaultExpandIcon={<ChevronRightIcon style={{ fontSize: '2rem' }} />}
        multiSelect>
        <TreeItem nodeId='1' label='Categories'>
          {uniqueCategories.map((cat, idx) => (
            <TreeItem
              nodeId={String(idx + 2)}
              label={cat}
              key={idx}
              style={{
                width: '80%',
                backgroundColor: listedCategories.includes(cat)
                  ? '#2D0876'
                  : '#F2BF6C',
                color: listedCategories.includes(cat) ? '#F2BF6C' : '#2D0876',
                borderRadius: 4,
                marginTop: 5,
                marginBottom: 5,
              }}
              onClick={() => toggleShowCategory(cat)}
            />
          ))}
        </TreeItem>
      </TreeView>
    );
  };
  return (
    <BaseLayout>
      <Grid
        container
        align='center'
        direction='row'
        justify='around'
        spacing={2}
        className={classes.globeContainer}>
        <Grid item lg={12} md={12} xs={12} className={classes.globe}>
          <ReactGlobe style={{ height: '10vh' }} />
        </Grid>
      </Grid>
      <Grid container spacing={8}>
        <Grid item lg={6} md={6} xs={6}>
          {filterByCategory()}
        </Grid>
        <Grid item lg={4} md={4} xs={4}>
          <Typography variant='h3'>Price Filter: $ {price}</Typography>
          <Slider
            value={price || 100}
            onChange={handleSliderChange}
            aria-labelledby='input-slider'
          />
        </Grid>
      </Grid>
      <Grid container justify='center' align='center' spacing={3}>
        {allRentals &&
          allRentals
            .filter(rental => listedCategories.includes(rental.category))
            .filter(rental => rental.dailyPrice <= price)
            .map((rental, index) => {
              const isOwner = userId === rental.owner._id;
              return (
                <Grid item lg={3} md={3} xs={12} sm={6} key={index}>
                  <RentalCard rental={rental} isOwner={isOwner} />
                </Grid>
              );
            })}
      </Grid>
    </BaseLayout>
  );
};

export default RentalsHome;
