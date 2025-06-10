import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ContentUploadForm = () => {
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessId = uuidv4();

    const response = await fetch("https://sumonsecureview-backend.vercel.app/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "text", content: message, accessId }),
    });

    if (response.ok) {
      setGeneratedLink(`${window.location.origin}/view/${accessId}`);
    } else {
      alert("Upload ব্যর্থ হয়েছে!");
    }
  };

  return (
    <div className="container">
      <h1>একবার দেখার জন্য কনটেন্ট শেয়ার করুন</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="আপনার মেসেজ লিখুন..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">লিংক তৈরি করুন</button>
      </form>

      {generatedLink && (
        <div className="link-section">
          <p>আপনার লিংক:</p>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer">
            {generatedLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default ContentUploadForm;
