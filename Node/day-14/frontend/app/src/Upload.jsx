import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Upload() {
  const [files, setFiles] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  // 🔹 keeps last rendered progress per upload
  const progressRef = useRef({});

  useEffect(() => {
    socket.on("upload-progress", ({ uploadId, percent }) => {
      animateProgress(uploadId, percent);
    });

    socket.on("upload-complete", ({ uploadId }) => {
      animateProgress(uploadId, 100);
    });

    socket.on("upload-error", ({ uploadId, error }) => {
      setFiles((prev) => ({
        ...prev,
        [uploadId]: { ...prev[uploadId], error },
      }));
    });

    return () => socket.disconnect();
  }, []);

  // 🔹 Smooth 1 → 100 animation
  const animateProgress = (uploadId, target) => {
    if (!progressRef.current[uploadId]) {
      progressRef.current[uploadId] = 0;
    }

    const interval = setInterval(() => {
      progressRef.current[uploadId] += 1;

      setFiles((prev) => ({
        ...prev,
        [uploadId]: {
          ...prev[uploadId],
          percent: progressRef.current[uploadId],
        },
      }));

      if (progressRef.current[uploadId] >= target) {
        clearInterval(interval);
      }
    }, 20); // controls speed (lower = faster)
  };

  const handleUpload = async () => {
    for (let file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      axios.post("http://localhost:5000/upload", formData);
    }
  };

  return (
    <>
      <input
        type="file"
        multiple
        onChange={(e) => setSelectedFiles(e.target.files)}
      />
      <button onClick={handleUpload}>Upload</button>

      <div style={{ marginTop: "20px" }}>
        {Object.entries(files).map(([id, data]) => (
          <div key={id} style={{ marginBottom: "15px" }}>
            <strong>{id}</strong>

            <div
              style={{
                height: "10px",
                width: "300px",
                background: "#ddd",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${data.percent || 0}%`,
                  background: "green",
                  transition: "width 0.2s",
                }}
              />
            </div>

            <p>{data.percent || 0}%</p>

            {data.error && <p style={{ color: "red" }}>{data.error}</p>}
          </div>
        ))}
      </div>
    </>
  );
}
