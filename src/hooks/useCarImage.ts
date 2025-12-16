import { useMediaQuery } from '@mui/material';
import { carImages } from '../constants/carImages';
import { Car } from './useCars';

export const useCarImage = (car: Car) => {
  const isMobile = useMediaQuery('(max-width:640px)');
  const isTablet = useMediaQuery('(max-width:1023px)');

  const key = `${car.make}-${car.model}`;
  const images = carImages[key];

  if (!images) return '';

  if (isMobile) return images.mobile;
  if (isTablet) return images.tablet;
  return images.desktop;
};
