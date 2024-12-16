import React from "react";
import PageHead from "../Head";

import Context from "@/context/Context";
import SignIn from "@/components/sign/SignIn";
import Header from "@/components/Header/Header";
import HeaderTop from "@/components/Header/HeaderTop/Header-Top";
import PopupMobileMenu from "@/components/Header/PopupMobileMenu";
import Footer from "@/components/Footer/Footer";
import Copyright from "@/components/Footer/Copyright";

const SigninPage = () => {
  return (
    <>
      <PageHead title="Sign In" />

      <main className="page-wrapper">
        <Context>
          <HeaderTop />
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="btn-small round"
          />
          <PopupMobileMenu />

          <SignIn />

          <Footer />
          <Copyright />
        </Context>
      </main>
    </>
  );
};

export default SigninPage;
