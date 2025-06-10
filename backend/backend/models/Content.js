const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  accessId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // ২৪ ঘণ্টা পরে ডিলিট হবে (১ দিন)
  },
});

module.exports = mongoose.model("Content", contentSchema);
