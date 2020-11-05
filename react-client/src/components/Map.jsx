import React, { useCallback, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

import { useTomTomMap } from '../context/MapProvider';

const useStyles = makeStyles(theme => ({
  mapDimentions: {
    width: '700px',
    height: '500px',
    margin: '2rem 0px',
    [theme.breakpoints.down('md')]: {
      width: '80vw',
      height: '40vw',
    },
  },
}));

const Map = ({ location }) => {
  const classes = useStyles();
  const {
    initTomTomMap,
    requestGeoLocation,
    addRentalMarker,
    addPopupMessage,
  } = useTomTomMap();
  let map = useRef(null);

  const getLocation = useCallback(
    async location => {
      const position = await requestGeoLocation(location);
      if (Object.keys(position).length > 0) {
        const { lon, lat } = position;
        map.current.setCenter(new tt.LngLat(lon, lat));
        addRentalMarker(map.current, position);
      } else {
        addPopupMessage(map.current, 'No place was found...');
      }
    },
    [requestGeoLocation, addRentalMarker, addPopupMessage],
  );

  useEffect(() => {
    if (location) {
      getLocation(location);
    }
  }, [location, getLocation]);

  useEffect(() => {
    map.current = initTomTomMap();
  }, [initTomTomMap]);

  return (
    <Grid item lg={8} md={8} xs={12}>
      <div id='evo-map' className={classes.mapDimentions}></div>
    </Grid>
  );
};

export default Map;
