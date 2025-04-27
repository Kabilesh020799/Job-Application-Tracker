import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Typography,
} from "@mui/material";

const AddJobForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    position: "",
    company: "",
    link: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          p: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          textAlign: "center",
          color: "#2e3b55",
        }}
      >
        Add New Job
      </DialogTitle>

      <DialogContent>
        <Box mt={2} display="flex" flexDirection="column" gap={3}>
          <TextField
            name="position"
            label="Position"
            value={formData.position}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          />
          <TextField
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          />
          <TextField
            name="link"
            label="Link"
            value={formData.link}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={4}
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          />

          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography
              sx={{ fontWeight: "bold", color: "#2e3b55", fontSize: "16px" }}
            >
              Upload Resume (PDF)
            </Typography>
            <Button
              component="label"
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "white",
              }}
            >
              Choose File
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => setResumeFile(e.target.files[0])}
              />
            </Button>
            {resumeFile && (
              <Typography
                variant="body2"
                sx={{ color: "#555", fontStyle: "italic", mt: 1 }}
              >
                {resumeFile.name}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobForm;
