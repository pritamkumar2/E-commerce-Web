import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product?._id || product?.id}`)}
      className="cursor-pointer transform hover:scale-105 transition-transform duration-300 drop-shadow-2xl   flex flex-col items-center  rounded-lg shadow-lg overflow-hidden w-[8rem] h-[10rem] md:w-[15rem] md:h-[18rem] mx-3 relative"
    >
      <div className="  h-full w-full  object-fill ">
        <img
          className="rounded-t-lg   w-full h-full object-fill"
          src={product?.image || product?.imageUrl}
          alt={product?.title}
        />
      </div>

      <div className="text w-full h-full items-center flex justify-center flex-col absolute top-0 left-0 transition-all duration-500 ease-in-out opacity-0 bg-white bg-opacity-95 hover:opacity-100">
        <h3 className="text-base md:text-lg font-medium text-gray-900">
          {product?.title}
        </h3>
        <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-500">
          {product?.description}
        </p>
      </div>
    </div>
  );
};

export default HomeProductCard;
