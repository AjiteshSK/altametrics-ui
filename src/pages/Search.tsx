import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import BookCardSkeleton from "../components/BookCardSkeleton";
import NotFound from "../components/NotFound";
import Grid from "@mui/material/Grid";

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { search_term } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const searchResponse = await axios.get(
          `https://openlibrary.org/search.json?q=${search_term}&page=1`
        );
        const filteredSearchResult = searchResponse?.data?.docs?.filter(
          (book: any) => book.author_name && book.isbn && book.cover_edition_key
        );
        setSearchResult(filteredSearchResult);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError("An error occurred while fetching the book data.");
          console.error(err.message);
        } else {
          setError("An unexpected error occurred.");
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [search_term]);

  return (
    <Grid container spacing={4} padding={3}>
      {!isLoading ? (
        searchResult?.length > 0 ? (
          searchResult?.map((book, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id || index}>
                <BookCard book={book} isSearch={true} />
              </Grid>
            );
          })
        ) : (
          <NotFound />
        )
      ) : (
        [1, 2, 3, 4].map((index) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <BookCardSkeleton />
            </Grid>
          );
        })
      )}
    </Grid>
  );
};

export default Search;
