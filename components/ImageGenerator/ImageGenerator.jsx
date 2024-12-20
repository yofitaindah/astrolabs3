import React, { useEffect } from "react";

import sal from "sal.js";
import Image from "next/image";

import TextGeneratorData from "../../data/dashboard.json";
import { useSelector } from "react-redux";

const ImageGenerator = () => {
  const { messages, loading, error } = useSelector((state) => state.dalle);

  const handleDownload = (imageUrl) => {
    // Create a temporary <a> element
    const link = document.createElement("a");
    link.href = imageUrl;
    link.target = "_blank";
    link.download = "astrolab-image.png"; // Set the default file name for the image
    link.click(); // Trigger the download
  };

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
          <div className="chat-box-list pt--30" id="chatContainer" key={index}>
            <div className="chat-box author-speech bg-flashlight">
              <div className="inner">
                <div className="chat-section">
                  <div className="author">
                    <Image
                      className="w-100"
                      width={40}
                      height={40}
                      src={"/images/team/team-01.jpg"}
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
                    <>
                      <div className="chat-section generate-section">
                        <div className="author">
                          <i className="feather-check-circle"></i>
                        </div>
                        <div className="chat-content">
                          <h6 className="title color-text-off mb--0">
                            {innerData.scan}
                          </h6>
                        </div>
                      </div>
                      <div className="chat-section generate-section">
                        <div className="author">
                          <Image
                            src={'/images/icons/loader-one.gif'}
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
                    </>
                  )}
                  <div className="chat-section generate-details-section">
                    <div className="author">
                      <Image
                        className="w-100"
                        src={'/images/logo/logo_kecil.PNG'}
                        width={40}
                        height={40}
                        alt="ChatenAI"
                      />
                    </div>
                    <div className="chat-content">
                      <h6 className="title mb--20">{innerData.title}</h6>

                      <div className="image-caption mb--20">
                        <h5 className="caption-title theme-gradient">
                          {innerData.caption}
                        </h5>
                      </div>
                      {
                        !loading && (innerData.generateImg || innerData.generateImg2) && (
                          <div className="img-box-grp mb--20">
                          <div className="img-box">
                            <Image
                              className="w-100 radius"
                              src={innerData.generateImg}
                              width={1380}
                              height={1380}
                              alt="Image Generation"
                            />
                            <button
                              className="download-btn btn-default btn-small bg-solid-primary"
                              onClick={() =>
                                handleDownload(innerData.generateImg)
                              }
                            >
                              <i className="feather-download"></i>
                              <span>Download</span>
                            </button>
                          </div>
                          {innerData.generateImg2 ? (
                            <div className="img-box">
                              <Image
                                className="w-100 radius"
                                src={innerData.generateImg2}
                                width={1380}
                                height={1380}
                                alt="Image Generation"
                              />
                              <button
                                className="download-btn btn-default btn-small bg-solid-primary"
                                onClick={() =>
                                  handleDownload(innerData.generateImg2)
                                }
                              >
                                <i className="feather-download"></i>
                                <span>Download</span>
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        )
                      }

                      {/* <Reaction /> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default ImageGenerator;
