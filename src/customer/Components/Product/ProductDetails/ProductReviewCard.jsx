import React from "react";
import { Avatar } from "@mui/material";
import { Rating, Box, Grid } from "@mui/material";

const ProductReviewCard = ({ item }) => {
  const [value, setValue] = React.useState(4.5);

  return (
    <div className="p-4 border-b border-gray-200">
      <Grid container spacing={2}>
        <Grid item xs={3} sm={2}>
          <Avatar
            className="text-white"
            sx={{ width: 40, height: 40, bgcolor: "#9155FD" }}
            alt={item?.user?.firstName}
            src=""
          >
            {item?.user?.firstName[0].toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item xs={9} sm={10}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{item.user?.firstName}</p>
              <p className="opacity-70">April 5, 2023</p>
            </div>
            <div>
              <Rating
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
              />
            </div>
            <p>{item?.review}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
