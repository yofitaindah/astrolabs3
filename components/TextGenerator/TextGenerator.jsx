import React, { useEffect } from "react";
import Image from "next/image";

import { useSelector } from "react-redux";
import TextGeneratorData from "../../data/dashboard.json";
import sal from "sal.js";
import Reaction from "../Common/Reaction";

const TextGenerator = () => {
  const { messages, loading, error } = useSelector((state) => state.chat);

  useEffect(() => {
    sal();

    const cards = document.querySelectorAll(".bg-flashlight");

    cards.forEach((bgflashlight) => {
      bgflashlight.onmousemove = function (e) {
        let x = e.pageX - bgflashlight.offsetLeft;
        let y = e.pageY - bgflashlight.offsetTop;

        bgflashlight.style.setProperty("--x", x + "px");
        bgflashlight.style.setProperty("--y", y + "px");
      };
    });
  }, []);

  console.log(messages);
  return (
    <>
      {messages.length == 0 && (
        <div className="chat-box-empty-list">
          <Image
            src={"/images/logo/logo_astro.png"}
            alt="Logo astro"
            height={600}
            width={600}
            priority
          />
          <p>Transform Your Imagination with AI</p>
        </div>
      )}
      {messages &&
        messages.length > 0 &&
        messages.map((data, index) => (
          <div
            className="chat-box-list pt--30"
            id="chatContainer"
            data-sal="slide-up"
            data-sal-duration="700"
            data-sal-delay="100"
            key={index}
          >
            <div className="chat-box author-speech bg-flashlight">
              <div className="inner">
                <div className="chat-section">
                  <div className="author">
                    <Image
                      className="w-100"
                      width={40}
                      height={40}
                      src="/images/team/team-01.jpg"
                      alt="Author"
                    />
                  </div>
                  <div className="chat-content">
                    <h6 className="title">{data.title}</h6>
                    <p>{data.desc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="chat-box ai-speech bg-flashlight">
              {data.content.map((innerData, innerIndex) => (
                <div
                  className="inner top-flashlight leftside light-xl"
                  key={innerIndex}
                >
                  {loading && (
                    <div className="chat-section generate-section">
                      <div className="author">
                        <Image
                          src={innerData.img}
                          width={40}
                          height={40}
                          alt="Loader Images"
                        />
                      </div>
                      <div className="chat-content">
                        <h6 className="title color-text-off mb--0">
                          {innerData.text}
                        </h6>
                      </div>
                    </div>
                  )}

                  {!loading && innerData.desc !== "" && (
                    <div className="chat-section">
                      <div className="author">
                        <Image
                          className="w-100"
                          src="/images/logo/logo_astro.png"
                          width={40}
                          height={40}
                          alt="Astrolab Logo"
                        />
                      </div>
                      <div className="chat-content">
                        <h6 className="title">
                          AstroLabs
                          <span className="rainbow-badge-card">Ai</span>
                        </h6>
                        <p className="mb--20">{innerData.desc}</p>
                        {/* <Reaction /> */}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default TextGenerator;
