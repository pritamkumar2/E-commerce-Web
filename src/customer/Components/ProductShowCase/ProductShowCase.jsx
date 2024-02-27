import React from "react";
import "./ProductShowCase.css";
import { useNavigate } from "react-router-dom";

const ProductShowCase = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className="product-showcase cursor-pointer"
      onClick={() => navigate(`/product/accessories/Watch?category=Watch`)}
    >
      <img src={props.imageUrl} alt="Product Showcase" />
    </div>
  );
};

export default ProductShowCase;
