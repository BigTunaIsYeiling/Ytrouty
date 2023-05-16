import { Container, Stack, Typography, Box, Link } from "@mui/material";
import { motion } from "framer-motion";
import { theme } from "../../Theme/NewTheme";
import { GrTwitter } from "react-icons/gr";
import { RiLinkedinFill, RiFacebookFill } from "react-icons/ri";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
export default function Footer() {
  return (
    <Stack
      overflow="hidden"
      sx={{ marginTop: { xs: "300px", md: "550px" }, paddingBottom: "30px" }}
      position="relative"
    >
      <Container maxWidth="lg">
        <Stack directrion="column" spacing="100px">
          <Stack
            alignItems={{ xs: "flex-start", md: "center" }}
            sx={{
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Stack directrion="column">
              <Typography
                fontWeight="300"
                fontFamily={theme.fonts.logo}
                fontSize="15px"
                component={motion.p}
                initial={{
                  opacity: 0,
                  translateX: "-40%",
                }}
                whileInView={{
                  opacity: 1,
                  translateX: "0%",
                }}
                transition={{ type: "spring", duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Design by
              </Typography>
              <Typography
                fontWeight="500"
                fontFamily={theme.fonts.logo}
                fontSize={{ xs: "51px", md: "80px" }}
                className="tran"
                color="white"
                component={motion.p}
                initial={{
                  opacity: 0,
                  translateX: "-50%",
                }}
                whileInView={{
                  opacity: 1,
                  translateX: "0%",
                }}
                transition={{ type: "spring", duration: 1, delay: 0.1 }}
                viewport={{ once: true }}
              >
                BT
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              marginLeft={{ xs: "0", md: "auto" }}
              marginRight={{ xs: "0", md: "0" }}
              spacing="20px"
              marginTop={{ xs: "50px", md: "0px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
                component={motion.div}
                initial={{
                  opacity: 0,
                  translateY: "100%",
                }}
                whileInView={{
                  opacity: 1,
                  translateY: "0%",
                }}
                transition={{ type: "spring", duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Box
                  component={Link}
                  href="https://twitter.com/Tamkt69"
                  underline="none"
                  target="_blank"
                >
                  <GrTwitter color="black" size="30px" />
                </Box>
              </Box>
              <Box
                component={motion.div}
                initial={{
                  opacity: 0,
                  translateY: "100%",
                }}
                whileInView={{
                  opacity: 1,
                  translateY: "0%",
                }}
                transition={{ type: "spring", duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              >
                <Box
                  component={Link}
                  href="https://www.linkedin.com/in/ahmed-anany-0b728b234/"
                  underline="none"
                  target="_blank"
                >
                  <RiLinkedinFill color="black" size="30px" />
                </Box>
              </Box>
              <Box
                component={motion.div}
                initial={{
                  opacity: 0,
                  translateY: "100%",
                }}
                whileInView={{
                  opacity: 1,
                  translateY: "0%",
                }}
                transition={{ type: "spring", duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              >
                <Box
                  component={Link}
                  href="https://www.facebook.com/profile.php?id=100070965120291"
                  target="_blank"
                  underline="none"
                >
                  <Typography
                    color="black"
                    fontSize="30px"
                    fontFamily={theme.fonts.logo}
                    fontWeight="600"
                  >
                    <RiFacebookFill color="black" size="30px" />
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Stack>
          <Typography
            fontWeight="300"
            fontFamily={theme.fonts.logo}
            fontSize="15px"
            width={{ xs: "80%", md: "100%" }}
            component={motion.p}
            initial={{
              opacity: 0,
              translateX: "-50%",
            }}
            whileInView={{
              opacity: 1,
              translateX: "0%",
            }}
            transition={{ type: "spring", duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <AiOutlineCopyrightCircle color="white" /> 2022 production, All
            Rights Reserved , Non-commercial project
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}
