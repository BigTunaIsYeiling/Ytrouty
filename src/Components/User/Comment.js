import {
  Stack,
  Avatar,
  Box,
  IconButton,
  Modal,
  Menu,
  Button,
  Tooltip,
} from "@mui/material";
import { theme } from "../../Theme/NewTheme";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
export default function Comment({
  avater,
  username,
  body,
  time,
  likes,
  user,
  postId,
  userId,
  commentID,
  setFetch,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const opendelection = Boolean(anchorEl);
  const handleClickdelection = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosedelection = () => {
    setAnchorEl(null);
  };
  const [like, setLikes] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [arabic, setalign] = useState(false);
  useEffect(() => {
    let regExp = /[\u0600-\u06FF]/g;
    let test = regExp.test(body.trim().charAt(0));
    setalign(test);
  });
  useEffect(() => {
    const postliked = likes.some((like) => like.userId === user.id);
    if (postliked) {
      setLikes((prev) => true);
    } else {
      setLikes((prev) => false);
    }
  }, [likes]);
  const likeComment = async () => {
    await axios
      .post(`https://ytrouty-app-api.onrender.com/posts/comment/${postId}/${commentID}`)
      .finally(setFetch((prev) => false));
  };
  const deleteComment = async () => {
    await axios
      .delete(`https://ytrouty-app-api.onrender.com/posts/comment/${postId}/${commentID}`)
      .then(setOpen(false))
      .finally(setFetch((prev) => false));
  };
  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      justifyContent="flex-start"
      width="100%"
      sx={{
        backgroundColor: "#242526",
        borderRadius: { xs: "0px", md: "8px" },
      }}
      padding="6px"
    >
      <Avatar alt="Cindy Baker" src={avater} />
      <Stack direction="column">
        <Stack
          direction="column"
          alignItems="flex-start"
          maxWidth="100%"
          padding="8px"
          sx={{
            backgroundColor: "#18191a",
            borderRadius: "20px",
            marginX: "10px",
          }}
        >
          <Stack
            direction="column"
            width="auto"
            maxWidth="100%"
            sx={{
              padding: "6px 30px 5px 10px",
            }}
            spacing="5px"
          >
            <Stack direction="row" alignItems="center">
              <Box
                component="p"
                sx={{
                  color: "white",
                  fontFamily: theme.fonts.logo,
                  fontSize: "13px",
                  opacity: "0.9",
                }}
              >
                {username}
              </Box>
              <GoPrimitiveDot color="yellow" />

              <Box
                component="p"
                sx={{
                  color: "white",
                  fontFamily: theme.fonts.logo,
                  fontSize: "13px",
                  opacity: "0.8",
                  whiteSpace: "nowrap",
                }}
              >
                <ReactTimeAgo
                  date={Date.parse(time)}
                  timeStyle="twitter"
                  locale="en-US"
                />
              </Box>
            </Stack>
            <Box
              component="p"
              sx={{
                color: "white",
                fontSize: "15px",
                opacity: "1",
                fontFamily: arabic ? theme.fonts.arabic : theme.fonts.logo,
                textAlign: arabic ? "right" : "left",
                whiteSpace: "pre-line",
                lineHeight: "27px",
              }}
              dir={arabic ? "rtl" : "ltr"}
            >
              {body}
            </Box>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          alignSelf="flex-end"
          sx={{
            backgroundColor: "#18191a",
            padding: "0px 6px 0px 1px",
            borderRadius: "30%",
            margin: "3px 7px 0px 0px",
          }}
        >
          <Box
            component={IconButton}
            color={like ? "red" : "white"}
            sx={{ width: "37px" }}
            onClick={likeComment}
          >
            {" "}
            {!like ? (
              <AiOutlineHeart color="white" style={{ transition: "0.5s" }} />
            ) : (
              <AiFillHeart color="red" style={{ transition: "0.5s" }} />
            )}
          </Box>
            <Tooltip
              disableHoverListener={likes.length < 1}
              title={
                <Stack direction="column" alignItems="center">
                  {likes.map((like, i) => (
                    <Box
                      component="p"
                      sx={{
                        color: "white",
                        marginLeft: "4px",
                        fontFamily: theme.fonts.logo,
                        fontSize: "13px",
                      }}
                      key={i}
                    >
                      {like.username}
                    </Box>
                  ))}
                </Stack>
              }
            >
              <Box
                component="p"
                sx={{
                  color: "white",
                  marginLeft: "4px",
                  fontFamily: theme.fonts.logo,
                  fontSize: "13px",
                  cursor: likes.length < 1 ? "text" : "pointer",
                }}
              >
                {likes.length}
              </Box>
            </Tooltip>
        </Stack>
      </Stack>
      {user && user.id === userId && (
        <Box
          component={IconButton}
          color="white"
          sx={{ width: "37px", cursor: "pointer", marginLeft: "auto" }}
          onClick={handleClickdelection}
        >
          <BsThreeDots color="white" />
        </Box>
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
            width: "90px",
          },
        }}
      >
        <Box
          component={Button}
          color="black"
          onClick={handleOpen}
          startIcon={<RiDeleteBin2Line color="#B91646" />}
          sx={{
            fontFamily: theme.fonts.default,
            fontWeight: "500",
          }}
        >
          Delete
        </Box>
      </Menu>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            backgroundColor: "white",
            color: "black",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "25px",
            borderRadius: "3px",
            display: "flex",
            flexDirection: "column",
            width: { xs: "95%", sm: "60%", md: "41%" },
          }}
        >
          <Box
            component="p"
            sx={{
              fontFamily: theme.fonts.logo,
              fontSize: "20px",
            }}
          >
            Are You Going to delete this Comment ?
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            marginTop="17px"
            alignSelf="flex-end"
          >
            <Box
              component={IconButton}
              color="#CC3636"
              sx={{ width: "37px" }}
              onClick={handleClose}
            >
              <AiOutlineClose color="#CC3636" />
            </Box>
            <Box
              component={IconButton}
              color="#367E18"
              sx={{ width: "37px" }}
              onClick={deleteComment}
            >
              <AiOutlineCheck color="#367E18" />
            </Box>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}
