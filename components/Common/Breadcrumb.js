import Image from "next/image";
import Link from "next/link";
import React from "react";

import img from "../../public/images/separator/separator-bottom.svg";
import lightImg from "../../public/images/light/separator/separator-bottom.svg";
import { useAppContext } from "@/context/Context";

const Breadcrumb = ({ title, text }) => {
  const { isLightTheme } = useAppContext();
  return (
    <>
      <div className="main-content">
        <div className="breadcrumb-area breadcarumb-style1 pt--180 pb--60">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-inner text-center">
                  <h1 className="title theme-gradient h2">{title}</h1>
                  <ul className="page-list">
                    <li className="rainbow-breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="rainbow-breadcrumb-item active">{text}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chatenai-separator">
          <Image
            className={`w-100 ${
              isLightTheme ? "separator-dark" : "separator-light"
            }`}
            src={isLightTheme ? img : lightImg}
            alt="separator"
          />
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
