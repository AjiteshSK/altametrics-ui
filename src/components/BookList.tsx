import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ReviewCard from "./ReviewCard";
import BookCardSkeleton from "./BookCardSkeleton";
import { Snackbar, Alert } from "@mui/material";
import { Review } from "../types";
import axios from "axios";

const BookList = () => {
  const token = localStorage.getItem("token_ol");

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const reviews = await apiClient.get("/review/get-all-reviews");
        setReviews(reviews?.data);
      } catch (error) {
        console.error("Error fetching user's reviews", error);
        setOpenSnackbar(true);
      }
    })();
  }, []);
  return (
    <Grid container spacing={3} sx={{ px: 3, py: 2 }}>
      {reviews
        ? reviews?.map((review, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={review?.id || index}>
              <ReviewCard review={review} />
            </Grid>
          ))
        : Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <BookCardSkeleton />
            </Grid>
          ))}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          An error has occurred
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default BookList;
