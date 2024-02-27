import React from "react";
import { Box, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();

  return (
    <Box
      className="p-5 shadow-lg flex flex-col md:flex-row w-full hover:shadow-2xl border rounded-md transition-transform transform hover:scale-105"
      onClick={() => navigate(`/account/order/${order?._id}`)}
      sx={{ cursor: "pointer" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img
            className="w-16 h-16 object-cover rounded-md"
            src={item?.product?.imageUrl}
            alt=""
          />

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <Typography variant="h6" className="font-semibold">
              {item?.product?.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="mt-2 md:mt-0"
            >
              Size: {item?.size}
            </Typography>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <Typography variant="h6" className="font-semibold">
            ₹{item?.price}
          </Typography>

          <div className="flex flex-col items-end mt-2">
            {order?.orderStatus === "DELIVERED" ? (
              <>
                <FiberManualRecordIcon
                  sx={{ width: 15, height: 15, color: "green" }}
                />
                <Typography variant="body2" color="textSecondary">
                  Delivered On Mar 03
                </Typography>
              </>
            ) : (
              <>
                <AdjustIcon sx={{ width: 15, height: 15, color: "green" }} />
                <Typography variant="body2" color="textSecondary">
                  Expected Delivery On Mar 03
                </Typography>
              </>
            )}

            <Typography variant="caption" className="text-xs">
              Your Item Has Been Delivered
            </Typography>

            {item.orderStatus === "DELIVERED" && (
              <div
                onClick={() => navigate(`/account/rate/${item?._id}`)}
                className="flex items-center text-blue-600 cursor-pointer mt-2"
              >
                <StarIcon sx={{ fontSize: "2rem" }} />
                <Typography variant="body2" className="ml-2">
                  Rate & Review Product
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default OrderCard;
