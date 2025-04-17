import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";

const AddJobForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    link: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const row = [
      formData.position,
      formData.company,
      formData.link,
      formData.description,
      formData.date,
    ];
    onSubmit(row);
    setFormData({
      position: "",
      company: "",
      link: "",
      description: "",
      date: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Job</DialogTitle>
      <DialogContent>
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <TextField
            name="position"
            label="Position"
            value={formData.position}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="link"
            label="Link"
            value={formData.link}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={3}
          />
          <TextField
            name="date"
            label="Date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobForm;
