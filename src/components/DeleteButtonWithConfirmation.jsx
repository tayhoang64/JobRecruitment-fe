import React, { useState } from "react";
import { BASE_URL } from '../constants';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import axios from "axios";

const DeleteButtonWithConfirmation = ({ id, onDeleteSuccess }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/Template/${id}`);
      onDeleteSuccess(); 
      setOpen(false);
    } catch (error) {
        alert(error.response.data)
      console.error("Error deleting template:", error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
      >
        Delete
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this template? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteButtonWithConfirmation;
