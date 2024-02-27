import React from "react";
import "./ProductCard.css";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    title,
    brand,
    imageUrl,
    price,
    discountedPrice,
    color,
    discountPersent,
  } = product;
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${product?._id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="productCard rounded-t-2xl drop-shadow-xl shadow-xl  w-[15rem] border m-3 transition-all cursor-pointer "
    >
      <div className="h-[20rem]">
        <img
          className="h-full rounded-t-2xl   w-full object-cover object-center "
          src={imageUrl}
          alt=""
        />
      </div>
      <div className="textPart bg-white rounded-t-2xl border-b-2 border-[#ffec45]  p-3 ">
        <div>
          <p className="font-bold opacity-60">{brand}</p>
          <p className="">{title}</p>

          <p className="font-semibold opacity-50">{color}</p>
        </div>

        <div className="flex space-x-2 items-center">
          <p className="font-semibold">₹{discountedPrice}</p>
          <p className="opacity-50 line-through">₹{price}</p>
          <p className="text-green-600 font-semibold">{discountPersent}% off</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
