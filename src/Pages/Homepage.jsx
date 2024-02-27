import React, { useState, useEffect } from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ProductShowCase from "../customer/Components/ProductShowCase/ProductShowCase";
import Img1 from "../customer/Components/images/1.png";
import Img2 from "../customer/Components/images/2.gif";
import Img3 from "../customer/Components/images/3.png";
import Img4 from "../customer/Components/images/4.png";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [watches, setWatches] = useState([]);
  const [tshirts, setTshirts] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [womenTops, setWomenTops] = useState([]);
  const [womenJeans, setWomenJeans] = useState([]);
  const [mensJeans, setMensJeans] = useState([]);
  const [womenDresses, setWomenDresses] = useState([]);
  const server = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${server}/api/products`);
        let allProducts = response.data.content;
        const totalPages = response.data.totalPages;

        for (let page = 2; page <= totalPages; page++) {
          response = await axios.get(
            `${server}/api/products?pageNumber=${page}`
          );
          allProducts = allProducts.concat(response.data.content);
        }

        setProducts(allProducts);

        const menShoes = allProducts.filter(
          (product) => product.category.name === "Shoes"
        );
        const tshirtProducts = allProducts.filter(
          (product) => product.category.name === "t-shirts"
        );
        const watchProducts = allProducts.filter(
          (product) => product.category.name === "Watch"
        );
        const womenTops = allProducts.filter(
          (product) => product.category.name === "top"
        );
        const womenJeans = allProducts.filter(
          (product) => product.category.name === "women_jeans"
        );
        const mensJeans = allProducts.filter(
          (product) => product.category.name === "men_jeans"
        );
        const womenDresses = allProducts.filter(
          (product) => product.category.name === "women_dress"
        );

        setShoes(menShoes);
        setTshirts(tshirtProducts);
        setWatches(watchProducts);
        setWomenTops(womenTops);
        setWomenJeans(womenJeans);
        setMensJeans(mensJeans);
        setWomenDresses(womenDresses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto   flex flex-col justify-center items-center  ">
      <HomeCarousel images={homeCarouselData} />

      <div className="mt-10  space-y-5 mx-auto w-full    ">
        {watches.length > 0 && (
          <HomeProductSection data={watches} section={"Wristwatches for Men"} />
        )}

        <ProductShowCase imageUrl={Img4} className="  " />

        {shoes.length > 0 && (
          <HomeProductSection data={shoes} section={"Men's Footwear"} />
        )}
        <ProductShowCase imageUrl={Img2} className="my-5" />

        {tshirts.length > 0 && (
          <HomeProductSection data={tshirts} section={"Men's T-shirts"} />
        )}

        <ProductShowCase
          onClick={() => navigate(`/product/accessories/Watch?category=Watch`)}
          imageUrl={Img1}
          className="my-5 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Homepage;
