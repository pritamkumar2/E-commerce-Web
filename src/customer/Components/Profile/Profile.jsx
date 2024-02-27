import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import OrderCard from "../orders/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../Redux/Auth/Action";
import { Card, CardContent, Typography } from "@mui/material";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";

const Profile = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    dispatch({ type: "GET_USER_REQUEST" });
    dispatch(getUser(token));
  }, [dispatch]);

  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderHistory({ jwt }));
  }, [jwt]);

  console.log("users orders ", order.orders);

  return (
    <div className="bg-gray-100 flex flex-col  min-h-[auto]  items-center justify-center">
      <div className=" md:flex flex-row my-10   w-[70%] mx-auto   justify-around  ">
        <section class="pt-16 bg-blueGray-50">
          <div class="w-full  px-4 mx-auto">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
              <div class="px-6">
                {user && (
                  <div>
                    <div class="flex flex-wrap justify-center">
                      <div class="w-full px-4    flex justify-center">
                        <Avatar
                          className="text-white "
                          sx={{
                            bgcolor: "Yellow",
                            color: "black",
                            cursor: "pointer",
                            height: "80px",
                            width: "80px",
                            transform: "scale(1.5)",
                            font: "cursor ",
                          }}
                        >
                          {user?.firstName[0].toUpperCase()}
                        </Avatar>
                      </div>
                    </div>

                    <div class="text-center mt-20">
                      <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        Name
                        {`    ${user.firstName}`}
                      </h3>
                      <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                        Email
                        {`    ${user.email}`}
                      </div>
                      <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      </div>
                      {user.addresses[0] && (
                        <div class="mb-2 text-blueGray-600 mt-10">
                          <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                          Address
                          {`    ${user.addresses[0].city}`}
                          {`    ${user.addresses[0].streetAddress}`}
                          {`    ${user.addresses[0].zipCode}`}
                          Mobile No.
                          {`    ${user.addresses[0].mobile || "add mobile no"}`}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="  md:w-[50%]">
          <div>
            <h1 className=" underline text-3xl w-full my-5">Orders </h1>

            <div>
              <Box className="space-y-5  w-full">
                {order.orders?.length > 0 &&
                  order.orders?.map((order) => {
                    return order?.orderItems?.map((item, index) => (
                      <OrderCard item={item} order={order} />
                    ));
                  })}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
