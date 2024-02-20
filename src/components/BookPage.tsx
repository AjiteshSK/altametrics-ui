import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import UserReview from "./UserReview";
import { generateCoverUrl } from "../helpers/generateCoverUrl";
import { fetchAuthorNames } from "../helpers/fetchAuthorNames";
import ErrorPage from "../pages/ErrorPage";

interface BookData {
  title: string;
  [key: string]: any;
}

const BookPage: React.FC = () => {
  const [bookData, setBookData] = useState<BookData>({ title: "" });
  const [cover, setCover] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { bib_key, cover_key } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://openlibrary.org/books/${bib_key}.json`
        );
        setBookData(response?.data);
        const coverURL = cover_key?.startsWith("OL")
          ? generateCoverUrl(cover_key, "L")
          : `https://covers.openlibrary.org/b/id/${cover_key}-L.jpg`;
        setCover(coverURL);

        if (response?.data?.authors) {
          const authors = await fetchAuthorNames(response?.data?.authors);
          setAuthor(authors);
        } else {
          setAuthor("Author information unavailable");
        }
      } catch (err) {
        setError("An error occurred while fetching the book data.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [bib_key]);

  if (isLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (error) return <ErrorPage message={error} />;

  return (
    <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
      <Grid
        container
        spacing={4}
        alignItems="flex-start"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="100%"
              image={cover}
              alt={bookData.title}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={8}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {bookData.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {author}
            </Typography>
            <UserReview bibKey={bib_key} />
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookPage;
