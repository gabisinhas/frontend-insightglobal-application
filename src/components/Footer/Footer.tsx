import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 2,
        mt: 2,
        backgroundColor: "#f5f5f5",
        width: "100%",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © 2025 Car Management System. All rights reserved.
      </Typography>
    </Box>
  );
};