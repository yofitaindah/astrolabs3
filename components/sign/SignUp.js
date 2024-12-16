import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/Context";
import React, { useEffect } from "react";

import sal from "sal.js";

import boxedLogo from "../../public/images/logo/boxed-logo.png";
import boxedLogoLight from "../../public/images/logo/boxed-logo-light.png";
import google from "../../public/images/sign-up/google.png";
import facebook from "../../public/images/sign-up/facebook.png";

const SignUp = () => {
  const { isLightTheme } = useAppContext();
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
      <div
        className="signup-area rainbow-section-gapTop-big"
        data-black-overlay="2"
      >
        <div className="sign-up-wrapper rainbow-section-gap">
          <div className="sign-up-box bg-flashlight">
            <div className="signup-box-top top-flashlight light-xl">
              <Image
                className={`${
                  isLightTheme ? "boxed-logo-dark" : "boxed-logo-light"
                }`}
                src={isLightTheme ? boxedLogo : boxedLogoLight}
                width={476}
                height={158}
                alt="sign-up logo"
              />
            </div>
            <div className="separator-animated animated-true"></div>
            <div className="signup-box-bottom">
              <div className="signup-box-content">
                <h4 className="title">Welcome Back!</h4>
                <div className="social-btn-grp">
                  <Link className="btn-default btn-border" href="#">
                    <span className="icon-left">
                      <Image
                        src={google}
                        width={18}
                        height={18}
                        alt="Google Icon"
                      />
                    </span>
                    Login with Google
                  </Link>
                  <Link className="btn-default btn-border" href="#">
                    <span className="icon-left">
                      <Image
                        src={facebook}
                        width={18}
                        height={18}
                        alt="Google Icon"
                      />
                    </span>
                    Login with Facebook
                  </Link>
                </div>
                <div className="text-social-area">
                  <hr />
                  <span>Or continue with</span>
                  <hr />
                </div>
                <form>
                  <div className="input-section mail-section">
                    <div className="icon">
                      <i className="feather-user"></i>
                    </div>
                    <input type="text" placeholder="Enter Your Name" />
                  </div>
                  <div className="input-section mail-section">
                    <div className="icon">
                      <i className="feather-mail"></i>
                    </div>
                    <input type="email" placeholder="Enter email address" />
                  </div>
                  <div className="input-section password-section">
                    <div className="icon">
                      <i className="feather-lock"></i>
                    </div>
                    <input type="password" placeholder="Create Password" />
                  </div>
                  <div className="input-section password-section">
                    <div className="icon">
                      <i className="feather-lock"></i>
                    </div>
                    <input type="password" placeholder="Confirm Password" />
                  </div>
                  <button type="submit" className="btn-default">
                    Sign Up
                  </button>
                </form>
              </div>
              <div className="signup-box-footer">
                <div className="bottom-text">
                  Don&apos;t have an account?
                  <Link className="btn-read-more ps-2" href="/signin">
                    <span>Sign In</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
