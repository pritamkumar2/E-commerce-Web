import * as React from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendOTP,
  verifyOTPAndUpdatePassword,
} from "../../../Redux/Auth/Action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Forget() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { auth } = useSelector((store) => store);
  const [otpSent, setOTPSent] = useState(false);

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    dispatch(sendOTP(email));
    setOTPSent(true);
    toast.success("OTP sent successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleOTPSubmit = (event) => {
    event.preventDefault();
    dispatch(verifyOTPAndUpdatePassword(email, otp, newPassword));
  };

  return (
    <React.Fragment>
      <form className="w-full mobileSizeForm" onSubmit={handleEmailSubmit}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={9}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={9}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0", width: "100%" }}
            >
              Send OTP
            </Button>
          </Grid>
        </Grid>
      </form>

      {otpSent && (
        <form className="w-full" onSubmit={handleOTPSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <TextField
                required
                id="otp"
                name="otp"
                label="Enter OTP"
                fullWidth
                autoComplete="off"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                id="newPassword"
                name="newPassword"
                label="New Password"
                type="password"
                fullWidth
                autoComplete="off"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={9}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ padding: ".8rem 0", width: "100%" }}
              >
                Update Password
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <p className="m-0 p-0">Don't have an account?</p>
          <Button
            onClick={() => navigate("/register")}
            className="ml-5"
            size="small"
          >
            Register
          </Button>
        </div>
        <div className="py-3 flex items-center">
          <Button
            onClick={() => navigate("/forget")}
            className="ml-5"
            size="small"
          >
            Forget Password
          </Button>
        </div>
      </div>
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
    </React.Fragment>
  );
}
