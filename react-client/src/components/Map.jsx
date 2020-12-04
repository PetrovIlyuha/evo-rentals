import React, { useCallback, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

import { useTomTomMap } from '../context/MapProvider';

const useStyles = makeStyles(theme => ({
  mapDimentions: {
    width: '100%',
    height: '500px',
    margin: '2rem 0px',
    border: '10px solid #3fea43',
    borderRadius: '10px',
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

  return <div id='evo-map' className={classes.mapDimentions}></div>;
};

export default Map;
