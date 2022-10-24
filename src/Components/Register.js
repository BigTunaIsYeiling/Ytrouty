import { useState } from "react";
// import axios from "axios";
import { Stack, Box, Container, Button } from "@mui/material";
import { motion } from "framer-motion";
import { theme } from "../Theme/NewTheme";
import SignUp from "./SignUp";
import Login from "./Login";
import { Navigate } from "react-router-dom";
export default function Register({ Signed, setSigned }) {
  const [member, setMember] = useState(false);
  return Signed ? (
    <Navigate to="/main" />
  ) : (
    <Box
      sx={{
        overflowX: "hidden",
        " .MuiTypography-root": {
          margin: "10px",
        },
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{ duration: 0.2 }}
    >
      <Container
        sx={{
          position: "sticky",
          top: "0",
          zIndex: "101",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          paddingY={{xs:"18px",md:"25px"}}
        >
          <Box
            component={motion.img}
            src={require("./Home/logo2.png")}
            width={{xs:"54px",md:"70px"}}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ type: "spring", duration: 1 }}
            viewport={{ once: true }}
          />
          <Button
            onClick={() => setMember((prev) => !prev)}
            sx={{
              fontFamily: theme.fonts.default,
              color: "#ffdf00",
              backgroundColor: "transparent",
              opacity: "0.8",
              letterSpacing: "2px",
              transition: "0.2s",
              ":hover": {
                letterSpacing: "3px",
              },
            }}
          >
            {member ? "Sign up" : "Log in"}
          </Button>
        </Stack>
      </Container>
      {member ? (
        <Login setSigned={setSigned} />
      ) : (
        <SignUp setSigned={setSigned} />
      )}
    </Box>
  );
}
