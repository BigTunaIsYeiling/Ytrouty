import Comments from "./Comments";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import {
  Stack,
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Collapse,
  Menu,
  TextareaAutosize,
  Tooltip,
} from "@mui/material";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillDelete,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { BiReply } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { theme } from "../../Theme/NewTheme";
export default function Post({
  postId,
  userAvatar,
  body,
  userId,
  username,
  PostTime,
  comments,
  likes,
  user,
  setFetch,
  media,
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
  const [expanded, setExpanded] = useState(false);
  const [arabicPost, setalignPost] = useState(false);
  const [arabiccomment, setaligncomment] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const deletePost = async () => {
    await axios
      .delete(`https://vast-red-prawn-sari.cyclic.app/posts/${postId}`)
      .then(() =>
        setTimeout(() => {
          setFetch((prev) => false);
        }, 2000)
      )
      .finally(setOpen(false));
  };
  const likepost = async () => {
    await axios
      .post(`https://vast-red-prawn-sari.cyclic.app/posts/like/${postId}`)
      .finally(setFetch((prev) => false));
  };
  const [formComment, setform] = useState({
    body: "",
  });
  const handelchange = (e) => {
    setform((prev) => {
      return { ...prev, body: e.target.value };
    });
  };
  const addComment = async () => {
    await axios
      .post(
        `https://vast-red-prawn-sari.cyclic.app/posts/comment/${postId}`,
        formComment
      )
      .finally(setFetch((prev) => false));
    setform((prev) => {
      return { ...prev, body: "" };
    });
  };
  useEffect(() => {
    const postliked = likes.some((like) => like.userId === user.id);
    if (postliked) {
      setLikes((prev) => true);
    } else {
      setLikes((prev) => false);
    }
  }, [likes]);
  useEffect(() => {
    let regExp = /[\u0600-\u06FF]/g;
    let test = regExp.test(body.trim().charAt(0));
    setalignPost(test);
  });

  useEffect(() => {
    let regExp = /[\u0600-\u06FF]/g;
    let test = regExp.test(formComment.body.trim().charAt(0));
    setaligncomment(test);
  });
  return (
    <Stack direction="column" width="100%" spacing="20px">
      <Stack
        direction="column"
        alignItems="flex-start"
        width="100%"
        sx={{
          backgroundColor: "#242526",
          borderRadius: { xs: "9px", md: "8px" },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          paddingX="10px"
          paddingTop="10px"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing="7px"
          >
            <Avatar
              sx={{ width: "55px", height: "55px" }}
              alt="Cindy Baker"
              src={userAvatar}
            />

            <Stack direction="column" alignItems="flex-start">
              <Box
                component="p"
                sx={{
                  color: "white",
                  marginLeft: "10px",
                  fontFamily: theme.fonts.logo,
                  fontSize: "14px",
                }}
              >
                {username}
              </Box>
              <Box
                component="p"
                sx={{
                  color: "white",
                  marginLeft: "10px",
                  fontFamily: theme.fonts.logo,
                  fontSize: "11px",
                  opacity: "0.7",
                }}
              >
                <ReactTimeAgo
                  date={Date.parse(PostTime)}
                  timeStyle="round"
                  locale="en-US"
                />
              </Box>
            </Stack>
          </Stack>
          {user && user.id === userId && (
            <Box
              component={IconButton}
              color="white"
              sx={{ width: "37px", cursor: "pointer" }}
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
              startIcon={<AiFillDelete color="#B91646" />}
              sx={{
                fontFamily: theme.fonts.default,
                fontWeight: "500",
                textTransform: "none",
                fontSize: "13px",
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
                Are You Going to delete this Post ?
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
                  onClick={deletePost}
                >
                  <AiOutlineCheck color="#367E18" />
                </Box>
              </Stack>
            </Box>
          </Modal>{" "}
        </Stack>
        <Stack width="100%" marginY="26px">
          <Box
            component="p"
            dir={arabicPost ? "rtl" : "ltr"}
            sx={{
              color: "white",
              marginLeft: "10px",
              fontFamily: arabicPost ? theme.fonts.arabic : theme.fonts.logo,
              fontSize: "18px",
              opacity: "1",
              textAlign: arabicPost ? "right" : "left",
              whiteSpace: "pre-line",
              lineHeight: "36px",
              marginX: "10px",
            }}
          >
            {body}
          </Box>
          {media && (
            <Stack width="100%">
              {media.photo && (
                <Box
                  component="img"
                  src={media.photo.url}
                  width="100%"
                  height="auto"
                  maxHeight="550px"
                />
              )}
              {media.video && (
                <Box
                  component="video"
                  width="100%"
                  height="auto"
                  maxHeight="550px"
                  controls
                  autoPlay={false}
                  muted
                >
                  <source src={media.video.url} />
                </Box>
              )}
            </Stack>
          )}
        </Stack>
        <Box paddingX="10px" width="100%" paddingBottom="10px">
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            sx={{ backgroundColor: "#18191a", borderRadius: "15px" }}
            paddingY="5px"
          >
            <Stack direction="row" alignItems="center">
              <Box
                component={IconButton}
                color={like ? "red" : "white"}
                sx={{ width: "37px" }}
                onClick={likepost}
              >
                {!like ? (
                  <AiOutlineHeart
                    color="white"
                    style={{ transition: "0.5s" }}
                  />
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
            <Stack direction="row" alignItems="center">
              <Box
                component="p"
                sx={{
                  color: "white",
                  fontFamily: theme.fonts.logo,
                  fontSize: "13px",
                }}
              >
                {comments.length}
              </Box>
              <Box
                component={IconButton}
                onClick={handleExpandClick}
                color="white"
                sx={{ width: "37px" }}
              >
                <BiReply color="white" />
              </Box>
            </Stack>
          </Stack>
        </Box>
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          sx={{
            width: "100%",
            marginTop: "20px",
            paddingX: "10px",
            paddingBottom: "10px",
          }}
        >
          <Stack
            direction="column"
            width="100%"
            sx={{ backgroundColor: "#242526" }}
            spacing="10px"
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              width="100%"
              sx={{
                backgroundColor: "#242526",
                borderRadius: { xs: "0px", md: "8px" },
              }}
              spacing="14px"
              padding="6px"
            >
              {user && <Avatar alt="Cindy Baker" src={user.avatar} />}
              <Box position="relative" width="100%" overflow="hidden">
                <Button
                  sx={{
                    backgroundColor: "#18191a",
                    color: "black",
                    fontFamily: theme.fonts.default,
                    height: "91%",
                    position: "absolute",
                    right: "0",
                    minWidth: "40px",
                    "&:hover": {
                      backgroundColor: "#18191a",
                    },
                    borderRadius: "0px 24px 24px 0px",
                  }}
                  onClick={addComment}
                >
                  <IoIosSend size="20px" color="white" />
                </Button>
                <Box
                  component={TextareaAutosize}
                  width="100%"
                  spellCheck="false"
                  sx={{
                    border: "0",
                    outline: "0",
                    padding: "11px",
                    paddingRight: "45px",
                    backgroundColor: "#18191a",
                    color: "white",
                    fontFamily: theme.fonts.arabic,
                    resize: "none",
                    borderRadius: "24px",
                    "&::placeholder": {
                      color: "white",
                      fontSize: "1.1em",
                      fontWeight: "500",
                      fontFamily: theme.fonts.default,
                      opacity: "0.7",
                    },
                    paddingBottom: "15px",
                    fontSize: "15px",
                  }}
                  placeholder="Add Comment..."
                  value={formComment.body}
                  onChange={handelchange}
                  dir={arabiccomment ? "rtl" : "ltr"}
                />
              </Box>
            </Stack>
            <Comments
              comments={comments}
              postId={postId}
              user={user}
              setFetch={setFetch}
            />
          </Stack>
        </Collapse>
      </Stack>
    </Stack>
  );
}
