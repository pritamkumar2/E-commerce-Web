import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { IconButton, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Remove as RemoveIcon } from "@mui/icons-material";

import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Fragment } from "react";
import "./CreateProductForm.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../Redux/Customers/Product/Action";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
  {name: "xl", quantity: 0},
  { name: "xxl", quantity: 0}
];

const ShoesInitialSize = [
  { name: "41", quantity: 0 },
  { name: "42", quantity: 0 },
  { name: "43", quantity: 0 },
  { name: "44", quantity: 0 },
  { name: "45", quantity: 0 },
  { name: "6", quantity: 0 },
  { name: "7", quantity: 0 },
  { name: "8", quantity: 0 },
  { name: "9", quantity: 0 },
  { name: "10", quantity: 0 },
];

const CreateProductForm = () => {
  const [colors, setColors] = useState([{ id: uuidv4(), color: "" }]);
  const [additionalImages, setAdditionalImages] = useState([]);

  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    colors: [],
    discountedPrice: "",
    price: "",
    discountPersent: "",
    size: ShoesInitialSize,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
    additionalImages: [],
  });

  console.log(colors);
  console.log("dgfdvfgvdg ", productData);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    setProductData((prevState) => ({
      ...prevState,
      size:
        productData.thirdLevelCategory === "Shoes"
          ? ShoesInitialSize
          : initialSizes,
    }));
  }, [productData.thirdLevelCategory]);
  const handleRemoveColor = (id) => {
    const updatedColors = colors.filter((colorObj) => colorObj.id !== id);
    setColors(updatedColors);
  };
  const addAdditionalImageField = () => {
    setAdditionalImages([...additionalImages, { url: "" }]);
  };

  const handleAdditionalImageChange = (e, index) => {
    const newAdditionalImages = [...additionalImages];
    newAdditionalImages[index].url = e.target.value;
    setAdditionalImages(newAdditionalImages);
  };
  const handleRemoveAdditionalImage = (index) => {
    const newAdditionalImages = [...additionalImages];
    newAdditionalImages.splice(index, 1);
    setAdditionalImages(newAdditionalImages);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" || name === "discountedPrice") {
      const price = parseFloat(productData.price);
      const discountedPrice = parseFloat(productData.discountedPrice);
      if (!isNaN(price) && !isNaN(discountedPrice)) {
        const discountPercent = ((price - discountedPrice) / price) * 100;
        setProductData((prevState) => ({
          ...prevState,
          discountPersent: isNaN(discountPercent)
            ? ""
            : discountPercent.toFixed(2),
          [name]: value,
        }));
      } else {
        setProductData((prevState) => ({
          ...prevState,
          discountPersent: "",
          [name]: value,
        }));
      }
    } else {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleAddColor = () => {
    setColors([...colors, { id: uuidv4(), color: "" }]);
  };

  const handleColorChange = (e, id) => {
    const updatedColors = colors.map((colorObj) =>
      colorObj.id === id ? { ...colorObj, color: e.target.value } : colorObj
    );
    setColors(updatedColors);

    // Update productData with the updated colors
    setProductData((prevState) => ({
      ...prevState,
      colors: updatedColors.map((colorObj) => colorObj.color),
    }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index].quantity = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleAddSize = () => {
    const sizes = [...productData.size];
    sizes.push({ name: "", quantity: "" });
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  // const handleRemoveSize = (index) => {
  //   const sizes = [...productData.size];
  //   sizes.splice(index, 1);
  //   setProductData((prevState) => ({
  //     ...prevState,
  //     size: sizes,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredSizes = productData.size.filter((size) => size.quantity > 0);
    const updatedProductData = {
      ...productData,
      size: filteredSizes,
      additionalImages,
    };

    console.log("admin product data", updatedProductData);
    dispatch(createProduct({ data: updatedProductData, jwt }));
    toast("🦄 Product added successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="createProductContainer">
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className="py-10 text-center "
      >
        Add New Product
      </Typography>
      <form
        onSubmit={handleSubmit}
        className="createProductContainer min-h-screen"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            {additionalImages.map((image, index) => (
              <div key={index} className="additional-image-field">
                <TextField
                  fullWidth
                  label={`Additional Image URL ${index + 1}`}
                  value={image.url}
                  onChange={(e) => handleAdditionalImageChange(e, index)}
                />
                <IconButton onClick={() => handleRemoveAdditionalImage(index)}>
                  <RemoveIcon />
                </IconButton>
              </div>
            ))}
            <IconButton onClick={addAdditionalImageField}>
              <AddIcon />
            </IconButton>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPersent" // Corrected field name
              value={productData.discountPersent} // Corrected field value
              onChange={handleChange} // Corrected field change handler
              type="number"
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
              >
                <MenuItem value="men">Men</MenuItem>
                <MenuItem value="women">Women</MenuItem>
                <MenuItem value="kids">Kids</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
              >
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="accessories">Accessories</MenuItem>
                <MenuItem value="brands">Brands</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
              >
                <MenuItem value="top">Tops</MenuItem>
                <MenuItem value="Shoes">Shoes</MenuItem>
                <MenuItem value="Watch">Watch</MenuItem>
                <MenuItem value="women_dress">Dresses</MenuItem>
                <MenuItem value="t-shirts">T-Shirts</MenuItem>
                <MenuItem value="saree">Saree</MenuItem>
                <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
                <MenuItem value="men_jeans">men_jeans</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              multiline
              name="description"
              rows={3}
              onChange={handleChange}
              value={productData.description}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Colors</Typography>
            {colors.map((colorObj, index) => (
              <Fragment key={colorObj.id}>
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <FormControl fullWidth>
                      <InputLabel>Select Color</InputLabel>
                      <Select
                        value={colorObj.color}
                        onChange={(e) => handleColorChange(e, colorObj.id)}
                      >
                        <MenuItem value="red">Red</MenuItem>
                        <MenuItem value="blue">Blue</MenuItem>
                        <MenuItem value="green">Green</MenuItem>
                        <MenuItem value="yellow">Yellow</MenuItem>
                        <MenuItem value="purple">Purple</MenuItem>
                        <MenuItem value="orange">Orange</MenuItem>
                        <MenuItem value="pink">Pink</MenuItem>
                        <MenuItem value="brown">Brown</MenuItem>
                        <MenuItem value="gray">Gray</MenuItem>
                        <MenuItem value="black">Black</MenuItem>
                        <MenuItem value="white">White</MenuItem>
                        <MenuItem value="cyan">Cyan</MenuItem>
                        <MenuItem value="magenta">Magenta</MenuItem>
                        <MenuItem value="teal">Teal</MenuItem>
                        <MenuItem value="navy">Navy</MenuItem>
                        <MenuItem value="olive">Olive</MenuItem>
                        <MenuItem value="maroon">Maroon</MenuItem>
                        {/* Add more colors as needed */}
                      </Select>
                    </FormControl>
                  </Grid>
                  {index === colors.length - 1 && (
                    <Grid item xs={1}>
                      <IconButton onClick={handleAddColor}>
                        <AddIcon />
                      </IconButton>
                    </Grid>
                  )}
                  {index !== colors.length - 1 && (
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => handleRemoveColor(colorObj.id)}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                  )}
                </Grid>
                {index < colors.length - 1 && <Divider />}
              </Fragment>
            ))}
          </Grid>

          {productData.thirdLevelCategory === "Shoes" &&
            productData.size.map((size, index) => (
              <Grid container item spacing={3} key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Shoe Size"
                    name={`shoeSize_${index}`}
                    value={size.name}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    name={`shoeSizeQuantity_${index}`}
                    type="number"
                    value={size.quantity}
                    onChange={(e) => handleSizeChange(e, index)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}
          {productData.thirdLevelCategory !== "Shoes" &&
            initialSizes.map((size, index) => (
              <Grid container item spacing={3} key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Shoe Size"
                    name={`shoeSize_${index}`}
                    value={size.name}
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Quantity"
                    name={`shoeSizeQuantity_${index}`}
                    type="number"
                    value={size.quantity}
                    onChange={(e) => handleSizeChange(e, index)}
                    fullWidth
                  />
                </Grid>
              </Grid>
            ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20"
              size="large"
              type="submit"
            >
              Add New Product
            </Button>
            {/* <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20 ml-10"
              size="large"
              onClick={()=>handleAddProducts(dressPage1)}
            >
              Add Products By Loop
            </Button> */}
          </Grid>
        </Grid>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
  );
};

export default CreateProductForm;
