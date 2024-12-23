import React, { useEffect } from "react";

import sal from "sal.js";
import Image from "next/image";

import { useSelector } from "react-redux";

const ImageEditor = () => {
  const { messages, loading, error } = useSelector((state) => state.editImage);
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
            {data.author ? (
              <div className="chat-box author-speech bg-flashlight">
                <div className="inner">
                  <div className="chat-section">
                    <div className="author">
                      <Image
                        className="w-100"
                        width={40}
                        height={40}
                        src={data.author}
                        alt="Author"
                      />
                    </div>
                    <div className="chat-content">
                      <h6 className="title">{data.title}</h6>
                      <p className="mb--20">{data.desc}</p>
                      {data.img ? (
                        <div className="img-box">
                          <Image
                            className="w-50 radius"
                            src={data.img}
                            width={575}
                            height={380}
                            alt="Image Generation"
                            style={{
                              border: "1px solid #fff",
                              borderRadius: "10px !important",
                            }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {data.content ? (
              <div className="chat-box ai-speech bg-flashlight">
                {data.content &&
                  data.content.map((innerData, innerIndex) => (
                    <div
                      className="inner top-flashlight leftside light-xl"
                      key={innerIndex}
                    >
                      <div className="inner top-flashlight leftside light-xl">
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
                                  src={"/images/icons/loader-one.gif"}
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
                              src={"/images/logo/logo_kecil.PNG"}
                              width={40}
                              height={40}
                              alt="AstroLabs"
                            />
                          </div>
                          {!loading && innerData.generateImg && (
                            <div className="chat-content">
                              <h6 className="title mb--20">Result...</h6>
                              <div className="img-box mb--20">
                                <Image
                                  className="w-100 radius"
                                  src={innerData.generateImg}
                                  width={575}
                                  height={382}
                                  alt="Image Generation"
                                />
                                <button
                                  className={`download-btn btn-default btn-small ${
                                    !innerData.isBorder
                                      ? "bg-solid-primary"
                                      : "btn-border"
                                  }`}
                                >
                                  <i className="feather-download"></i>
                                  <span>Download</span>
                                </button>
                              </div>
                              {/* <Reaction /> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
    </>
  );
};

export default ImageEditor;
