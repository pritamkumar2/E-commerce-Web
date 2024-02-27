import * as React from "react";
import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOTP, verifyOTPAndUpdatePassword, login } from "../../../Redux/Auth/Action";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LoginUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [otpSent, setOTPSent] = useState(false);
  const { auth } = useSelector((store) => store);
  const handleCloseSnackbar = () => setOpenSnackBar(false);

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");

  const handleGenerateOTP = (event) => {
    event.preventDefault();
    dispatch(sendOTP(email));
    setOTPSent(true);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ email, otp, password }));
  };

  return (
    <React.Fragment>
      <form className="w-full mobileSizeForm">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={9}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-name"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>

          {!otpSent ? (
            <Grid item xs={9}>
              <Button
                className="bg-[#9155FD] w-full"
                type="button"
                variant="contained"
                size="small"
                onClick={handleGenerateOTP}
              >
                Get OTP
              </Button>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <TextField
                required
                id="otp"
                name="otp"
                label="OTP"
                fullWidth
                autoComplete="off"
                size="small"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
            </Grid>
          )}

          {otpSent && (
            <Grid item xs={12}>
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="given-name"
                type="password"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          )}

          {otpSent && (
            <Grid item xs={12}>
              <Button
                className="bg-[#9155FD] w-full"
                type="button"
                variant="contained"
                size="small"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
          )}
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center mt-4">
        <div className="py-2 flex items-center">
          <p className="m-0 p-0">Don't have an account?</p>
          <Button onClick={() => navigate("/register")} className="ml-2" size="small">
            Register
          </Button>
        </div>
        <div className="py-2 flex items-center">
          <Button onClick={() => navigate("/forget")} className="ml-2" size="small">
            Forget Password
          </Button>
        </div>
      </div>

      
    
    </React.Fragment>
  );
}
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
