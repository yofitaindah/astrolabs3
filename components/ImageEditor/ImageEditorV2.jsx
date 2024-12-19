// pages/edit-image.js
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

export default function ImageEditorV2() {
  const [base64Image, setBase64Image] = useState("");
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [editedImage, setEditedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    // Validate file existence
    if (!file) {
      console.error("No file selected.");
      return;
    }

    // Validate file type
    if (file.type !== "image/png") {
      alert("Only PNG files are allowed.");
      return;
    }

    // Validate file size (max 4MB)
    const maxSize = 4 * 1024 * 1024; // 4 MB in bytes
    if (file.size > maxSize) {
      alert("File size exceeds 4 MB.");
      return;
    }
    setImage(URL.createObjectURL(file));
    const reader = new FileReader();

    reader.onload = () => {
      setBase64Image(reader.result.split(",")[1]); // Extract Base64 part
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = async () => {
    if (!image || !prompt) {
      setError("Please provide an image and a prompt.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/edit-image", {
        base64Image,
        prompt,
      });
      const img = response.data?.url;
      setEditedImage(img);
    } catch (err) {
      setError("An error occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };
  console.log('image', image);
  return (
    <div>
      <h1>Edit Image with AI</h1>
      <div>
        <input type="file" onChange={handleImageUpload} />
        <input
          type="text"
          placeholder="Enter your edit prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button onClick={handleEditImage} disabled={loading}>
          {loading ? "Editing..." : "Edit Image"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <h2>Current Image</h2>
        {image && (
          <Image src={image || ""} alt="Edited" height={400} width={400} />
        )}
      </div>
      {editedImage && (
        <>
          <div>
            <h2>Edited Image</h2>
            <Image src={editedImage} alt="Edited" height={400} width={400} />
          </div>
        </>
      )}
    </div>
  );
}
