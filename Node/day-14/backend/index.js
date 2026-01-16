const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const multer = require("multer");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

// Socket connection
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
});

// Multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload endpoint
app.post("/upload", (req, res) => {
  const uploadId = uuidv4();
  const totalBytes = Number(req.headers["content-length"]);
  let uploadedBytes = 0;

  req.on("data", (chunk) => {
    uploadedBytes += chunk.length;
    const percent = Math.round((uploadedBytes / totalBytes) * 100);

    io.emit("upload-progress", {
      uploadId,
      percent,
    });
  });

  upload.single("file")(req, res, (err) => {
    if (err) {
      io.emit("upload-error", {
        uploadId,
        error: err.message,
      });
      return res.status(500).json({ error: err.message });
    }

    io.emit("upload-complete", { uploadId });
    res.json({ uploadId, message: "Upload complete" });
  });
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

server.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
