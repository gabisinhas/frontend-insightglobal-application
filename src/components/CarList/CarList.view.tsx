import React from 'react';
import { Box, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CarListViewProps {
  cars: any[];
  loading: boolean;
  error: any;
  search: string;
  sort: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortChange: (e: any) => void;
}

export const CarListView = ({ 
  cars, 
  loading, 
  error, 
  search, 
  sort, 
  onSearchChange, 
  onSortChange
}: CarListViewProps) => {
  const navigate = useNavigate();

  const handleAddCarClick = () => {
    navigate("/add-car");
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" align="center" sx={{ p: 4 }}>Error loading cars.</Typography>;

  return (
    <Box>
      <Box className="container">
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mb: 4 , pl: '2rem', pt: '1rem' }}>
          Welcome to Car Fleet!
        </Typography>

        {/* Seção de Filtros */}
        <Grid container spacing={2} sx={{ mb: 4, alignItems: 'center', pl: '2rem' }}>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Search by Model"
              value={search}
              onChange={onSearchChange}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="sort-by-label">Sort By</InputLabel>
              <Select
                value={sort}
                labelId="sort-by-label"
                onChange={onSortChange}
                sx={{ backgroundColor: 'white', borderRadius: 1 }}
              >
                <MenuItem value="make">Make</MenuItem>
                <MenuItem value="model">Model</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3} sx={{ textAlign: { sm: 'right' } }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleAddCarClick}
              disableElevation
              fullWidth
              sx={{ height: '100%' }}
            >
              Add New Car
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className="grid-container">
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
              <Card className="card">
                <Box className="image-box">
                  <picture style={{ width: "100%", height: "100%" }}>
                    <source media="(max-width: 640px)" srcSet={car.mobile} />
                    <source media="(max-width: 1023px)" srcSet={car.tablet} />
                    <img
                      src={car.desktop}
                      alt={`${car.make} ${car.model}`}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </picture>
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" color="primary" fontWeight="bold">
                    {car.make}
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: '1.1rem', lineHeight: 1.2, mb: 1 }}>
                    {car.model}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                    <Typography variant="body2" color="text.secondary">Ano: {car.year}</Typography>
                    <Typography variant="body2" color="text.secondary">Cor: {car.color}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {cars.length === 0 && (
          <Typography align="center" sx={{ mt: 10, color: 'text.secondary' }}>
            No cars found for "{search}".
          </Typography>
        )}
      </Box>
    </Box>
  );
};
