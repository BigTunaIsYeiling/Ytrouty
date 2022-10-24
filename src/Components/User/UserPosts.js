import { Stack } from "@mui/material";
import { motion } from "framer-motion";
import Sklton from "./Sklton";
import UserPost from "../User/UserPost";
import { useEffect, useState } from "react";
import axios from "axios";
export default function UserPosts({ currentuser, id }) {
  const [posts, setPosts] = useState(null);
  const [fetchP, setFetch] = useState(false);
  useEffect(() => {
    if (!fetchP) {
      setTimeout(() => {
        axios
          .get(`https://ytrouty-app-api.onrender.com/users/profile/${id}`)
          .then((res) => setPosts(res.data.userPosts))
          .finally(setFetch(true));
      }, 2000);
    }
  }, [fetchP]);
  return (
    <Stack direction="column" width="100%" spacing="10px" className="posts">
      {posts
        ? posts.map((post, i) => (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={i}
            >
              <UserPost
                key={post._id}
                postId={post._id}
                userAvatar={post.userAvatar}
                body={post.body}
                userId={post.userId}
                username={post.username}
                PostTime={post.createdAt}
                comments={post.comments}
                likes={post.likes}
                user={currentuser}
                setFetch={setFetch}
                media={post.media}
              />
            </motion.div>
          ))
        : Array(3)
            .fill(true)
            .map((t, i) => <Sklton key={i} />)}
    </Stack>
  );
}
