import React from "react";

import FaqAccordion from "./FaqAccordion";

import AccordionData from "../../data/dashboard.json";
import ContactUs from "./ContactUs";

const Help = () => {
  return (
    <>
      <div className="rbt-main-content mb--0 mr--0">
        <div className="rbt-daynamic-page-content center-width">
          <div className="rbt-dashboard-content">
            <div className="banner-area">
              <div className="settings-area">
                <h3 className="title">Help & FAQ</h3>
              </div>
            </div>
            <div className="content-page pb--50">
              <div className="chat-box-list">
                <div className="content">
                  <div className="rainbow-accordion-style accordion rainbow-section-gapBottom">
                    <div className="accordion" id="accordionExamplea">
                      {AccordionData &&
                        AccordionData.accordion.map((data, index) => (
                          <FaqAccordion
                            {...data}
                            key={index}
                            acc={data}
                            num={index}
                          />
                        ))}
                    </div>
                  </div>

                  <div className="single-settings-box contact-box top-flashlight light-xl leftside overflow-hidden">
                    <h4 className="title mb--30">Contact Us</h4>
                    <ContactUs />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
