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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddCar({
      ...formData,
      id: Date.now().toString(),
      year: Number(formData.year),
    });

    setSuccessMessage("Your submission was successful!");

    setFormData({
      make: "",
      model: "",
      year: "",
      color: "",
      image: "",
    });
  };

  return (
    <>
      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage("")}>
          {successMessage}
        </Alert>
      )}
      <AddCarFormView onAddCar={onAddCar} onSubmit={handleSubmit} />
    </>
  );
};
