import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BookCard from "../components/BookCard";
import BookCardSkeleton from "../components/BookCardSkeleton";
import NotFound from "../components/NotFound";
import Grid from "@mui/material/Grid";
import { Alert, Snackbar } from "@mui/material";
import { SnackbarState } from "../types";

const Search = () => {
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev: any) => ({ ...prev, open: false }));
  };

  const { search_term } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const searchResponse = await axios.get(
          `https://openlibrary.org/search.json?q=${search_term}&page=1`
        );
        const filteredSearchResult = searchResponse?.data?.docs?.filter(
          (book: any) => book.author_name && book.key && book.cover_edition_key
        );
        setSearchResult(filteredSearchResult);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          showSnackbar(
            "An error occurred while fetching the search results",
            "error"
          );
          console.error(err.message);
        } else {
          showSnackbar("An unexpected error has occurred", "error");
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
              <Grid item xs={12} sm={6} md={4} lg={3} key={book?.id || index}>
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Search;
