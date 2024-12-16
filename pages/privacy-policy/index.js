import React from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import PrivacyPolicy from "@/components/PrivacyPolicy/PrivacyPolicy";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import LeftpanelDashboard from "@/components/Common/LeftpanelDashboard";

const TermsPolicyPage = () => {
  return (
    <>
      <PageHead title="Privacy Policy" />

      <main className="page-wrapper rbt-dashboard-page">
        <Context>
          <div className="rbt-panel-wrapper">
            <HeaderDashboard display="d-none" />
            <PopupMobileMenu />
            <LeftpanelDashboard />

            <PrivacyPolicy />
          </div>
        </Context>
      </main>
    </>
  );
};

export default TermsPolicyPage;
