import React from "react";
import Context from "@/context/Context";

import PageHead from "../Head";

import Header from "@/components/Header/Header";
import StyleGuide from "@/components/StyleGuide/StyleGuide";
import Footer from "@/components/Footer/Footer";
import Copyright from "@/components/Footer/Copyright";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import HeaderTop from "@/components/Header/HeaderTop/Header-Top";
import Breadcrumb from "@/components/Common/Breadcrumb";

const StyleGuidepage = () => {
  return (
    <>
      <PageHead title="Style Guide" />

      <main className="page-wrapper">
        <Context>
          <HeaderTop />
          <Header
            headerTransparent="header-not-transparent"
            headerSticky="header-sticky"
            btnClass="btn-small round"
          />
          <PopupMobileMenu />
          <Breadcrumb title="Style Guide" text="Style Guide" />

          <StyleGuide />

          <Footer />
          <Copyright />
        </Context>
      </main>
    </>
  );
};

export default StyleGuidepage;
