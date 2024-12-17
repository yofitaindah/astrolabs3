"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateImage, clearState } from "../../store/chatImageGeneratorSlice";

export default function ChatImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const dispatch = useDispatch();
  const { loading, loadingMessage, imageUrl, error } = useSelector(
    (state) => state.dalle
  );

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    dispatch(generateImage(prompt));
  };

  const handleClear = () => {
    dispatch(clearState());
    setPrompt("");
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Generate AI Images</h1>
      <input
        type="text"
        placeholder="Enter a prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", marginRight: "1rem" }}
      />
      <button onClick={handleGenerate} style={{ padding: "0.5rem" }}>
        Generate
      </button>
      <button
        onClick={handleClear}
        style={{ padding: "0.5rem", marginLeft: "1rem" }}
      >
        Clear
      </button>

      {loading && <p>{loadingMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && (
        <div style={{ marginTop: "2rem" }}>
          <img
            src={imageUrl}
            alt="Generated Image"
            width="512"
            height="512"
            style={{ borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
}
