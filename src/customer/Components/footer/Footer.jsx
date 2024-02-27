import React from "react";
import Logo from "../images/Logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-yellow-400 to-yellow-600 mt-10 rounded-t-2xl shadow-2xl">
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <img src={Logo} className="h-12 me-3" alt="FlowBite Logo" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                E-COMMERCE STORE
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul class="text-gray-700 dark:text-gray-700 font-medium">
                <li class="mb-4">
                  <a href="men/clothing/t-shirt" class="hover:underline">
                    Mens Cloths
                  </a>
                </li>
                <li>
                  <a href="women/clothing/t-shirt" class="hover:underline">
                    Woman Cloths
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul class="text-gray-700 dark:text-gray-700 font-medium">
                <li class="mb-4">
                  <a
                    href="https://github.com/shivrajsingh-sde"
                    class="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/shivrajsingh-sde"
                    class="hover:underline"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul class="text-gray-700 dark:text-gray-700 font-medium">
                <li class="mb-4">
                  <a href="/privaciy-policy" class="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/privaciy-policy" class="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-700 sm:text-center dark:text-gray-700">
            © 2024{" "}
            <a
              href="https://shivwebio.netlify.app/"
              target="_blank"
              className="hover:underline"
            >
              SHIVWEBIO™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
