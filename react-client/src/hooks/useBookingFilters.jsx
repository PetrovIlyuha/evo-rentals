import moment from 'moment';
import { useState } from 'react';
import {
  dateEndFilterAsc,
  dateEndFilterDesc,
  dateStartFilterAsc,
  dateStartFilterDesc,
  priceFilterAsc,
  priceFilterDesc,
} from '../utils/sortingFunctions';

export function useBookingFilters({ placedByMe }) {
  const dateRelevanceFilter = placedByMe
    ? bookings =>
        bookings.filter(booking =>
          moment().diff(moment(booking.endDate), 'days') > 0 ? null : booking,
        )
    : bookings => bookings;

  const [filters, setFilters] = useState([
    dateStartFilterAsc,
    priceFilterAsc,
    dateRelevanceFilter,
  ]);

  let pipe = (...funcs) => x => funcs.reduce((v, f) => f(v), x);

  let activeFilters = pipe(...filters);

  const setArrivalDateFilters = () => {
    const dateAscInFilters = filters.find(
      fn => fn.name === 'dateStartFilterAsc',
    );
    if (dateAscInFilters) {
      let newFilters = filters.filter(f => f.name !== 'dateStartFilterAsc');
      setFilters([...newFilters, dateStartFilterDesc]);
    } else {
      let newFilters = filters.filter(f => f.name !== 'dateStartFilterDesc');
      setFilters([...newFilters, dateStartFilterAsc]);
    }
  };

  const setPriceFilters = () => {
    const priceAscendingInFilters = filters.find(
      fn => fn.name === 'priceFilterAsc',
    );
    if (priceAscendingInFilters) {
      let newFilters = filters.filter(f => f.name !== 'priceFilterAsc');
      setFilters([...newFilters, priceFilterDesc]);
    } else {
      let newFilters = filters.filter(f => f.name !== 'priceFilterDesc');
      setFilters([...newFilters, priceFilterAsc]);
    }
  };

  const setDepartureDateFilters = () => {
    const departDateAscInFilters = filters.find(
      fn => fn.name === 'dateEndFilterAsc',
    );
    if (departDateAscInFilters) {
      let newFilters = filters.filter(f => f.name !== 'dateEndFilterAsc');
      setFilters([...newFilters, dateEndFilterDesc]);
    } else {
      let newFilters = filters.filter(f => f.name !== 'dateEndFilterDesc');
      setFilters([...newFilters, dateEndFilterAsc]);
    }
  };
  return {
    setArrivalDateFilters,
    setPriceFilters,
    setDepartureDateFilters,
    filters,
    setFilters,
    activeFilters,
  };
}
