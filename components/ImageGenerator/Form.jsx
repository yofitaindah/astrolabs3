import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

import { Tooltip } from "react-tooltip";
import {
  generateImage,
  addUserMessage,
  addLoadingMessage,
} from "./../../store/chatImageGeneratorSlice";

const Form = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(addUserMessage(input));
    dispatch(addLoadingMessage());
    dispatch(generateImage(input));

    setInput("");
  };

  return (
    <>
      <Tooltip id="my-tooltip" className="custom-tooltip tooltip-inner" />
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
    </>
  );
};

export default Form;
