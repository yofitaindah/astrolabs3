import React from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";
import RightpanelDashboard from "@/components/Common/RightpanelDashboard";
import Modal from "@/components/Common/Modal";
import Form from "@/components/ImageGenerator/Form";
import ImageGenerator from "@/components/ImageGenerator/ImageGenerator";

const ImageGeneratorPage = () => {
  return (
    <>
      <PageHead title="Image Generator" />

      <main className="page-wrapper rbt-dashboard-page">
        <Context>
          <div className="rbt-panel-wrapper">
            <HeaderDashboard display="" />
            <PopupMobileMenu />
            <LeftpanelDashboard />
            {/* <RightpanelDashboard /> */}
            <Modal />

            <div className="rbt-main-content">
              <div className="rbt-daynamic-page-content">
                <div className="rbt-dashboard-content">
                  <div  className="content-page">
                    <ImageGenerator />
                  </div>
                  <div className="rbt-static-bar">
                    <Form />

                    <p className="b3 small-text">
                      AstroLabsAI can make mistakes. Consider checking important
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Context>
      </main>
    </>
  );
};

export default ImageGeneratorPage;
