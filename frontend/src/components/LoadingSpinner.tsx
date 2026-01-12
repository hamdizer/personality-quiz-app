import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  message?: string;
  size?: "small" | "medium" | "large";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = "medium",
}) => {
  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
      }}
    >
      <CircularProgress
        size={sizeMap[size]}
        thickness={4}
        sx={{ mb: 2, color: "primary.main" }}
      />
      <Typography variant="body1" color="text.secondary" fontWeight={500}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
