import { useEffect, useState } from 'react';

const useRentalFilterHome = (allRentals, price) => {
  const [listedCategories, setListedCategories] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

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

  let pipe = (...funcs) => x => funcs.reduce((v, f) => f(v), x);

  const filterCategory = rentals =>
    rentals.filter(rental => listedCategories.includes(rental.category));
  const priceFilter = rentals =>
    rentals.filter(rental => rental.dailyPrice <= price);

  let homePageRentalsFilterSystem = pipe(filterCategory, priceFilter);

  return {
    homePageRentalsFilterSystem,
    listedCategories,
    setListedCategories,
    uniqueCategories,
    setUniqueCategories,
  };
};

export default useRentalFilterHome;
