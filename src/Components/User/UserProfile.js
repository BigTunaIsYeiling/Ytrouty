import { Avatar, Box, Dialog, IconButton, Stack } from "@mui/material";
import { theme } from "../../Theme/NewTheme";
import { RiCloseFill } from "react-icons/ri";
import UserPosts from "./UserPosts";
export default function UserProfile({
  open,
  setOpen,
  user,
  currentuser,
  RefetchName,
}) {
  const closedia = () => {
    RefetchName((prev) => false);
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={closedia}
      fullWidth={true}
      sx={{
        " .MuiPaper-root": {
          backgroundColor: "black",
        },
      }}
    >
      <Stack direction="column" width="100%" position={"relative"}>
        <Box
          component={IconButton}
          onClick={closedia}
          color="black"
          bgcolor="black"
          sx={{
            position: "absolute",
            top: "1px",
            right: "5px",
            ":hover": {
              backgroundColor: "black",
            },
          }}
        >
          <RiCloseFill color="white" />
        </Box>
        <Stack direction="column" alignSelf={"center"} alignItems="center">
          {user && (
            <Avatar
              alt="hj hj"
              sx={{ height: "70px", width: "70px" }}
              src={user.avatar}
            />
          )}
          {user && (
            <Box
              component="p"
              color="white"
              fontSize={"17px"}
              fontFamily={theme.fonts.logo}
              fontWeight={"600"}
              marginTop="22px"
            >
              {user.username}
            </Box>
          )}
          <Stack
            direction="row"
            alignItems="center"
            spacing={"22px"}
            marginTop="33px"
          >
            <Stack direction="column" spacing="5px" alignItems={"center"}>
              {user && (
                <Box
                  component="p"
                  color="white"
                  fontSize={"15px"}
                  fontFamily={theme.fonts.heading}
                  fontWeight={"600"}
                >
                  Liked Posts
                </Box>
              )}
              {user && (
                <Box
                  component="p"
                  color="white"
                  fontSize={"15px"}
                  fontFamily={theme.fonts.heading}
                >
                  {user.likedPosts}
                </Box>
              )}
            </Stack>
            <Stack direction="column" spacing="5px" alignItems={"center"}>
              {user && (
                <Box
                  component="p"
                  color="white"
                  fontSize={"17px"}
                  fontFamily={theme.fonts.heading}
                  fontWeight={"600"}
                >
                  All Posts
                </Box>
              )}
              {
                <Box
                  component="p"
                  color="white"
                  fontSize={"17px"}
                  fontFamily={theme.fonts.heading}
                >
                  {user && user.userPosts}
                </Box>
              }
            </Stack>
            <Stack direction="column" spacing="5px" alignItems={"center"}>
              {user && (
                <Box
                  component="p"
                  color="white"
                  fontSize={"15px"}
                  fontFamily={theme.fonts.heading}
                  fontWeight={"600"}
                >
                  Comments
                </Box>
              )}
              {
                <Box
                  component="p"
                  color="white"
                  fontSize={"15px"}
                  fontFamily={theme.fonts.heading}
                >
                  {user && user.Comments}
                </Box>
              }
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          width="100%"
          marginTop="50px"
          paddingBottom={"50px"}
          alignItems={"center"}
        >
          {user &&
            (user.userPosts > 0 ? (
              <UserPosts currentuser={currentuser} id={user.id} />
            ) : (
              <Box
                component="p"
                color="white"
                fontSize={"20px"}
                fontFamily={theme.fonts.heading}
                fontWeight={"600"}
                textAlign="center"
              >
                No Posts To Preview
              </Box>
            ))}
        </Stack>
      </Stack>
    </Dialog>
  );
}
