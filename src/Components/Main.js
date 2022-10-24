import { Stack, Box, Container, Menu, Avatar, Button } from "@mui/material";
import { motion } from "framer-motion";
import { theme } from "../Theme/NewTheme";
import Timeline from "./User/Timeline";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import axios from "axios";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import humans from "../Lottie/lf30_editor_4mz9k1sr.json";
import SearchUsers from "./User/Search";
import { BiUserPin } from "react-icons/bi";
import UserProfile from "./User/UserProfile";
let firstTime = true;
axios.defaults.withCredentials = true;
export default function Main({ Signed, setSigned }) {
  const [fetchP, setFetch] = useState(false);
  const [ShowNav, SetNav] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentuser, setCurrent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const opendelection = Boolean(anchorEl);
  const handleClickdelection = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosedelection = () => {
    setAnchorEl(null);
  };
  const [user, setUser] = useState(null);
  const [loaded, setloaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const getUser = async () => {
    await axios
      .get("https://ytrouty-app-api.onrender.com/users/user", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setSigned((prev) => true);
        } else {
          setSigned((prev) => false);
          navigate("/Register");
        }
      });
  };
  const refresh = async () => {
    await axios
      .get("https://ytrouty-app-api.onrender.com/users/refresh", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setSigned((prev) => true);
        } else {
          setSigned((prev) => false);
          navigate("/Register");
        }
      });
  };
  useEffect(() => {
    if (firstTime) {
      firstTime = false;
      getUser();
    }
    const interval = setInterval(() => {
      refresh();
    }, 5000);
    return () => clearInterval(interval);
  }, [location]);
  const Logout = async () => {
    await axios.post("https://ytrouty-app-api.onrender.com/users/logout").then((res) => {
      setAnchorEl(null);
      setUser(null);
      setSigned((prev) => false);
      navigate("/");
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setloaded(true);
    }, 5000);
  });
  const GetProfile = async () => {
    await axios
      .get(`https://ytrouty-app-api.onrender.com/users/${user.id}`)
      .then((res) => setCurrent(res.data))
      .finally(() => {
        setOpen(true);
        setAnchorEl(null);
      });
  };
  return !Signed ? (
    <Navigate to="/Register" />
  ) : (
    <Box
      sx={{
        overflowX: "hidden",
        " .MuiTypography-root": {
          margin: "10px",
        },
        position: "relative",
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{ duration: 0.2 }}
    >
      <Container
        sx={{
          position: {xs:"relative",md:"sticky"},
          top: "0",
          backgroundColor: "#171717",
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
          <Stack direction="row" alignItems="center" spacing="5px">
            {user && ShowNav && <SearchUsers setFetch={setFetch} currentuser={user} />}
            {user && ShowNav && (
              <Avatar
                component={Button}
                alt="Cindy Baker"
                src={user.avatar}
                sx={{
                  width: "48px",
                  height: "48px",
                  cursor: "pointer",
                  "&.MuiButton-root": {
                    padding: "0px",
                    minWidth: "48px",
                  },
                }}
                onClick={handleClickdelection}
              />
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={opendelection}
              onClose={handleClosedelection}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{
                "& .MuiPaper-elevation": {
                  width: "103px",
                },
              }}
            >
              <Box
                component={Button}
                color="black"
                onClick={GetProfile}
                startIcon={<BiUserPin color="black" />}
                sx={{
                  fontFamily: theme.fonts.heading,
                  fontWeight: "500",
                  textTransform: "none",
                  fontSize: "13px",
                }}
              >
                Profile
              </Box>
              <Box
                component={Button}
                color="black"
                onClick={Logout}
                startIcon={<RiLogoutBoxLine color="black" />}
                sx={{
                  fontFamily: theme.fonts.heading,
                  fontWeight: "500",
                  textTransform: "none",
                  fontSize: "13px",
                }}
              >
                Log out
              </Box>
            </Menu>
            <UserProfile
              user={currentuser}
              open={open}
              setOpen={setOpen}
              currentuser={currentuser}
              RefetchName={setFetch}
            />
          </Stack>
        </Stack>
      </Container>
      {loaded ? (
        <Timeline
          user={user}
          setUser={setUser}
          setSigned={setSigned}
          SetNav={SetNav}
          fetchP={fetchP}
          setFetch={setFetch}
        />
      ) : (
        <Stack
          width="100%"
          height="100%"
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            component={Lottie}
            animationData={humans}
            style={{ width: "400px" }}
          />
        </Stack>
      )}
    </Box>
  );
}
