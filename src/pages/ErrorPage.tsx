import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorPage: React.FC<{ message?: string }> = ({
  message = "An unexpected error has occurred.",
}) => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      style={{ textAlign: "center", paddingTop: "5rem" }}
    >
      <ErrorOutlineIcon style={{ fontSize: 80, color: "red" }} />
      <Typography variant="h4" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/app/dashboard")}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default ErrorPage;
