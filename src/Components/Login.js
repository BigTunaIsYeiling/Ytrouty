// // import { useState } from "react";
// import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  Stack,
  Box,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
// import { motion } from "framer-motion";
import { theme } from "../Theme/NewTheme";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login({ setSigned }) {
  const [showPass, setPass] = useState(false);
  const [spin, setspin] = useState(false);
  const navigate = useNavigate();
  const [SignData, setSignData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setSignData({ ...SignData, [e.target.name]: e.target.value });
  };
  const SignIn = (e) => {
    e.preventDefault();
    setspin(true);
    axios
      .post("https://ytrouty-app-api.onrender.com/users/SignIn", SignData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setspin(false);
          setSigned((prev) => true);
          navigate("/main");
        }
      })
      .catch((err) => {
        err.response.data.errors.map((error, i) => {
          return toast.error(error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
        });
        setspin(false);
      });
  };
  return (
    <Stack
      spacing={{ xs: "40px", md: "100px" }}
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="flex-start"
      position="relative"
    >
      <Box
        component="p"
        color="white"
        sx={{
          fontFamily: theme.fonts.logo,
          fontSize: "30px",
        }}
      >
        Welcome Back
      </Box>
      <Stack
        direction="column"
        width={{ xs: "70%", sm: "50%", md: "30%" }}
        sx={{
          "& button": {
            marginTop: "60px",
          },
        }}
      >
        <Stack direction="column" spacing="7px" marginY="40px">
          <Box
            component="p"
            color="white"
            sx={{
              fontFamily: theme.fonts.logo,
              fontSize: "15px",
            }}
          >
            <MdAlternateEmail
              style={{
                marginRight: "4px",
              }}
              color="#777"
            />
            Email
          </Box>
          <Box
            component="input"
            height="25px"
            placeholder="Enter your Email"
            autoComplete="off"
            spellCheck="false"
            name="email"
            value={SignData.email}
            onChange={handleChange}
            sx={{
              border: "0",
              outline: "0",
              padding: "8px",
              backgroundColor: "transparent",
              color: "white",
              borderBottom: "1px solid white",
              fontFamily: theme.fonts.default,
              letterSpacing: "1px",
              opacity: "0.9",
              "&:focus": {
                borderBottom: "1px solid yellow",
              },
              transition: "0.5s",
              paddingY: "5px",
            }}
          />
        </Stack>
        <Stack direction="column" spacing="7px" position="relative">
          <Box
            component={IconButton}
            color="white"
            sx={{
              position: "absolute",
              right: "0",
              bottom: "0",
              zIndex: "100",
            }}
            onClick={() => setPass((prev) => !prev)}
          >
            {showPass ? (
              <Box component={AiFillEyeInvisible} color="white" />
            ) : (
              <Box component={AiFillEye} color="white" />
            )}
          </Box>
          <Box
            component="p"
            color="white"
            sx={{
              fontFamily: theme.fonts.logo,
              fontSize: "15px",
            }}
          >
            <RiLockPasswordLine
              style={{
                marginRight: "4px",
              }}
              color="#777"
            />
            Password
          </Box>
          <Box
            component="input"
            height="25px"
            placeholder="Enter your Password"
            type={showPass ? "text" : "password"}
            autoComplete="off"
            spellCheck="false"
            name="password"
            value={SignData.password}
            onChange={handleChange}
            sx={{
              border: "0",
              outline: "0",
              padding: "8px",
              backgroundColor: "transparent",
              color: "white",
              borderBottom: "1px solid white",
              fontFamily: theme.fonts.default,
              letterSpacing: "1px",
              opacity: "0.9",
              "&:focus": {
                borderBottom: "1px solid yellow",
              },
              transition: "0.5s",
              paddingY: "5px",
            }}
          />
        </Stack>
        <Box width="100%" position="relative" alignSelf={"center"}>
          <Button
            onClick={SignIn}
            disabled={spin}
            sx={{
              backgroundColor: "#ffc300",
              color: "black",
              ":hover": {
                backgroundColor: "#ffc300",
              },
              fontFamily: theme.fonts.heading,
              fontWeight: "600",
              width: "100%",
              opacity: spin ? 0.3 : 1,
            }}
          >
            Submit
          </Button>
          {spin && (
            <Box
              component={CircularProgress}
              size={27}
              color="#ffdf00"
              sx={{
                position: "absolute",
                bottom: "6px",
                left: "47%",
                transform: "translate(-50%, 0)",
              }}
            />
          )}
        </Box>
      </Stack>
      <ToastContainer theme="colored" />
    </Stack>
  );
}
