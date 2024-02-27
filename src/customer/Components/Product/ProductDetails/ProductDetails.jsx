import React, { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { deepPurple } from "@mui/material/colors";
import { getUser, logout } from "../../../../Redux/Auth/Action";
import AuthModal from "../../Auth/AuthModal";
import {
  Avatar,
  Box,
  Button,
  Grid,
  LinearProgress,
  Rating,
  Menu,
  MenuItem,
} from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const product = {
  name: "Product",
  price: "₹996",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    {
      name: "red",
      style: { bgColor: "red" },
      selectedStyle: { ringColor: "gray-400" },
    },
    {
      name: "blue",
      style: { bgColor: "blue" },
      selectedStyle: { ringColor: "gray-400" },
    },
    {
      name: "black",
      style: { bgColor: "black" },
      selectedStyle: { ringColor: "gray-900" },
    },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
  ],
  shoes: [
    { name: "6", inStock: true },
    { name: "7", inStock: true },
    { name: "8", inStock: true },
    { name: "9", inStock: true },
    { name: "10", inStock: true },
  ],

  description: "our product are high quality and luxurious",
  highlights: [
    "Elevate your wardrobe with our premium collection of luxurious essentials.",
    "offering unparalleled comfort and style",
    "each one a versatile addition to your wardrobe",
    "Ultra-soft 100% joy to wear",
  ],
  details: "long-lasting colors that stand out from the crowd.",
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [productColor, setProductColor] = useState("");
  const [showCustomAlert, setShowCustomAlert] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [similerProduct, setData] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct, review } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");

  const { auth } = useSelector((store) => store);

  const location = useLocation();

  const handleSubmit = () => {
    if (customersProduct?.product?.category?.name === "Watch") {
      const size = "M";
      const data = { productId, size: size, color: productColor };
      console.log("you are strong you change me", data);
      dispatch(addItemToCart({ data, jwt }));
      navigate("/cart");
    } else {
      const data = { productId, size: selectedSize.name, color: productColor };

      dispatch(addItemToCart({ data, jwt }));
      navigate("/cart");
    }
  };

  // colors
  const handleColorSelection = (color, index) => {
    // Logic to handle color selection
    toast(`🦄 colour selected ${color} so easy!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setProductColor(color);

    // For example, you can update the selected color in the state
  };

  useEffect(() => {
    const data = { productId: productId, jwt };

    dispatch(findProductById(data));
    dispatch(getAllReviews(productId));
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/products`
        );
        let allProducts = response.data.content;
        const totalPages = response.data.totalPages;

        for (let page = 2; page <= totalPages; page++) {
          response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/products?pageNumber=${page}`
          );
          allProducts = allProducts.concat(response.data.content);
        }

        setData(allProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showCustomAlert) {
      const timeoutId = setTimeout(() => {
        setShowCustomAlert(false);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [showCustomAlert]);

  const similer = similerProduct.filter(
    (product) =>
      product.category.name === customersProduct.product.category.name
  );

  useEffect(() => {
    if (jwt) {
      // dispatch(getUser(jwt));
      // dispatch(getCart(jwt));
    }
  }, [jwt]);

  const handleOpen = () => {
    setOpenAuthModal(true);
  };

  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleCloseUserMenuandprofile = () => {
    navigate("/profile");
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logout());
  };

  return (
    <div className="bg-[white] gradient-background-product lg:px-20">
      <nav aria-label=" bg-[red]">
        <ol
          role="list"
          className="mx-auto flex  text-2xl items-center font-serif  space-x-2 px-4 w-full"
        >
          <p>{`${customersProduct?.product?.topLevelCategory} / ${customersProduct?.product?.secondLevelCategory} / ${customersProduct?.product?.thirdLevelCategory}`}</p>
        </ol>
      </nav>
      <div className="pt-6 ">
        {/* product details */}
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg border-2 drop-shadow-2xl shadow-2xl hover:scale-105 ease-in-out duration-300 border-black p-1 max-w-[30rem] max-h-[35rem]">
              <img
                src={
                  customersProduct?.product?.additionalImages[activeImageIndex]
                    ?.url
                }
                alt={product.images[activeImageIndex]?.alt}
                className="h-full w-full object-center"
              />
            </div>
            <div className="flex  gap-4  text-text items-center justify-center mt-4">
              {customersProduct?.product?.additionalImages.map(
                (image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg border-2 drop-shadow-2xl shadow-2xl hover:scale-105 ease-in-out duration-300 border-black p-1 max-w-[8rem] max-h-[8rem] flex items-center justify-center"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="h-full w-full object-center cursor-pointer"
                      onClick={() => setActiveImageIndex(index)}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight text-gray-900  ">
                {customersProduct.product?.brand}
              </h1>
              <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                {customersProduct.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                <p className="font-semibold">
                  ₹{customersProduct.product?.discountedPrice}
                </p>
                <p className="opacity-50 line-through">
                  ₹{customersProduct.product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {customersProduct.product?.discountPersent}% Off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>

                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={4.6}
                    precision={0.5}
                    readOnly
                  />

                  <p className="opacity-60 text-sm">42807 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div>

              <form className="mt-10" onSubmit={handleSubmit}>
                <div className="mt-10">
                  {/* {colour} */}
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                    <div className="grid grid-flow-col auto-cols-max gap-2 mt-2">
                      {customersProduct?.product?.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-black cursor-pointer border"
                          style={{
                            backgroundColor: color,
                            ringColor: color.selected
                              ? color.selectedStyle.ringColor
                              : "",
                          }}
                          onClick={() => handleColorSelection(color, index)}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* {//////////////////////////////////} */}

                  <>
                    {customersProduct?.product?.category?.name === "Watch" ? (
                      <div>
                        <input type="hidden" name="size" key="m" />
                      </div>
                    ) : customersProduct?.product?.category?.name ===
                      "Shoes" ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            Size
                          </h3>
                        </div>
                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a size
                          </RadioGroup.Label>
                          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
                            {customersProduct?.product?.sizes.map((size) => (
                              <RadioGroup.Option
                                key={size.name}
                                value={size}
                                disabled={size.quantity <= 0}
                                className={({ active }) =>
                                  classNames(
                                    size.quantity > 0
                                      ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                      : "cursor-not-allowed bg-gray-50 text-gray-200",
                                    active ? "ring-1 ring-indigo-500" : "",
                                    "group relative flex items-center justify-center rounded-md border py-1 px-1 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label as="span">
                                      {size.name}
                                    </RadioGroup.Label>
                                    {size.quantity > 0 ? (
                                      <span
                                        className={classNames(
                                          active ? "border" : "border-2",
                                          checked
                                            ? "border-indigo-500"
                                            : "border-transparent",
                                          "pointer-events-none absolute -inset-px rounded-md"
                                        )}
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                      >
                                        <svg
                                          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                          viewBox="0 0 100 100"
                                          preserveAspectRatio="none"
                                          stroke="currentColor"
                                        >
                                          <line
                                            x1={0}
                                            y1={100}
                                            x2={100}
                                            y2={0}
                                            vectorEffect="non-scaling-stroke"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                            {selectedSize === null && setSelectedSize("M")}
                          </div>
                        </RadioGroup>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            Size
                          </h3>
                        </div>
                        <RadioGroup
                          value={selectedSize}
                          onChange={setSelectedSize}
                          className="mt-4"
                        >
                          <RadioGroup.Label className="sr-only">
                            Choose a size
                          </RadioGroup.Label>
                          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
                            {customersProduct?.product?.sizes.map((size) => (
                              <RadioGroup.Option
                                key={size.name}
                                value={size}
                                disabled={size.quantity <= 0}
                                className={({ active }) =>
                                  classNames(
                                    size.quantity > 0
                                      ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                      : "cursor-not-allowed bg-gray-50 text-gray-200",
                                    active ? "ring-1 ring-indigo-500" : "",
                                    "group relative flex items-center justify-center rounded-md border py-1 px-1 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label as="span">
                                      {size.name}
                                    </RadioGroup.Label>
                                    {size.quantity > 0 ? (
                                      <span
                                        className={classNames(
                                          active ? "border" : "border-2",
                                          checked
                                            ? "border-indigo-500"
                                            : "border-transparent",
                                          "pointer-events-none absolute -inset-px rounded-md"
                                        )}
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <span
                                        aria-hidden="true"
                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                      >
                                        <svg
                                          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                          viewBox="0 0 100 100"
                                          preserveAspectRatio="none"
                                          stroke="currentColor"
                                        >
                                          <line
                                            x1={0}
                                            y1={100}
                                            x2={100}
                                            y2={0}
                                            vectorEffect="non-scaling-stroke"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                            {selectedSize === null && setSelectedSize("M")}
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  </>
                </div>

                {/* Custom Toster Alert */}
                {showCustomAlert && (
                  <div>
                    <div className=" p-2 rounded-2xl my-2  bg-[orange]">
                      Please Select Size
                    </div>
                    <Button onClick={() => setShowCustomAlert(false)}>
                      Close
                    </Button>
                  </div>
                )}
                {auth.user ? (
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
                  >
                    Add To Cart
                  </Button>
                ) : (
                  <div>
                    {auth.user ? (
                      <div>
                        <Avatar
                          className="text-white"
                          onClick={handleUserClick}
                          aria-controls={open ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          sx={{
                            bgcolor: deepPurple[500],
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          {auth.user?.firstName[0].toUpperCase()}
                        </Avatar>
                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={openUserMenu} // Use openUserMenu here
                          onClose={handleCloseUserMenu}
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          <MenuItem onClick={handleCloseUserMenuandprofile}>
                            Profile
                          </MenuItem>
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                      </div>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          padding: ".8rem 2rem",
                          marginTop: "2rem",
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: deepPurple[700],
                          },
                        }}
                        onClick={handleOpen}
                      >
                        Sign In to add cart
                      </Button>
                    )}
                  </div>
                )}
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {customersProduct.product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* rating and review section */}
        <section className="pt-10">
          <h1 className="font-semibold text-lg pb-4">
            Recent Review & Ratings
          </h1>

          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={12} sm={7}>
                <div className="space-y-5">
                  {review.reviews?.map((item, i) => (
                    <ProductReviewCard key={i} item={item} />
                  ))}
                </div>
              </Grid>

              <Grid item xs={12} sm={5}>
                <h1 className="text-xl font-semibold pb-1">Product Ratings</h1>
                <div className="flex items-center space-x-3 pb-10">
                  <div className="flex items-center">
                    <Rating
                      name="read-only"
                      value={4.6}
                      precision={0.5}
                      readOnly
                    />
                    <p className="opacity-60 ml-2">42807 Ratings</p>
                  </div>
                </div>

                {/* Rating Categories */}
                <Box>
                  {[
                    { label: "Excellent", value: 40, color: "success" },
                    { label: "Very Good", value: 30, color: "success" },
                    { label: "Good", value: 25, color: "orange" },
                    { label: "Average", value: 21, color: "success" },
                    { label: "Poor", value: 10, color: "error" },
                  ].map((category, index) => (
                    <Grid
                      key={index}
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">{category.label}</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                            "& .MuiLinearProgress-bar": {
                              bgcolor: category.color,
                            },
                          }}
                          variant="determinate"
                          value={category.value}
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">19259</p>
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* similer product */}
        <section className="pt-10 justify-center items-center flex-col flex">
          <h1 className="py-5 w-full font-serif text-3xl font-bold">
            Similar Products
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {similer.map((item) => (
              <HomeProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <AuthModal open={openAuthModal} handleClose={handleClose} />
    </div>
  );
}
