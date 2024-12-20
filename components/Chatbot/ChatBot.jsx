import { useState } from "react";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchChatAiResponse,
  addUserMessage,
  addLoadingMessage,
} from "../../store/chatAiSlice";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import { isCodeBlock, renderHTML, renderList } from "../Converter/Converter";

export default function ChatBot() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector((state) => state.chat);

  const sendMessage = () => {
    if (!input.trim()) return;
    console.log(input);
    dispatch(addUserMessage(input));
    dispatch(addLoadingMessage());
    dispatch(fetchChatAiResponse(input));

    setInput("");
  };

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <h2>Text Generator with AstroLabs AI</h2>
      <div
        style={{
          height: "calc(100vh - 300px)",
          overflowY: "auto",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "10px",
          padding: "16px",
          display: messages.length > 0 ? "block" : "flex",
          flexDirection: "column-reverse",
          gap: "10px",
        }}
      >
        {messages.length > 0 &&
          messages.map((msg, index) => (
            <div
              key={index}
              style={{ marginBottom: "15px", marginTop: "22px" }}
            >
              {msg.author && (
                <div style={{ textAlign: "right" }}>
                  <strong>{msg.title}:</strong> {msg.desc}
                </div>
              )}
              {msg.content?.map((ai, idx) => (
                <div key={idx} style={{ textAlign: "left" }}>
                  <Image
                    src={"/images/logo/logo_kecil.PNG"}
                    alt="AI Avatar"
                    width="40"
                    height={40}
                  />{" "}
                  <strong>{ai.title}</strong> ({ai.badge})
                  {/* <p>{ai.text || ai.desc}</p> */}
                  {/* Render lists */}
                  {!isCodeBlock(ai.desc) &&
                    !ai.desc.includes("<html>") &&
                    !ai.desc.includes("-") && <div>{renderList(ai.desc)}</div>}
                  {/* Render HTML content */}
                  {ai.desc.includes("<html>") ||
                  ai.desc.includes("<body>") ||
                  ai.desc.includes("<head>")
                    ? renderHTML(ai.desc)
                    : null}
                  {/* Render CSS/JS code with Syntax Highlighting */}
                  {isCodeBlock(ai.desc) && (
                    <SyntaxHighlighter language="javascript" style={dark}>
                      {ai.desc}
                    </SyntaxHighlighter>
                  )}
                  {/* Render Markdown (if OpenAI returns markdown-formatted text) */}
                  {ai.desc &&
                    !ai.desc.includes("<html>") &&
                    !ai.desc.includes("<pre><code>") &&
                    !ai.desc.includes("```") && (
                      <ReactMarkdown>{ai.desc}</ReactMarkdown>
                    )}
                  {ai.img && <img src={ai.img} alt="Loader" width="30" />}
                </div>
              ))}
            </div>
          ))}

        {messages.length == 0 && (
          <div style={{ textAlign: "center", margin: "auto" }}>
            <Image
              src={"/images/logo/logo_astro.png"}
              alt="Logo astro"
              height={400}
              width={400}
              priority
            />
            <p>Start a conversation with AstroLabsAI</p>
          </div>
        )}
      </div>
      <div
        className="small-search search-section mb--20"
        style={{ display: "flex", marginTop: "10px" }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button
          className="btn-default btn-small "
          onClick={sendMessage}
          disabled={loading}
          style={{ marginLeft: "10px" }}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
