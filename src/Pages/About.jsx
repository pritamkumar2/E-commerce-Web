import React from "react";
import Img1 from "../customer/Components/images/flow state.gif";
import Img2 from "../customer/Components/images/travel.jpg";
import Img5 from "../customer/Components/images/5.png";

const About = () => {
  const email = "shivrajsingh.info.me@gmail.com";
  const phoneNumber = "+91987654321";

  return (
    <>
      <section className="overflow-hidden pt-0 pb-0 lg:pt-[0px] lg:pb-[0px] bg-white dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full">
              <div className="mt-10 lg:mt-0 text-center">
                <span className="block  text-5xl underline  my-5 font-semibold text-yellow-500">
                  About Us
                </span>

                <div className="flex items-center  -mx-3 sm:-mx-4">
                  <div className="w-full px-3 sm:px-4 xl:w-1/2">
                    <div className="py-3 sm:py-4">
                      <img src={Img1} alt="" className="w-full rounded-2xl" />
                    </div>
                    <div className="py-3 sm:py-4">
                      <img src={Img2} alt="" className="w-full rounded-2xl" />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:px-4 xl:w-1/2">
                    <div className="relative z-10 my-4">
                      <img
                        src={Img5}
                        alt=""
                        className="w-full rounded-2xl ml-2"
                      />
                    </div>
                  </div>
                </div>

                <h2 className="my-5 text-4xl font-bold  sm:text-[40px]/[48px]">
                  Welcome to Our Company
                </h2>
                <p className="mb-5 text-xl font-serif   md:w-[70%] p-2 mx-auto ">
                  We are a team of experienced professionals who are dedicated
                  to providing the best services to our clients. We have been in
                  the business for over 10 years and have a proven track record
                  of success.
                </p>
                <p className="mb-8 text-xl font-serif   md:w-[70%] p-2 mx-auto ">
                  Our team is committed to providing the best customer service
                  and we are always available to help you with any questions or
                  concerns you may have. We are dedicated to providing the best
                  products and services to our clients and we are always looking
                  for ways to improve our business.
                </p>
                <div className="flex justify-center space-x-8">
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center justify-center py-3 text-base font-medium text-black border border-black rounded-md px-7 bg-[yellow] hover:bg-opacity-90"
                  >
                    Email Us
                  </a>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="inline-flex items-center justify-center py-3 text-base font-medium text-black border  border-black rounded-md px-7 bg-[yellow] hover:bg-opacity-90"
                  >
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
