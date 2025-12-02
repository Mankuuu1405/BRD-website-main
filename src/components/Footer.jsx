import React from "react";
import {Link} from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapLocationDot,
  FaXTwitter,
} from "react-icons/fa6";
import { IoMdCall, IoIosMail } from "react-icons/io";
import { motion } from "framer-motion";
import logo from "../assets/img/logo.png";

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#04122B] text-white py-14 md:py-20 px-6 md:px-12"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-4">
          <img className="w-36 md:w-44" src={logo} alt="logo" />
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            est odit consectetur eaque laudantium similique velit et hic
            laboriosam deserunt perferendis minima exercitationem ipsam.
          </p>

          <div className="flex gap-3 pt-4">
            {[
              { Icon: FaFacebookF },
              { Icon: FaXTwitter },
              { Icon: FaInstagram },
              { Icon: FaLinkedinIn },
            ].map(({ Icon }, i) => (
              <a
                key={i}
                href="#"
                className="bg-white text-[#04122B] p-3 rounded-full hover:scale-110 transition-transform duration-300"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex   gap-10 md:gap-16">
          {/* Company */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Company</h3>
            <ul className="flex flex-col gap-3 text-gray-300 text-sm md:text-base">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Help</h3>
            <ul className="flex flex-col gap-3 text-gray-300 text-sm md:text-base">
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link to="/payments">Payments</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-gray-300 text-sm md:text-base">
              <li className="flex items-center gap-2">
                <IoMdCall /> +91 99888-24588
              </li>
              <li className="flex items-center gap-2">
                <IoIosMail /> xyzloans@XpertLand.ai
              </li>
              <li className="flex items-center gap-2">
                <FaMapLocationDot /> Poat Street, Near Wallmart, Los Angeles,
                140039
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-12 pt-4 border-t border-gray-700 text-gray-400 text-sm md:text-base">
        © 2025 XpertLand. All rights reserved. Developed by{" "}
        <span className="text-white font-medium">WebArclight</span>.
      </div>
    </motion.footer>
  );
};

export default Footer;
