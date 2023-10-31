import React from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { RiLightbulbFlashLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 w-screen">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex">
          <RiLightbulbFlashLine className="text-white text-2xl mb-2" />
          <div className="text-white font-semibold text-xl pb-2">SKILLIFY</div>
        </div>

        <div className="w-full lg:w-3/5">
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="/courses" className="text-white hover:text-gray-400">
                Courses
              </a>
            </li>
            <li>
              <a href="/about-us" className="text-white hover:text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact-us" className="text-white hover:text-gray-400">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-1/5">
          <ul className="flex justify-center space-x-4">
            <li>
              <AiFillInstagram className="text-white hover:text-gray-300  h-7 w-7" />
            </li>
            <li>
              <AiFillTwitterCircle className="text-white hover:text-gray-300 h-7 w-7" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
