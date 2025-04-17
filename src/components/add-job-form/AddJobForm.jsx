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

  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      let resumeUrl = "";

      if (resumeFile) {
        const formDataFile = new FormData();
        formDataFile.append("resume", resumeFile);

        const uploadRes = await fetch(
          "https://job-application-tracker-zkoo.onrender.com/api/upload-resume",
          {
            method: "POST",
            body: formDataFile,
          }
        );

        const uploadData = await uploadRes.json();
        resumeUrl = uploadData.url;
      }

      const row = [
        formData.position,
        formData.company,
        formData.link,
        formData.description,
        formData.date,
        resumeUrl,
      ];

      await onSubmit(row);

      setFormData({
        position: "",
        company: "",
        link: "",
        description: "",
        date: "",
      });
      setResumeFile(null);
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
    }
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
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files[0])}
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
