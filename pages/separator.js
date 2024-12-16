import React from "react";
import Image from "next/image";

import separatorTop from "../public/images/separator/separator-top.svg";
import separatorBottom from "../public/images/separator/separator-bottom.svg";
import separatorTopLight from "../public/images/light/separator/separator-top.svg";
import separatorBottomLight from "../public/images/light/separator/separator-bottom.svg";
import Context, { useAppContext } from "@/context/Context";

const Separator = ({ top }) => {
  const { isLightTheme } = useAppContext();

  return (
    <>
      <Context>
        {top ? (
          <div className="chatenai-separator">
            {isLightTheme ? (
              <Image
                className={"w-100 separator-dark"}
                src={separatorTop}
                alt="separator"
              />
            ) : (
              <Image
                className={"w-100 separator-light"}
                src={separatorTopLight}
                alt="separator"
              />
            )}
          </div>
        ) : (
          <div className="chatenai-separator">
            {isLightTheme ? (
              <Image
                className={"w-100 separator-dark"}
                src={separatorBottom}
                alt="separator"
              />
            ) : (
              <Image
                className={"w-100 separator-light"}
                src={separatorBottomLight}
                alt="separator"
              />
            )}
          </div>
        )}
      </Context>
    </>
  );
};

export default Separator;
