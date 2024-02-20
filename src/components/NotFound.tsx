import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", marginTop: "2rem" }}>
      <Typography variant="h3" gutterBottom>
        Open Library didn't return any results
      </Typography>
      <Typography variant="subtitle1">Try again</Typography>
      <Button
        variant="outlined"
        sx={{ marginTop: "2rem" }}
        onClick={() => navigate("/app/dashboard")}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
