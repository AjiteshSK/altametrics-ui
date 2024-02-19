import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Box,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  TextareaAutosize,
  Button,
} from "@mui/material";
import Rating from "@mui/lab/Rating";
import axios from "axios";
const token = localStorage.getItem("token_ol");
console.log("TOKEN", token);
//axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
type IUserReviewProps = {
  bibKey: string | undefined;
};
//ONly import bib_key and make API call in here ? yes. store shit in localStorage

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
const UserReview = ({ bibKey }: IUserReviewProps) => {
  const [status, setStatus] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [rating, setRating] = useState<number>(0); //set data in repsonse to api call
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const review = await apiClient.get(`/review/get-review/${bibKey}`);
        if (review?.data) {
          const { data } = review;
          setRating(data.rating);
          setNotes(data.review);
          setStatus(status);
        }

        console.log("REV_RECEIVED", review);
      } catch (error) {
        console.log("Error while fetching review", error);
      }
    })();
  }, []);

  const handleOnStatusChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newStatus = event.target.value as string;
    if (newStatus !== "Read") {
      setRating(rating || 0);
      setNotes(notes || "");
    }
    setStatus(newStatus);
  };

  const handleOnNotesChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNotes(event.target.value);
  };

  const handleOnSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    (async () => {
      try {
        if (status === "None") {
          const deletedReview = await apiClient.delete(
            `/review/delete-review/${bibKey}`
          );
          setIsEditMode(false);
        } else {
          const updatedReview = await apiClient.put("/review/update-review", {
            isbn: bibKey,
            status: status.toLowerCase(),
            review: notes,
            rating,
          });
        }
        setIsEditMode(false);
      } catch (error) {
        console.log("Error while fetching review", error);
      }
    })();
  };
  return (
    <>
      {isEditMode ? (
        <Box
          component="form"
          sx={{
            "& .MuiFormControl-root": { m: 1, minWidth: 120 },
            "& .MuiButton-root": { m: 1 },
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={handleOnStatusChange}
            >
              <MenuItem value="None">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Read">Read</MenuItem>
              <MenuItem value="Want To Read">Want To Read</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ marginTop: "10px" }}>
            {status === "Read" && (
              <>
                {" "}
                <FormControl fullWidth>
                  <Rating
                    name="rating"
                    value={rating}
                    sx={{ marginBottom: "20px" }}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                    readOnly={!isEditMode}
                  />
                </FormControl>
                <TextareaAutosize
                  minRows={3}
                  style={{ width: "100%", padding: "8px", marginLeft: "10px" }}
                  placeholder="Add Notes"
                  value={notes}
                  onChange={handleOnNotesChange}
                />
              </>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                color="inherit"
                onClick={() => {
                  setIsEditMode(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOnSubmit}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating name="read-only" value={rating} readOnly />
            <Typography
              variant="body2"
              onClick={() => {
                setIsEditMode(true);
              }}
              sx={{ ml: 1, cursor: "pointer" }}
            >
              edit
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {notes}
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default UserReview;
