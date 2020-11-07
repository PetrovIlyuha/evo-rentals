import React, { useRef } from 'react';
import { createContext, useContext } from 'react';
import axios from 'axios';
import tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

import './MapProviderStyle.css';
const MapContext = createContext();

export const MapProvider = ({ children, apiKey }) => {
  let cachedMaps =
    JSON.parse(localStorage.getItem('evo-rentals-maps-cache')) || {};

  const normalizeLocationData = location => {
    return location.replace(/\s/g, '').toLowerCase();
  };

  const cacheLocation = (location, position) => {
    const key = normalizeLocationData(location);

    const updatedMapsCache = { ...cachedMaps, [key]: position };
    localStorage.setItem(
      'evo-rentals-maps-cache',
      JSON.stringify(updatedMapsCache),
    );
  };

  const getCachedLocation = location => {
    const key = normalizeLocationData(location);
    if (cachedMaps[key]) {
      return cachedMaps[key];
    }
  };

  const initTomTomMap = () => {
    const map = tt.map({
      key: apiKey,
      container: 'evo-map',
      style: 'tomtom://vector/1/basic-main',
      zoom: 15,
      scrollZoom: false,
    });
    const nav = new tt.NavigationControl({
      showExtendedRotationControls: true,
      showZoom: true,
      zoomStep: 2,
      showCompass: true,
      showPitch: true,
      showExtendedPitchControls: true,
      pitchStep: 20,
    });
    map.addControl(nav, 'top-right');
    return map;
  };

  const requestGeoLocation = async location => {
    if (getCachedLocation(location)) {
      return getCachedLocation(location);
    } else {
      try {
        const mapResponse = await axios.get(
          `https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}&typeahead=true`,
        );
        const position = mapResponse?.data?.results[0]?.position;
        if (position) {
          cacheLocation(location, position);
          return position;
        } else {
          return mapResponse?.data?.results;
        }
      } catch (err) {
        return 'Location was not found';
      }
    }
  };

  let marker = useRef(null);

  const addRentalMarker = (map, position) => {
    const markerElement = document.createElement('div');
    markerElement.className = 'rentals_marker';
    marker.current = new tt.Marker({
      element: markerElement,
    })
      .setLngLat([position.lon, position.lat])
      .addTo(map);
    marker.current.width = '40px';
  };

  const addPopupMessage = (map, message) => {
    new tt.Popup({
      className: 'rentals_map_popup',
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(new tt.LngLat(0, 0))
      .setHTML(`<p>${message}</p>`)
      .addTo(map);
  };

  const mapApi = {
    initTomTomMap,
    requestGeoLocation,
    addRentalMarker,
    addPopupMessage,
  };
  return <MapContext.Provider value={mapApi}>{children}</MapContext.Provider>;
};

export const useTomTomMap = () => {
  return useContext(MapContext);
};
