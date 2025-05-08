import React from "react";
import logoImage from "../../assets/images/company-logo-W.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FacebookIcon from "../../assets/images/FacebookIcon.png";
import TweeterIcon from "../../assets/images/twitter.png";
import YoutubeIcon from "../../assets/images/youtube.png";
import InstagramIcon from "../../assets/images/instagram.png";
function FooterSec() {
  return (
    <div className="section-space footer-sec">
      <div className="container">
        <div className="row">
          <div className="col-md-3 about-us-footer">
            <figure className="mb-4">
              <a href="" className="company-logo ">
                <img className="logo-img" src={logoImage} />
              </a>
            </figure>
            <p>
              Proin a interdum elit. Etiam eu sapien sem. Suspendisse a massa
              justo. Cras eget lorem nunc. Fusce nec urna tempus tempus
            </p>
            <div className="social-icon">
              <a href="#">
                <img src={FacebookIcon} />
              </a>
              <a href="#">
                <img src={TweeterIcon} />
              </a>
              <a href="#">
                <img src={YoutubeIcon} />
              </a>
              <a href="#">
                <img src={InstagramIcon} />
              </a>
            </div>
          </div>
          <div className="col-md-2 footer-coloum ms-auto">
            <h3>Shop</h3>
            <ul className="footer-links">
              <li>
                <a>Mobiles &amp; Tablets</a>
              </li>
              <li>
                <a>Laptops &amp; Computers</a>
              </li>
              <li>
                <a>Audio and Video</a>
              </li>
              <li>
                <a>Home Appliances</a>
              </li>
              <li>
                <a>New Arrivals</a>
              </li>
            </ul>
            <p></p>
          </div>
          <div className="col-md-3 footer-coloum ms-auto">
            <h3>Useful Links</h3>
            <ul className="footer-links">
              <li>
                <a href="/ContactUs">Contact Us</a>
              </li>
              <li>
                <a href="/FAQ">FAQs</a>
              </li>
              <li>
                <a href="/Blogs">Blogs</a>
              </li>
              <li>
                <a href="/TermsCondition">Privacy Policy</a>
              </li>
              <li>
                <a href="/TermsCondition">Terms &amp; Conditions</a>
              </li>
              <a
                href="mailto:user@example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                user@example.com
              </a>
            </ul>
          </div>
          <div className="col-md-3 footer-coloum">
            <h3>Contact</h3>
            <h2 className="footer-inner-title mb-1">NEWSLETTER</h2>
            <div className="Newsletter-sec">
              <input
                type="text"
                placeholder="Your email address"
                className="form-control"
              />
              <button className="send-btn">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
            <a className="btn-app-google"></a>
          </div>
        </div>
        <div className="row bottom-footer">
          <p>Copyright 2025 | Dotsecom | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}
export default FooterSec;
