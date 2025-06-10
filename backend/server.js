// 🔐 .env ফাইল থেকে গোপন তথ্য নিতে চাই
require("dotenv").config();

// 🧩 প্রয়োজনীয় প্যাকেজ ইমপোর্ট করছি
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Content = require("./models/Content"); // MongoDB মডেল

const app = express();

// 🔧 Middleware গুলো
app.use(cors());
app.use(express.json());

// 🌐 MongoDB URI (এটা .env ফাইল থেকে আসবে)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// 📤 কনটেন্ট আপলোড করার API
app.post("/api/upload", async (req, res) => {
  const { type, content, accessId } = req.body;

  try {
    const newContent = new Content({ type, content, accessId });
    await newContent.save();
    res.status(201).json({ message: "✅ কনটেন্ট সফলভাবে আপলোড হয়েছে" });
  } catch (err) {
    res.status(500).json({ error: "❌ আপলোড ব্যর্থ হয়েছে" });
  }
});

// 👁️‍🗨️ কনটেন্ট ভিউ করার API (একবার দেখার পর ডিলিট হয়ে যাবে)
app.get("/api/view/:accessId", async (req, res) => {
  const { accessId } = req.params;

  try {
    const content = await Content.findOneAndDelete({ accessId });

    if (!content) {
      return res.status(404).json({ error: "😢 কনটেন্ট পাওয়া যায়নি বা আগেই দেখা হয়েছে" });
    }

    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ error: "❌ সমস্যা হয়েছে, পরে চেষ্টা করুন" });
  }
});

// 🚀 সার্ভার চালু
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 সার্ভার চলছে PORT ${PORT} এ`));
