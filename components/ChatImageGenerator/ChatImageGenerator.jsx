"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateImage, clearState } from "../../store/chatImageGeneratorSlice";
import Image from "next/image";

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
    <div style={{ textAlign: "center", padding: "2rem", marginTop: "80px" }}>
      <div style={{ textAlign: "center", margin: "auto" }}>
        <Image
          src={"/images/logo/logo_astro.png"}
          height={600}
          width={600}
          priority
        />
        <p>Generate image with ChatenAI</p>
      </div>

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

      <div
        className="small-search search-section mb--20"
        style={{
          display: "flex",
          marginTop: "24px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a message..."
          style={{ maxWidth: "700px", minWidth: "320px" }}
        />
        <div className="social-icon">
          <button
            className="btn-default btn-small "
            onClick={handleGenerate}
            disabled={loading}
            style={{ marginLeft: "10px" }}
          >
            {loading ? "Loading..." : "Send"}
          </button>
          <button
            className="btn-default btn-small btn-border"
            onClick={handleClear}
            style={{ marginLeft: "10px" }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* <input
        type="text"
        placeholder="Enter a prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", marginRight: "1rem" }}
      /> */}
      {/* <button onClick={handleGenerate} style={{ padding: "0.5rem" }}>
        Generate
      </button> 
      <button
      className="btn-default btn-border"
        onClick={handleClear}
        style={{ padding: "0.5rem", marginLeft: "1rem" }}
      >
        Clear
      </button>*/}
    </div>
  );
}
