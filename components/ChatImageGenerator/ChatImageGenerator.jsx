"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  generateImage,
  addUserMessage,
  addLoadingMessage,
} from "../../store/chatImageGeneratorSlice";
import Image from "next/image";

export default function ChatImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.dalle);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    dispatch(addUserMessage(prompt));
    dispatch(addLoadingMessage());
    dispatch(generateImage(prompt));
  };

  const handleClear = () => {
    setPrompt("");
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem", marginTop: "80px" }}>
      <div style={{ textAlign: "center", margin: "auto" }}>
        <Image
          src={"/images/logo/logo_astro.png"}
          alt="Logo astro"
          height={600}
          width={600}
          priority
        />
        <p>Generate image with AstroLabsAI</p>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {messages && (
        <pre>
          {JSON.stringify(messages, null, 2)}
        </pre>
        // <div style={{ marginTop: "2rem" }}>
        //   <img
        //     src={imageUrl}
        //     alt="Generated Image"
        //     width="512"
        //     height="512"
        //     style={{ borderRadius: "10px" }}
        //   />
        // </div>
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
        <div
          className="social-icon"
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
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
    </div>
  );
}
