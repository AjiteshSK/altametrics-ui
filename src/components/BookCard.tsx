import { useNavigate } from "react-router-dom";
import { BookType, SearchResult } from "../types";
import changeImageSize from "../helpers/changeimageSize";
import { generateCoverUrl } from "../helpers/generateCoverUrl";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IBookCardProps {
  book: BookType | SearchResult;
  isSearch: boolean;
}

const BookCard = ({ book, isSearch }: IBookCardProps) => {
  const navigate = useNavigate();
  const title = isSearch ? book.title : book?.details?.title;
  const bib_key = book?.key?.replace("/works/", ""); //here use book?.key
  const { cover_edition_key } = book;
  const imageURL = isSearch
    ? generateCoverUrl(book?.cover_edition_key, "M")
    : changeImageSize(book?.thumbnail_url, "M");

  return (
    <Card
      sx={{ maxWidth: 345 }}
      onClick={() => {
        navigate(`/app/book/${bib_key}/${cover_edition_key}`); //pass book?.key AND cover_edition_key
      }}
    >
      <CardMedia sx={{ height: 340 }} image={imageURL} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {book?.author_name?.length > 1
            ? book?.author_name?.join(", ")
            : book?.author_name[0]}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
