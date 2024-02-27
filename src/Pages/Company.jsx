import React from "react";
import Img1 from "../customer/Components/images/1.png";
import Img2 from "../customer/Components/images/2.png";
import Img3 from "../customer/Components/images/3.png";

const CompanyPage = () => {
  return (
    <>
      <section className="overflow-hidden pt-0 pb-0 lg:pt-[12px] lg:pb-[90px] bg-white dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 ">
              <span className="block underline text-center my-5   text-5xl font-semibold text-[#ffc400dc]">
                Why Choose Us
              </span>
              <div className="flex items-center -mx-3 sm:-mx-4">
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
                      src={Img3}
                      alt=""
                      className="w-full rounded-2xl ml-2"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full  text-center">
              <div className="mt-10">
                <h2 className="mb-5 text-3xl font-bold  my-2  sm:text-[40px]/[48px]">
                  We are the best in the business.
                </h2>
                <p className="mb-5 text-base ">
                  We are a team of experienced professionals who are dedicated
                  to providing the best services to our clients. We have been in
                  the business for over 10 years and have a proven track record
                  of success.
                </p>
                <p className="mb-8 text-base ">
                  Our team is committed to providing the best customer service
                  and we are always available to help you with any questions or
                  concerns you may have. We are dedicated to providing the best
                  products and services to our clients and we are always looking
                  for ways to improve our business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyPage;
