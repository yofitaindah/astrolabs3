import React from "react";

const ContactForm = () => {
  return (
    <>
      <form
        className="contact-form-1 rainbow-dynamic-form"
        id="contact-form"
        method="POST"
        action="mail.php"
      >
        <div className="form-group">
          <input
            type="text"
            name="contact-name"
            id="contact-name"
            placeholder="Your Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="contact-phone"
            id="contact-phone"
            placeholder="Phone Number"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="contact-email"
            name="contact-email"
            placeholder="Your Email"
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Your Subject"
          />
        </div>

        <div className="form-group">
          <textarea
            name="contact-message"
            id="contact-message"
            placeholder="Your Message"
          ></textarea>
        </div>

        <div className="form-group">
          <button
            name="submit"
            type="submit"
            id="submit"
            className="btn-default btn-large rainbow-btn"
          >
            <span>Submit Now</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
