import express from "express";
import { exec } from "child_process";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint
app.post("/api/download", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  // Run yt-dlp to fetch direct video link
  exec(`yt-dlp -f mp4 --get-url "${url}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr);
      return res.status(500).json({ error: "Failed to fetch video" });
    }
    const directUrl = stdout.trim();
    res.json({ downloadUrl: directUrl });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
