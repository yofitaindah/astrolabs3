import React, { useEffect } from "react";
import Link from "next/link";

import ContactForm from "./ContactForm";
import sal from "sal.js";

const Contact = () => {
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
      <div className="main-content">
        <div className="rainbow-contact-area rainbow-section-gap">
          <div className="container">
            <div className="row row--15">
              <div className="col-lg-12">
                <div className="rainbow-contact-address mt_dec--30">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="rainbow-address bg-flashlight">
                        <div className="icon">
                          <i className="feather-headphones"></i>
                        </div>
                        <div className="inner">
                          <h4 className="title">Contact Phone Number</h4>
                          <p>
                            <Link href="#">+444 555 666 777</Link>
                          </p>
                          <p>
                            <Link href="#">+222 222 222 333</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="rainbow-address bg-flashlight">
                        <div className="icon">
                          <i className="feather-mail"></i>
                        </div>
                        <div className="inner">
                          <h4 className="title">Our Email Address</h4>
                          <p>
                            <Link href="mailto:admin@gmail.com">
                              admin@gmail.com
                            </Link>
                          </p>
                          <p>
                            <Link href="mailto:example@gmail.com">
                              example@gmail.com
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                      <div className="rainbow-address bg-flashlight">
                        <div className="icon">
                          <i className="feather-map-pin"></i>
                        </div>
                        <div className="inner">
                          <h4 className="title">Our Location</h4>
                          <p>
                            5678 Bangla Main Road, cities 580 <br /> GBnagla,
                            example 54786
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt--40 row--15">
              <div className="col-lg-7">
                <ContactForm />
              </div>
              <div className="col-lg-5 mt_md--30 mt_sm--30">
                <div className="google-map-style-1">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14554259.179133086!2d-105.54385245388013!3d37.49334218664659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1630777307491!5m2!1sen!2sbd"
                    width="600"
                    height="550"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
