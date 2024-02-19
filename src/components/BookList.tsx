import React from "react";
import Grid from "@mui/material/Grid";
import data from "../../big_data.json";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";

const BookList = () => {
  return (
    <Grid container spacing={3} sx={{ px: 3, py: 2 }}>
      {data
        ? Object.values(data).map((book, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book?.id || index}>
              <BookCard book={book} isSearch={false} />
            </Grid>
          ))
        : Array.from(new Array(4)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <BookCardSkeleton />
            </Grid>
          ))}
    </Grid>
  );
};

export default BookList;
