import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", width: "100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div">
          Car Management System
        </Typography>
        <Box>
          <Typography variant="body2" sx={{ color: "#fff" }}>
            Welcome, User
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};