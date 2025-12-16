
export interface AddCarFormViewProps {
  onAddCar: (values: { make: string; model: string; year: string; color: string; image: string }) => void;
  onSubmit?: (values: { make: string; model: string; year: string; color: string; image: string }) => void;
  formData: {
    make: string;
    model: string;
    year: string;
    color: string;
    image: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AddCarFormContainerProps {
  onAddCar: (car: any) => void;
}
