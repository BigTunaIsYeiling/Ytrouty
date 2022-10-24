import { Avatar, Box, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { theme } from "../../Theme/NewTheme";
import UserProfile from "./UserProfile";
import { BiSubdirectoryRight } from "react-icons/bi";
import axios from "axios";
export default function UserList({
  avatar,
  username,
  id,
  setOpenDia,
  currentuser,
  setFetch,
}) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const GetProfile = async () => {
    await axios
      .get(`https://ytrouty-app-api.onrender.com/users/${id}`)
      .then((res) => setUser(res.data))
      .finally(setOpen(true));
  };
  return (
    <Stack direction="row" alignItems="center" width="100%" paddingX={"30px"}>
      <Avatar
        alt="Cindy Baker"
        src={avatar}
        sx={{
          width: "45px",
          height: "45px",
        }}
      />
      <Box
        component="p"
        sx={{
          color: "white",
          fontFamily: theme.fonts.logo,
          fontSize: "13px",
        }}
        marginLeft="10px"
      >
        {username}
      </Box>
      <Box
        component={IconButton}
        sx={{
          backgroundColor: "#18191a",
          color: "white",
          ":hover": {
            backgroundColor: "#18191a",
          },
          marginLeft: "auto",
        }}
        onClick={GetProfile}
      >
        <BiSubdirectoryRight color="white" size={"24px"} />
      </Box>
      <UserProfile
        user={user}
        open={open}
        setOpen={setOpen}
        currentuser={currentuser}
        RefetchName={setFetch}
      />
    </Stack>
  );
}
