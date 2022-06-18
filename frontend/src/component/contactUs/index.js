import React, { useRef } from "react";
import "./style.css";
import emailjs from "@emailjs/browser";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { MdPhoneAndroid } from "react-icons/md";


const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_fvfr5sn",
        "template_9txb3go",
        form.current,
        "nQqCCfeNSMesYnqNm"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
      e.target.reset()
  };
  return (
    <div class="container">
      <div class="form">
        <div class="contact-info">
          <h3 class="title">Let's get in touch</h3>
          <p class="text">BigBite</p>

          <div class="info">
            <div class="information">
              <IoLocationOutline /> <p> Jordan-Amman / Al-Jubiyha </p>
            </div>
            <div class="information">
              <AiOutlineMail /> <p>BigBite@JoRes.com</p>
            </div>
            <div class="information">
              <MdPhoneAndroid /> <p>053-8896-4247</p>
            </div>
          </div>

          <div>
            <p>Connect with us :</p>
            <div class="social-icons">
              <a href="#">
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <form ref={form} onSubmit={sendEmail}>
            <h3 class="title">Contact us</h3>
            <div class="input-container">
              <input
                type="text"
                name="name"
                placeholder="Username"
                class="input"
              />
              {/* <label for="">Username</label> */}
              <span>Username</span>
            </div>

            <div class="input-container">
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                class="input"
              />
              {/* <label for="">Phone</label> */}
              <span>Phone</span>
            </div>
            <div class="input-container textarea">
              <textarea name="message" class="input"></textarea>

              <span>Message</span>
            </div>
            <input type="submit" value="Send" class="btn" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
