// প্রয়োজনীয় প্যাকেজ ইমপোর্ট করছি
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Content = require("./models/Content"); // MongoDB মডেল

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI (তোমার নিজের URI বসাবে .env থেকে)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// কনটেন্ট আপলোড রাউট
app.post("/api/upload", async (req, res) => {
  const { type, content, accessId } = req.body;

  try {
    const newContent = new Content({ type, content, accessId });
    await newContent.save();
    res.status(201).json({ message: "Content uploaded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

// কনটেন্ট ভিউ + অটো ডিলিট
app.get("/api/view/:accessId", async (req, res) => {
  const { accessId } = req.params;

  try {
    const content = await Content.findOneAndDelete({ accessId });

    if (!content) {
      return res.status(404).json({ error: "Content not found or already viewed" });
    }

    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// লিসেন শুরু
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
require('dotenv').config();
