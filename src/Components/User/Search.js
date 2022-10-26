import { Box, Dialog, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { theme } from "../../Theme/NewTheme";
import axios from "axios";
import UserList from "./UserList";
export default function SearchUsers({ currentuser,setFetch }) {
  const [openDia, setOpenDia] = useState(false);
  const [users, setusers] = useState(null);
  const [FilteredUsers, setFilteredUsers] = useState([]);
  const [firstrn, setrn] = useState(true);
  const [userSRH, setsearch] = useState("");
  const handleClickOpen = () => {
    setOpenDia(true);
  };
  const handleCloseDia = () => {
    setOpenDia(false);
  };
  useEffect(() => {
    if (firstrn) {
      axios
        .get("https://vast-red-prawn-sari.cyclic.app/users/")
        .then((res) => {
          setusers(res.data.users);
        })
        .finally(setrn(false));
    }
  });
  const onchangeSearch = (e) => {
    setsearch(e.target.value);
  };
  useEffect(() => {
    if (userSRH !== "") {
      var filter = new RegExp(userSRH, "i");
      setFilteredUsers(
        users.filter((user) => {
          return user.username.match(filter);
        })
      );
    }
  }, [userSRH]);
  return (
    <Box>
      <Box component={IconButton} color="white" onClick={handleClickOpen}>
        <MdPersonSearch color="white" size="30px" />
      </Box>
      <Dialog
        open={openDia}
        onClose={handleCloseDia}
        fullWidth={true}
        sx={{
          " .MuiPaper-root": {
            backgroundColor: "black",
          },
        }}
      >
        <Stack
          direction="column"
          padding="10px"
          paddingY={"17px"}
          spacing="25px"
        >
          <Stack direction="row" alignItems={"center"} width="100%">
            <Box component={FiSearch} color="white" size="40px" />
            <Box
              component="input"
              onChange={onchangeSearch}
              marginLeft="4px"
              sx={{
                outline: "none",
                border: "none",
                backgroundColor: "transparent",
                fontFamily: theme.fonts.heading,
                color: "white",
              }}
              placeholder="Search User...."
              spellCheck="false"
              width={"70%"}
            />
            <Box
              component={IconButton}
              color="white"
              onClick={handleCloseDia}
              marginLeft="auto"
            >
              <IoClose color="white" size="24px" />
            </Box>
          </Stack>
          <Stack
            direction="column"
            alignItems={"flex-start"}
            sx={{
              height: "170px",
              overflowX: "hidden",
              overflowY: "scroll",
            }}
            spacing="17px"
          >
            {users &&
              (userSRH === ""
                ? users.map((user, i) => {
                    return (
                      <UserList
                        key={i}
                        avatar={user.avatar.url}
                        username={user.username}
                        id={user._id}
                        setOpenDia={setOpenDia}
                        currentuser={currentuser}
                        setFetch={setFetch}
                      />
                    );
                  })
                : FilteredUsers !== [] &&
                  FilteredUsers.map((user, i) => {
                    return (
                      <UserList
                        key={i}
                        avatar={user.avatar.url}
                        username={user.username}
                        id={user._id}
                        setOpenDia={setOpenDia}
                        currentuser={currentuser}
                        setFetch={setFetch}
                      />
                    );
                  }))}
          </Stack>
        </Stack>
      </Dialog>
    </Box>
  );
}
