import React, { useState } from "react";
import {
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextareaAutosize,
  Box,
} from "@mui/material";

interface IUserActionsProps {
  bibKey: string | undefined;
}

const UserActions = ({ bibKey }: IUserActionsProps) => {
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [notes, setNotes] = useState("");

  const handleOnStatusChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newStatus = event.target.value as string;
    if (newStatus !== "Read") {
      setRating(0);
      setNotes("");
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
    console.log("SUBMIT", { status, rating, notes, bibKey });
    // Submit logic here
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiFormControl-root": { m: 1, minWidth: 120 },
        "& .MuiButton-root": { m: 1 },
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select value={status} label="Status" onChange={handleOnStatusChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Read">Read</MenuItem>
          <MenuItem value="Want To Read">Want To Read</MenuItem>
        </Select>
      </FormControl>

      {status === "Read" && (
        <>
          <FormControl fullWidth>
            <Rating
              name="rating"
              value={rating}
              sx={{ marginBottom: "20px" }}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
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

      {status && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button color="inherit">Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleOnSubmit}>
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default UserActions;
