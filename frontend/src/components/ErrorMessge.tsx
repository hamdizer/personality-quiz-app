import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import {
  Error as ErrorIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  title = "Oops! Something went wrong",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        background: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent sx={{ textAlign: "center", p: 4 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              backgroundColor: "error.light",
              margin: "0 auto 16px",
            }}
          >
            <ErrorIcon sx={{ fontSize: 40, color: "error.dark" }} />
          </Avatar>

          <Typography variant="h5" gutterBottom fontWeight={700}>
            {title}
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {message}
          </Typography>

          {onRetry && (
            <Button
              variant="contained"
              color="primary"
              onClick={onRetry}
              startIcon={<RefreshIcon />}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ErrorMessage;
