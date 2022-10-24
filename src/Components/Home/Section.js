import { Container, Stack, Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom"
import { theme } from "../../Theme/NewTheme";
import { Texts } from "../../json/Text";
export default function Section() {
  const navigate=useNavigate()
  return (
    <Container maxWidth="lg" sx={{ marginTop: { xs: "100px", md: "200px" } }}>
    <Box overflow="hidden" position="relative">
      <Stack direction="column" overflow="hidden">
        <Stack
          direction="row"
          justifyContent={{xs:"center",md:"flex-start"}}
          flexWrap="wrap"
          maxWidth={{xs:"100%",md:"75%"}}
          component={motion.div}
          initial={{ opacity: 0, translateY: '100px' }}
          whileInView={{ opacity: 1, translateY: '0px' }}
          transition={{
            duration: 0.8,
            type: "string",
          }}
          viewport={{ once: true }}
          sx={{
            zIndex:"11"
          }}
        >
          {Texts.map((text) => (
            <Typography
              sx={{
                fontSize: { xs: "55px", md: "120px" },
                fontFamily: theme.fonts.logo,
                lineHeight: { xs: "55px", md: "100px" },
              }}
              className={text.class}
              key={text.id}
            >
              {text.text}
            </Typography>
          ))}
        </Stack>
        <Box
          alignSelf={{xs:"center",md:"flex-start"}}
          width={{ xs: "256px", md: "320px" }}
          height={{ xs: "256px", md: "250px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          component={motion.div}
          initial={{ opacity: 0, translateY: "-50%" }}
          whileInView={{ opacity: 1, translateY: "0%" }}
          transition={{ duration: 0.8,type: "string" }}
          viewport={{ once: true }}
          marginLeft={{xs:"0px",md:"50px"}}
          marginTop={{xs:"40px",md:"120px"}}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            width={{ xs: "220px", md: "280px" }}
            height={{ xs: "220px", md: "280px" }}
            position="relative"
          >
            <Stack
              component={Button}
              alignItems="center"
              onClick={()=> navigate("/Register")}
              justifyContent="center"
              sx={{
                backgroundColor: "#ffdf00",
                width: { xs: "180px", md: "220px" },
                height: { xs: "180px", md: "220px" },
                maxWidth: { xs: "180px", md: "220px" },
                maxHeight: { xs: "180px", md: "220px" },
                borderRadius: "100%",
                overflow: "hidden",
                transition: "all ease-in-out 0.2s",
                cursor: "pointer",
                textTransform: "none",
                ":hover": {
                  width: { xs: "155px", md: "180px" },
                  height: { xs: "155px", md: "180px" },
                  backgroundColor: "#ffdf00",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "50px", md: "65px" },
                  color: "black",
                  whiteSpace: "nowrap",
                  fontFamily: theme.fonts.heading,
                  zIndex: "2",
                }}
              >
                Get Started
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: { xs: "50px", md: "65px" },
                color: "white",
                whiteSpace: "nowrap",
                fontFamily: theme.fonts.heading,
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                zIndex: "1",
              }}
            >
              Get Started
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Box component={motion.img} src={require("./sec.jpg")} sx={{
        position:"absolute",
        right:"0",
        top:"0",
        maxWidth:"60%",
        zIndex:"10",
        filter:"blur(2px)  saturate(1)",
        display:{xs:"none",md:"block"}
      }}
      initial={{ opacity: 0}}
      whileInView={{ opacity: 1}}
      transition={{ duration: 0.8, type: "string" }}
      viewport={{ once: true }}
      />
      </Box>
    </Container>
  );
}
