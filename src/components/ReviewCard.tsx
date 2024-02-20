import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";
import { Review } from "../types";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IReviewCardProps {
  review: Review;
}

interface BookData {
  title: string;
  [key: string]: any;
}

const ReviewCard = ({ review }: IReviewCardProps) => {
  const navigate = useNavigate();
  const [cover, setCover] = useState<string>("");
  const [bookData, setBookData] = useState<BookData>({ title: "" });
  //const [author, setAuthor] = useState<string>("");
  useEffect(() => {
    (async () => {
      try {
        const data = await axios.get(
          `https://openlibrary.org/books/${review?.book}.json`
        );
        setBookData(data?.data);
        const coverURL = data?.data?.covers
          ? `https://covers.openlibrary.org/b/id/${data?.data?.covers[0]}-L.jpg`
          : "https://via.placeholder.com/150";
        setCover(coverURL);

        // if (data?.data?.authors) {
        //   const authorId = data?.data?.authors[0]?.author?.key;
        //   const authorData = await axios.get(
        //     `https://openlibrary.org${authorId}.json`
        //   );
        //   setAuthor(authorData?.data?.name);
        // } else {
        //   setAuthor("Author information unavailable");
        // }
      } catch (error) {
        console.error("Error in ReviewCard", error);
      }
    })();
  }, []);

  return (
    <Card
      onClick={() => {
        navigate(`/app/book/${review?.book}/${bookData?.covers[0]}`);
      }}
      sx={{ maxWidth: 345, height: "100%", cursor: "pointer" }}
    >
      <CardMedia component="img" height="200" image={cover} alt="Cover" />
      <CardContent
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {bookData?.title}
        </Typography>
        {review?.status == "read" ? (
          <>
            <Rating name="read-only" value={review?.rating} readOnly />
            <Typography variant="body2" color="text.secondary">
              <Typography sx={{ color: "text.primary", marginTop: "10px" }}>
                {review?.review}
              </Typography>
            </Typography>
          </>
        ) : (
          <Typography
            className="MuiTypography-subtitle1"
            sx={{ color: "text.secondary", marginTop: "10px" }}
          >
            {review?.status}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
