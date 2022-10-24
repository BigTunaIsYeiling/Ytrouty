// import axios from "axios";
import { Box, Container, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { theme } from "../../Theme/NewTheme";
import BorderAnimation from "../../Lottie/lf30_editor_fnppxa3r.json";
import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
export default function Head() {
  const AnimationRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      AnimationRef.current.play();
    }, 1000);
  }, [AnimationRef]);
  return (
    <Stack
      sx={{ overflow: "hidden", minHeight: "100vh" }}
      direction="column"
      justifyContent="flex-start"
      spacing={{ xs: "45px", md: "180px" }}
    >
      <Stack>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            paddingY={{ xs: "18px", md: "25px" }}
          >
            <Box
              component={motion.img}
              src={require("./logo2.png")}
              width={{ xs: "54px", md: "70px" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ type: "spring", duration: 1 }}
              viewport={{ once: true }}
            />
          </Stack>
        </Container>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        marginBottom={{ xs: "144px", md: "120px" }}
      >
        <Typography
          component={motion.p}
          className="textani"
          sx={{
            fontSize: { xs: "65px", md: "100px" },
            color: "#171717",
            fontFamily: theme.fonts.logo,
            width: { xs: "100%", md: "auto" },
            textAlign: { xs: "center", md: "left" },
          }}
          transition={{
            duration: 1,
            type: "spring",
          }}
          initial={{
            opacity: 0,
            translateY: "80%",
          }}
          whileInView={{
            opacity: 1,
            translateY: "0%",
          }}
          viewport={{ once: true }}
        >
          We
        </Typography>

        <Typography
          component={motion.p}
          transition={{
            duration: 1,
            type: "spring",
            delay: 0.4,
          }}
          initial={{
            opacity: 0,
            translateY: "80%",
          }}
          whileInView={{
            opacity: 1,
            translateY: "0%",
          }}
          viewport={{ once: true }}
          className="textani"
          sx={{
            fontSize: { xs: "65px", md: "100px" },
            color: "#171717",
            fontFamily: theme.fonts.logo,
            width: { xs: "100%", md: "auto" },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          &nbsp;make&nbsp;
        </Typography>
        <Stack
          sx={{
            position: "relative",
          }}
        >
          <Typography
            component={motion.p}
            transition={{
              duration: 1,
              type: "spring",
              delay: 0.8,
            }}
            initial={{
              opacity: 0,
              translateY: "80%",
            }}
            whileInView={{
              opacity: 1,
              translateY: "0%",
            }}
            viewport={{ once: true }}
            className="textani"
            sx={{
              fontSize: { xs: "65px", md: "100px" },
              color: "#171717",
              fontFamily: theme.fonts.logo,
            }}
          >
            relations
          </Typography>
          <Box
            component={Lottie}
            autoplay={false}
            animationData={BorderAnimation}
            loop={false}
            lottieRef={AnimationRef}
            style={{
              width: "120%",
            }}
            sx={{
              position: "absolute",
              top: { xs: "-38px", md: "-48px" },
              left: { xs: "-37px", md: "-47px" },
              right: "0",
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
