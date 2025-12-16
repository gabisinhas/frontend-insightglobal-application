import { Grid, TextField, Button, Box, Typography, Paper, Snackbar, Alert } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";
import type { AddCarFormViewProps } from "./addCarForm.types";

const validationSchema = yup.object({
  make: yup.string().required("Make is required"),
  model: yup.string().required("Model is required"),
  year: yup
    .string()
    .matches(/^(19|20)\d{2}$/, "Enter a valid year")
    .required("Year is required"),
  color: yup.string().required("Color is required"),
  image: yup
    .string()
    .url("Enter a valid URL")
    .required("Image URL is required"),
});


export const AddCarFormView: React.FC<AddCarFormViewProps> = ({ onAddCar }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: {
      make: "",
      model: "",
      year: "",
      color: "",
      image: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onAddCar(values);
      setOpenSnackbar(true);
    },
  });

  return (
    <>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 2, px: 2 }}>
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom align="center" sx={{ mb: 4, pl: '2rem', pt: '1rem', color: 'primary.main' }}>
            Register a New Car
          </Typography>

          <Typography variant="body1" color="text.secondary" align="center" mb={4}>
            Fill in the details below
          </Typography>

          <form onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={3}>
              {[
                { name: "make", label: "Make" },
                { name: "model", label: "Model" },
                { name: "year", label: "Year", placeholder: "2023" },
                { name: "color", label: "Color" },
                { name: "image", label: "Image URL" },
              ].map(({ name, label, placeholder }) => (
                <Grid item xs={12} sm={name === "image" ? 12 : 6} key={name}>
                  <TextField
                    fullWidth
                    label={label}
                    name={name}
                    placeholder={placeholder}
                    value={formik.values[name as keyof typeof formik.values]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched[name as keyof typeof formik.touched] &&
                      Boolean(formik.errors[name as keyof typeof formik.errors])
                    }
                    helperText={
                      formik.touched[name as keyof typeof formik.touched] &&
                      formik.errors[name as keyof typeof formik.errors]
                    }
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
                  Add Car
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Form submitted successfully!</Alert>
      </Snackbar>
    </>
  );
};
