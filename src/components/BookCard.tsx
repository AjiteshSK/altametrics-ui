import React from "react";
import { useNavigate } from "react-router-dom";
import { BookType, SearchResult } from "../types";
import changeImageSize from "../helpers/changeimageSize";
import { generateCoverUrl } from "../helpers/generateCoverUrl";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface IBookCardProps {
  book: BookType | SearchResult;
  isSearch: boolean;
}

const BookCard = ({ book, isSearch }: IBookCardProps) => {
  const navigate = useNavigate();
  const title = isSearch ? book.title : book?.details?.title;
  const bib_key = isSearch ? book.isbn[0] : book.bib_key?.slice(6);
  const imageURL = isSearch
    ? generateCoverUrl(book?.cover_edition_key, "M")
    : changeImageSize(book?.thumbnail_url, "M");

  const defaultImageURL =
    "https://media.istockphoto.com/id/1464547965/photo/worker-thinking-or-typing-on-laptop-in-cafe-coffee-shop-or-restaurant-on-startup-ideas-vision.jpg?s=1024x1024&w=is&k=20&c=nsHJ2Sew3AsReg2OqKIw6hqSfyfN_xmqr-3TOwmSRUA=";

  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => {
        navigate(`/app/book/${bib_key}`);
      }}
    >
      <CardMedia sx={{ height: 340 }} image={imageURL} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
