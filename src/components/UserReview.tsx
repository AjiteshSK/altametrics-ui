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
  Snackbar,
  Alert,
  SelectChangeEvent,
} from "@mui/material";

import Rating from "@mui/lab/Rating";
import axios from "axios";
import { SnackbarState } from "../types";

type IUserReviewProps = {
  bibKey: string | undefined;
};

const UserReview = ({ bibKey }: IUserReviewProps) => {
  const token = localStorage.getItem("token_ol");

  const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const [status, setStatus] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    (async () => {
      try {
        const review = await apiClient.get(`/review/get-review/${bibKey}`);
        if (review?.data) {
          const { data } = review;
          setRating(data?.rating);
          setNotes(data?.review);
          setStatus(data?.status);
        }
      } catch (error) {
        console.log("REVIW NOT FOUND: ERROR", error);
      }
    })();
  }, [isEditMode]);

  const handleOnStatusChange = (event: SelectChangeEvent<string>) => {
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
          if (deletedReview?.status === 200) {
            showSnackbar("Review deleted successfully", "success");
          }
          setIsEditMode(false);
        } else {
          const updatedReview = await apiClient.put("/review/update-review", {
            book: bibKey,
            status: status.toLowerCase(),
            review: notes,
            rating,
          });
          if (updatedReview?.status === 200) {
            showSnackbar("Review updated successfully", "success");
          }
        }
        setIsEditMode(false);
      } catch (error) {
        showSnackbar("Review update failed", "error");
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
              defaultValue={status}
              label="Status"
              onChange={handleOnStatusChange}
            >
              <MenuItem value="None">None</MenuItem>
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
                      console.log("EVENT", event);
                      setRating(newValue as number);
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
                sx={{ backgroundColor: "#000" }}
                onClick={handleOnSubmit}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
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
            <Typography
              variant="body2"
              sx={{ flexGrow: 1, textAlign: "right" }}
            >
              Status: {status || "Not in shelf"}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {notes}
          </Typography>
        </Paper>
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
    </>
  );
};

export default UserReview;
