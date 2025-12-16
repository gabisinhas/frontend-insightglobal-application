import { Grid, TextField, Button, Box, Typography, Paper, Snackbar, Alert } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import React, { useState } from "react";

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

interface AddCarFormViewProps {
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

export const AddCarFormView: React.FC<AddCarFormViewProps> = ({ onAddCar, onSubmit, formData, onInputChange }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: (values) => {
      setOpenSnackbar(true);
      if (onSubmit) {
        onSubmit(values);
      } else {
        onAddCar(values);
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 2,
          px: 2,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom align="center">
            Register a New Car
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            mb={4}
          >
            Fill in the details below
          </Typography>

          <form onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Make"
                  name="make"
                  value={formData.make}
                  onChange={(e) => {
                    formik.handleChange(e);
                    onInputChange(e as React.ChangeEvent<HTMLInputElement>);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.make && Boolean(formik.errors.make)}
                  helperText={formik.touched.make && formik.errors.make}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Model"
                  name="model"
                  value={formData.model}
                  onChange={(e) => {
                    formik.handleChange(e);
                    onInputChange(e as React.ChangeEvent<HTMLInputElement>);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.model && Boolean(formik.errors.model)}
                  helperText={formik.touched.model && formik.errors.model}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Year"
                  name="year"
                  placeholder="2023"
                  value={formData.year}
                  onChange={(e) => {
                    formik.handleChange(e);
                    onInputChange(e as React.ChangeEvent<HTMLInputElement>);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.year && Boolean(formik.errors.year)}
                  helperText={formik.touched.year && formik.errors.year}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Color"
                  name="color"
                  value={formData.color}
                  onChange={(e) => {
                    formik.handleChange(e);
                    onInputChange(e as React.ChangeEvent<HTMLInputElement>);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.color && Boolean(formik.errors.color)}
                  helperText={formik.touched.color && formik.errors.color}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Image URL"
                  name="image"
                  placeholder="https://example.com/car.jpg"
                  value={formData.image}
                  onChange={(e) => {
                    formik.handleChange(e);
                    onInputChange(e as React.ChangeEvent<HTMLInputElement>);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.touched.image && Boolean(formik.errors.image)}
                  helperText={formik.touched.image && formik.errors.image}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 2 }}
                >
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
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Form submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};
