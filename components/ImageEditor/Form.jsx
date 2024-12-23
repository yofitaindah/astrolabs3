import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useDispatch } from "react-redux";

import { Tooltip } from "react-tooltip";
import { IoIosCloseCircle } from "react-icons/io";

import {
  editImageFetch,
  addUserMessage,
  addLoadingMessage,
} from "./../../store/chatImageEditorGeneratorSlice";

const Form = () => {
  const fileRef = useRef(null);
  const [input, setInput] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

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

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(
      addUserMessage(
        {
          base64Image: image, // This is the user message or main content
          prompt: input,
        } // This could be some additional data related to the message
      )
    );
    dispatch(addLoadingMessage());
    dispatch(
      editImageFetch({
        base64Image: base64Image, // This is the user message or main content
        prompt: input,
      })
    );

    setInput("");
    fileRef.current.value = null;
    setImage("");
    setBase64Image("");
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        {image && (
          <div
            title="tempImage"
            style={{
              margin: "0 190px",
              position: "absolute",
              left: "0px",
              bottom: "65px",
              padding: "4px",
              border: "1px solid hsla(0, 0%, 100%, 0.1)",
              borderRadius: "4px",
            }}
          >
            <Link
              href="#"
              style={{
                position: "absolute",
                top: "-6px",
                right: "-1px",
              }}
              onClick={(e) => {
                e.preventDefault();
                fileRef.current.value = null;
                setImage("");
                setBase64Image("");
              }}
            >
              <IoIosCloseCircle />
            </Link>
            <Image src={image} alt="tempImage" width={50} height={50} />
          </div>
        )}

        <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
        <Tooltip id="my-tooltip2" className="custom-tooltip tooltip-inner" />

        <form className="new-chat-form border-gradient">
          <textarea
            id="textGenerator"
            name="textGenerator"
            rows="1"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
          <div className="left-icons">
            <div title="ChatenAI" className="form-icon icon-gpt">
              <i className="feather-aperture"></i>
            </div>
          </div>
          <div className="right-icons">
            <div
              className="form-icon icon-plus"
              data-tooltip-id="my-tooltip2"
              data-tooltip-content={
                image ? "Image has been chosen" : "Choose File"
              }
            >
              <input
                ref={fileRef}
                type="file"
                className="input-file"
                name="myfile"
                onChange={handleImageUpload}
                disabled={image ? true : false}
                style={{
                  cursor: image ? "not-allowed" : "pointer",
                }}
              />
              <i
                className="feather-plus-circle"
                style={{
                  opacity: image ? 0.6 : 1,
                }}
              ></i>
            </div>
            <Link
              href={"#"}
              className="form-icon icon-send"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Send message"
              onClick={sendMessage}
            >
              <i className="feather-send"></i>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
