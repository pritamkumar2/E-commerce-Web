import AliceCarousel from "react-alice-carousel";
import HomeProductCard from "./HomeProductCard";
import "./HomeProductSection.css";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import { useState } from "react";

const HomeProductSection = ({ section, data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const responsive = {
    0: {
      items: 1.9,
      itemsFit: "contain",
    },
    720: {
      items: 3,
      itemsFit: "contain",
    },
    1024: {
      items: 5,
      itemsFit: "contain",
    },
  };
  const handleSlideChanged = ({ item }) => {
    setActiveIndex(item);
  };

  const slidePrev = () => {
    setActiveIndex((prevIndex) => prevIndex - 1);
  };

  const slideNext = () => {
    setActiveIndex((prevIndex) => prevIndex + 1);
  };

  const isNextButtonDisabled =
    activeIndex === data.length - responsive[1024].items;
  const isPrevButtonDisabled = activeIndex === 0;

  const items = data
    .slice(activeIndex, activeIndex + responsive[1024].items)
    .map((item, index) => <HomeProductCard key={index} product={item} />);

  return (
    <div className="relative px-2  sm:px-6 lg:px-8 ">
      <h2 className="text-2xl text-start  font-bold text-gray-800 py-5">
        {section}
      </h2>

      <div className="relative   p-5">
        <div className="   my-2 ">
          <AliceCarousel
            items={items}
            disableButtonsControls={true}
            mouseTracking={true}
            responsive={responsive}
            disableDotsControls
            onSlideChanged={handleSlideChanged}
            activeIndex={activeIndex}
          />
        </div>

        {activeIndex !== data.length - 2 && (
          <Button
            variant=""
            className="z-30 bg-[#80808079] "
            onClick={slideNext}
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
              bgcolor: "#FBEAFF",
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
        {activeIndex !== 0 && (
          <Button
            variant=""
            className="z-30 bg-white"
            onClick={slidePrev}
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%) rotate(-90deg)",
              bgcolor: "#FBEAFF",
            }}
            aria-label="prev"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(+90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeProductSection;
