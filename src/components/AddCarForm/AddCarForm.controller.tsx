import { useState } from "react";
import { AddCarFormView } from "./AddCarForm.view";
import { Alert } from "@mui/material";

interface AddCarFormContainerProps {
  onAddCar: (car: any) => void;
}

export const AddCarForm = ({ onAddCar }: AddCarFormContainerProps) => {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    image: "",
  });

  const [successMessage, setSuccessMessage] = useState("");


  const handleSubmit = async (values: { make: string; model: string; year: string; color: string; image: string }) => {
    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          year: Number(values.year),
        }),
      });
      if (!response.ok) throw new Error('Erro ao adicionar carro');
      setSuccessMessage("Your submission was successful!");
      setFormData({
        make: "",
        model: "",
        year: "",
        color: "",
        image: "",
      });
    } catch (e) {
      setSuccessMessage("Erro ao adicionar carro!");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      )}
      <AddCarFormView
        onAddCar={onAddCar}
        onSubmit={handleSubmit}
        formData={formData}
        onInputChange={handleInputChange}
      />
    </>
  );
};
