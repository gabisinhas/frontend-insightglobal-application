import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { GET_CARS } from '../graphql/queries';

export const useCars = (search: string, sort: string) => {
  const { data, loading, error } = useQuery(GET_CARS);

  const filteredCars = useMemo(() => {
    const baseCars = data?.cars || [];

    return [...baseCars]
      .filter((car) =>
        car.model.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sort === 'year') return b.year - a.year;
        return (a[sort] || '').toString().localeCompare((b[sort] || '').toString());
      });
  }, [data, search, sort]);

  return { cars: filteredCars, loading, error };
};