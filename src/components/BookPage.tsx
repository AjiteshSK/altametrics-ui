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

  const { bib_key } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://openlibrary.org/isbn/${bib_key}.json`
        );
        setBookData(response?.data);
        setCover(
          response?.data?.covers
            ? `https://covers.openlibrary.org/b/id/${response?.data?.covers[0]}-L.jpg`
            : "https://via.placeholder.com/150"
        );

        if (response?.data?.authors) {
          const authorId = response?.data?.authors[0]?.key;
          const authorData = await axios.get(
            `https://openlibrary.org${authorId}.json`
          );
          setAuthor(authorData?.data?.name);
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
  if (error) return <Typography color="error">{error}</Typography>;

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
            {/* <UserActions bibKey={bib_key} /> */}
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookPage;
