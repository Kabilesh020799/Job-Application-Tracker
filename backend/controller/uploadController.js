const { Readable } = require("stream");
const cloudinary = require("../models/cloudinaryModel");

exports.uploadResume = async (req, res) => {
  try {
    const originalFilename = req.file.originalname;
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder: "resumes",
        public_id: originalFilename,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.status(200).json({ url: result.secure_url });
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(req.file.buffer);
    readable.push(null);
    readable.pipe(stream);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
