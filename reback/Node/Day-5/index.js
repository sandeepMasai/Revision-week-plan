const express = require("express");
const fs = require("fs");
const readline = require("readline");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/process-file", async (req, res) => {
  const inputPath = path.join(__dirname, "input.csv");
  const outputPath = path.join(__dirname, "output.csv");

  try {
    const totalSize = fs.statSync(inputPath).size;
    let processedBytes = 0;

    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);

    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    readStream.on("data", (chunk) => {
      processedBytes += chunk.length;
    });

    rl.on("line", (line) => {
      const processedLine = line.toUpperCase();
      writeStream.write(processedLine + "\n");
    });

    rl.on("close", () => {
      writeStream.end();
      res.json({
        message: "File processed successfully",
        progress: "100%",
      });
    });

    readStream.on("error", handleError);
    writeStream.on("error", handleError);

    function handleError(err) {
      console.error(err);
      res.status(500).json({ error: "File processing failed" });
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
