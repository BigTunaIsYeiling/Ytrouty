import {
  Stack,
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Collapse,
  Dialog,
  useTheme,
  useMediaQuery,
  TextareaAutosize,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";
import { BsCameraFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineSave,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import { MdOutlinePermMedia } from "react-icons/md";
import { theme } from "../../Theme/NewTheme";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export default function Timeline({
  user,
  setUser,
  setSigned,
  SetNav,
  fetchP,
  setFetch,
}) {
  const [video, setread] = useState(null);
  const regexp = /^data:video/;
  const navigate = useNavigate();
  const them = useTheme();
  const fullScreen = useMediaQuery(them.breakpoints.down("md"));
  const [showPass, setPass] = useState(false);
  const [showPassC, setPassC] = useState(false);
  const [openDia, setOpenDia] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [confirmpass, setConfirm] = useState("");
  const [rev, setRev] = useState(null);
  const [rev1, setRev1] = useState(null);
  const [avatarImage, setavatarImage] = useState(null);
  const [PostMedia, setPostMedia] = useState(null);
  const [spin, setspin] = useState(false);
  const [spin1, setspin1] = useState(false);
  const [removemedia, setremovemedia] = useState(false);
  const setfilebase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setRev(reader.result);
    };
  };
  const setfilebasePost = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setRev1(reader.result);
      if (regexp.test(reader.result)) {
        setread(true);
      } else {
        setread(false);
      }
    };
  };
  const handleimage = (e) => {
    setavatarImage((prev) => e.target.files[0]);
    setfilebase(e.target.files[0]);
  };
  const handlePostMedia = (e) => {
    setPostMedia((prev) => e.target.files[0]);
    setfilebasePost(e.target.files[0]);
    setremovemedia(true);
  };
  const handleClickOpen = () => {
    setOpenDia(true);
  };

  const handleCloseDia = () => {
    setOpenDia(false);
  };
  const [postform, setPost] = useState({
    body: "",
  });
  const [arabic, setalign] = useState(false);
  useEffect(() => {
    let regExp = /[\u0600-\u06FF]/g;
    let test = regExp.test(postform.body.trim().charAt(0));
    setalign(test);
  });
  const handelchange = (e) => {
    setPost((prev) => {
      return { ...prev, body: e.target.value };
    });
  };
  const [openDE, setOpenDE] = useState(false);
  const handleOpenDE = () => setOpenDE(true);
  const handleCloseDE = () => setOpenDE(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const AddPost = async (e) => {
    e.preventDefault();
    setspin(true);
    setremovemedia(false);
    const formdata = new FormData();
    formdata.append("body", postform.body);
    formdata.append("postmedia", PostMedia);
    await axios
      .post("https://ytrouty-app-api.onrender.com/posts/", formdata)
      .then((res) => {
        if (res.status === 200) {
          setspin(false);
        }
      })
      .catch((err) => {
        setspin(false);
        err.response.data.errors.map((error, i) => {
          return toast.error(error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
        });
      })
      .finally(() => {
        setTimeout(() => {
          setFetch(false);
        }, 2000);
      });
    setPost((prev) => {
      return { ...prev, body: "" };
    });
    setRev1(null);
    setPostMedia(null);
  };
  const onChangeform = async (e) => {
    e.preventDefault();
    setspin1(true);
    const formdata = new FormData();
    formdata.append("newPassword", newPassword);
    formdata.append("newUsername", newUsername);
    formdata.append("confirmpass", confirmpass);
    formdata.append("avatarImage", avatarImage);
    await axios
      .put("https://ytrouty-app-api.onrender.com/users/update", formdata)
      .then(async (res) => {
        if (res.status === 200) {
          setspin1(false);
          setUser(res.data);
          setOpenDia(false);
          setFetch(false);
        }
      })
      .catch((err) => {
        err.response.data.errors.map((error, i) => {
          return toast.error(error, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
        });
        setspin1(false);
      });
  };
  const DeleteUser = async () => {
    await axios
      .delete("https://ytrouty-app-api.onrender.com/users/deleteAccount")
      .then((res) => {
        if (res.status == 200) {
          setUser(null);
          setSigned(false);
        }
      })
      .finally(navigate("/"));
  };
  const destroyPostMedia = () => {
    setRev1((prev) => null);
    setPostMedia((prev) => null);
    setremovemedia(false);
  };
  return (
    <Stack
      spacing="100px"
      height="100%"
      width="100%"
      position="relative"
      alignItems="center"
      sx={{
        " div.Toastify": {
          margin: "0px",
        },
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        width={{ xs: "85%", sm: "70%", md: "45%", xl: "35%" }}
        paddingX={{ xs: "0px", sm: "30px" }}
        spacing="20px"
        paddingBottom={{ xs: "1px", md: "10px" }}
      >
        <Stack
          direction="column"
          alignItems="flex-start"
          width="100%"
          sx={{
            backgroundColor: "#242526",
            borderRadius: { xs: "0px", md: "8px" },
          }}
          spacing="15px"
          component={motion.div}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.5,
              type: "spring",
            },
          }}
          onAnimationComplete={() => SetNav(true)}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            paddingX="10px"
            paddingTop="10px"
            paddingBottom={openDia ? "0px" : "10px"}
          >
            <Stack direction="row" alignItems="center" spacing="11px">
              {user && (
                <Avatar
                  component={Button}
                  alt="Cindy Baker"
                  src={user.avatar}
                  sx={{
                    width: "60px",
                    height: "60px",
                    cursor: "pointer",
                    "&.MuiButton-root": {
                      padding: "0px",
                    },
                  }}
                  onClick={handleClickOpen}
                />
              )}
              <Stack direction="column" alignItems="center" spacing="2px">
                <Box
                  component="p"
                  sx={{
                    color: "white",
                    fontFamily: theme.fonts.logo,
                    fontSize: "13px",
                  }}
                >
                  {user && user.username}
                </Box>
                <Box
                  component="p"
                  sx={{
                    color: "white",
                    fontFamily: theme.fonts.logo,
                    fontSize: "11px",
                    opacity: "0.7",
                  }}
                >
                  {user && user.email}
                </Box>
              </Stack>
            </Stack>
            <Button
              sx={{
                backgroundColor: "#18191a",
                color: "white",
                ":hover": {
                  backgroundColor: "#18191a",
                },
                fontFamily: theme.fonts.logo,
              }}
              endIcon={!expanded ? <AiOutlinePlus /> : <AiOutlineMinus />}
              onClick={handleExpandClick}
            >
              Add
            </Button>
          </Stack>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
            sx={{ width: "100%", marginTop: "20px" }}
            component="form"
            encType="multipart/form-data"
          >
            <Stack
              direction="column"
              sx={{
                boxSizing: "border-box",
              }}
            >
              <Box position="relative" width="100%" paddingX="10px">
                <Box
                  component={TextareaAutosize}
                  width="100%"
                  spellCheck="false"
                  sx={{
                    backgroundColor: "transparent",
                    border: "none",
                    "&::placeholder": {
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "400",
                      fontFamily: theme.fonts.heading,
                      opacity: "0.9",
                    },
                    outline: "none",
                    color: "white",
                    fontFamily: theme.fonts.arabic,
                    resize: "none",
                    opacity: "0.9",
                    paddingY: "8px",
                    fontSize: "15px",
                  }}
                  placeholder="Write something..."
                  onChange={handelchange}
                  value={postform.body}
                  dir={arabic ? "rtl" : "ltr"}
                />
              </Box>
              <Box width="100%" position="relative">
                {rev1 && removemedia && (
                  <Box
                    component={IconButton}
                    onClick={destroyPostMedia}
                    color="black"
                    bgcolor="black"
                    sx={{
                      position: "absolute",
                      top: "3px",
                      right: "5px",
                      zIndex: 100,
                      ":hover": {
                        backgroundColor: "black",
                      },
                    }}
                  >
                    <AiOutlineClose color="white" />
                  </Box>
                )}
                {rev1 &&
                  (video ? (
                    <Box
                      component="video"
                      width="100%"
                      height="auto"
                      controls
                      autoPlay={false}
                      muted
                    >
                      <source src={rev1} />
                    </Box>
                  ) : (
                    <Box
                      component="img"
                      src={rev1}
                      width="100%"
                      height="auto"
                      alt="gtaa"
                    />
                  ))}
              </Box>
              <Box paddingX="10px" paddingTop="10px" position="relative">
                <Button
                  onClick={AddPost}
                  disabled={spin}
                  type="submit"
                  sx={{
                    backgroundColor: "#18191a",
                    color: "white",
                    ":hover": {
                      backgroundColor: "#18191a",
                    },
                    fontFamily: theme.fonts.heading,
                    fontWeight: "600",
                    width: "100%",
                    borderRadius: "4px 4px 0px 0px",
                  }}
                >
                  Post
                </Button>
                {spin && (
                  <Box
                    component={CircularProgress}
                    size={27}
                    color="#ffdf00"
                    sx={{
                      position: "absolute",
                      top: "31%",
                      left: "47%",
                      transform: "translate(-50%, 0)",
                    }}
                  />
                )}
              </Box>
              <Stack
                direction="column"
                position="relative"
                overflow="hidden"
                alignSelf="center"
                paddingX="10px"
                paddingBottom="10px"
                width="100%"
              >
                <Button
                  component="label"
                  width="100%"
                  sx={{
                    backgroundColor: "black",
                    fontFamily: theme.fonts.logo,
                    color: "white",
                    ":hover": {
                      backgroundColor: "black",
                    },
                  }}
                >
                  <input
                    hidden
                    accept="image/*,video/*"
                    type="file"
                    onChange={handlePostMedia}
                  />
                  <MdOutlinePermMedia color="white" size="22px" />
                </Button>
              </Stack>
            </Stack>
          </Collapse>
        </Stack>
        <Posts user={user} fetchP={fetchP} setFetch={setFetch} />
      </Stack>
      <Dialog
        open={openDia}
        onClose={handleCloseDia}
        fullWidth={true}
        fullScreen={fullScreen}
        sx={{
          " .MuiPaper-root": {
            backgroundColor: "black",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "3px",
            minHeight: "100%",
          }}
        >
          <Stack
            direction="column"
            width="100%"
            padding="25px"
            spacing="65px"
            component="form"
            encType="multipart/form-data"
            onSubmit={onChangeform}
            height="100%"
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing="11px"
              width="100%"
            >
              <Stack direction="row" alignItems="center" spacing="11px">
                {rev ? (
                  <Avatar
                    alt="Cindy Baker"
                    src={rev}
                    sx={{ width: "60px", height: "60px" }}
                  />
                ) : (
                  user && (
                    <Avatar
                      alt="Cindy Baker"
                      src={user.avatar}
                      sx={{ width: "60px", height: "60px" }}
                    />
                  )
                )}
                <Stack direction="column" alignItems="center" spacing="2px">
                  <Box
                    component="p"
                    sx={{
                      color: "white",
                      fontFamily: theme.fonts.logo,
                      fontSize: "13px",
                    }}
                  >
                    {user && user.username}
                  </Box>
                  <Box
                    component="p"
                    sx={{
                      color: "white",
                      fontFamily: theme.fonts.logo,
                      fontSize: "11px",
                      opacity: "0.7",
                    }}
                  >
                    {user && user.email}
                  </Box>
                </Stack>
              </Stack>
              <IconButton aria-label="upload picture" component="label">
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleimage}
                />
                <BsCameraFill color="white" />
              </IconButton>
            </Stack>
            <Stack direction="row" alignItems="center" width="100%">
              <Box
                component="p"
                width="40%"
                sx={{
                  color: "white",
                  fontFamily: theme.fonts.logo,
                  fontSize: "13px",
                }}
              >
                Change Username :
              </Box>
              <Box
                component="input"
                height="30px"
                width="50%"
                sx={{
                  border: "0",
                  outline: "0",
                  padding: "11px",
                  backgroundColor: "#242526",
                  color: "white",
                  fontFamily: theme.fonts.default,
                  letterSpacing: "1px",
                  transition: "0.5s",
                  fontSize: "13px",
                  borderRadius: "4px",
                  "&::placeholder": {
                    opacity: "0.5",
                  },
                }}
                placeholder={user && user.username}
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </Stack>
            <Stack direction="row" alignItems="flex-start" width="100%">
              <Box
                component="p"
                width="40%"
                sx={{
                  color: "white",
                  fontFamily: theme.fonts.logo,
                  fontSize: "13px",
                }}
              >
                Change Password :
              </Box>
              <Stack
                direction="column"
                alignItems="center"
                spacing="10px"
                width="50%"
              >
                <Box width="100%" position="relative" overflow="hidden  ">
                  <Box
                    component={IconButton}
                    color="white"
                    sx={{
                      position: "absolute",
                      right: "0",
                      zIndex: "100",
                      top: "-5px",
                    }}
                    onClick={() => setPass((prev) => !prev)}
                  >
                    {showPass ? (
                      <Box component={AiFillEyeInvisible} color="white" />
                    ) : (
                      <Box component={AiFillEye} color="white" />
                    )}
                  </Box>
                  <Box
                    component="input"
                    height="30px"
                    width="100%"
                    type={showPass ? "text" : "password"}
                    autoComplete="off"
                    sx={{
                      border: "0",
                      outline: "0",
                      padding: "11px",
                      backgroundColor: "#242526",
                      color: "white",
                      fontFamily: theme.fonts.default,
                      letterSpacing: "1px",
                      transition: "0.5s",
                      fontSize: "13px",
                      borderRadius: "4px",
                      "&::placeholder": {
                        opacity: "0.5",
                      },
                    }}
                    placeholder="NewPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Box>
                <Box width="100%" position="relative" overflow="hidden  ">
                  <Box
                    component={IconButton}
                    color="white"
                    sx={{
                      position: "absolute",
                      right: "0",
                      zIndex: "100",
                      top: "-5px",
                    }}
                    onClick={() => setPassC((prev) => !prev)}
                  >
                    {showPassC ? (
                      <Box component={AiFillEyeInvisible} color="white" />
                    ) : (
                      <Box component={AiFillEye} color="white" />
                    )}
                  </Box>
                  <Box
                    component="input"
                    height="30px"
                    width="100%"
                    type={showPassC ? "text" : "password"}
                    autoComplete="off"
                    sx={{
                      border: "0",
                      outline: "0",
                      padding: "11px",
                      backgroundColor: "#242526",
                      color: "white",
                      fontFamily: theme.fonts.default,
                      letterSpacing: "1px",
                      transition: "0.5s",
                      fontSize: "13px",
                      borderRadius: "4px",
                      "&::placeholder": {
                        opacity: "0.5",
                      },
                    }}
                    placeholder="ConfirmNewPassword"
                    value={confirmpass}
                    onChange={(e) => setConfirm(e.target.value)}
                  />
                </Box>
              </Stack>
            </Stack>
            <Button
              startIcon={<AiOutlineClose />}
              onClick={handleOpenDE}
              sx={{
                alignSelf: "flex-start",
                backgroundColor: "#B91646",
                color: "white",
                "&:hover": {
                  backgroundColor: "#B91646",
                },
                fontFamily: theme.fonts.default,
              }}
            >
              Delete Account
            </Button>
            <Modal
              open={openDE}
              onClose={handleCloseDE}
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
                  Are You Going to delete this Account ?
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
                    onClick={handleCloseDE}
                  >
                    <AiOutlineClose color="#CC3636" />
                  </Box>
                  <Box
                    component={IconButton}
                    color="#367E18"
                    sx={{ width: "37px" }}
                    onClick={DeleteUser}
                  >
                    <AiOutlineCheck color="#367E18" />
                  </Box>
                </Stack>
              </Box>
            </Modal>
            <Stack
              direction="row"
              alignItems="center"
              alignSelf="flex-end"
              spacing="10px"
            >
              <Button
                onClick={() => setOpenDia(false)}
                sx={{
                  alignSelf: "flex-start",
                  backgroundColor: "#B91646",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#B91646",
                  },
                  fontFamily: theme.fonts.default,
                }}
              >
                Close
              </Button>
              <Box position="relative">
                <Button
                  startIcon={<AiOutlineSave />}
                  type="submit"
                  disabled={spin1}
                  sx={{
                    backgroundColor: "#105652",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#105652",
                    },
                    fontFamily: theme.fonts.default,
                    pointerEvents:
                      newPassword === "" &&
                      newUsername === "" &&
                      confirmpass === "" &&
                      avatarImage === null
                        ? "none"
                        : "all",
                  }}
                >
                  Save
                </Button>
                {spin1 && (
                  <Box
                    component={CircularProgress}
                    size={27}
                    color="#ffdf00"
                    sx={{
                      position: "absolute",
                      bottom: "6px",
                      left: "33%",
                      transform: "translate(-50%, 0)",
                    }}
                  />
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Dialog>
      <Box component={ToastContainer} theme="colored" sx={{ margin: "0px" }} />
    </Stack>
  );
}
