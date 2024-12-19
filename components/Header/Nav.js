import React from "react";
import Link from "next/link";



const Nav = () => {

  return (
    <>
      <ul className="mainmenu">
        <li>
          <Link href="/dashboard">App</Link>
        </li>
        {/* <li className="with-megamenu has-menu-child-item position-relative">
          <a
            href="#"
            onClick={() => setShowItem(!showItem)}
            className={`${!showItem ? "open" : ""}`}
          >
            Dashboard
          </a>
          <div
            className={`rainbow-megamenu right-align with-mega-item-2 ${
              showItem ? "" : "d-block"
            }`}
          >
            <div className="wrapper p-0">
              <div className="row row--0">
                <div className="col-lg-6 single-mega-item">
                  <h3 className="rbt-short-title">DASHBOARD PAGES</h3>
                  <ul className="mega-menu-item">
                    {DashboardItem &&
                      DashboardItem.navDashboardItem.map((data, index) => (
                        <li key={index}>
                          <Link
                            href={data.link}
                            className={isActive(data.link) ? "active" : ""}
                          >
                            {data.text}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="col-lg-6 single-mega-item">
                  <div className="header-menu-img">
                    <Image src={menuImg} alt="Menu Split Image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li> */}
        {/* <li className="with-megamenu has-menu-child-item position-relative">
          <a
            href="#"
            onClick={() => setShowPage(!showPage)}
            className={`${!showPage ? "open" : ""}`}
          >
            Pages
          </a>
          <div
            className={`rainbow-megamenu right-align with-mega-item-2 small ${
              showPage ? "" : "d-block"
            }`}
          >
            <div className="wrapper p-0">
              <div className="row row--0">
                <div className="col-lg-12 single-mega-item">
                  <h3 className="rbt-short-title">Inner Pages</h3>
                  <ul className="mega-menu-item">
                    {DashboardItem &&
                      DashboardItem.navPageItem.map((data, index) => (
                        <li key={index}>
                          <Link
                            href={data.link}
                            className={isActive(data.link) ? "active" : ""}
                          >
                            {data.text}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li> */}
        <li>
          <Link href="/roadmap">Staking</Link>
        </li>
        <li>
          <Link href="/roadmap">Roadmap</Link>
        </li>
        <li>
          <Link href="/team">Team</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        {/* <li>
          <Link href="/pricing">Pricing</Link>
        </li>
        <li>
          <Link href="/signin">Sign In</Link>
        </li> */}
      </ul>
    </>
  );
};

export default Nav;
