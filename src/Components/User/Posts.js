import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import Sklton from "./Sklton";
import { motion } from "framer-motion";
export default function Posts({ user, fetchP, setFetch }) {
  const [posts, setposts] = useState(undefined);
  useEffect(() => {
    if (!fetchP) {
      setTimeout(() => {
        axios
          .get("https://ytroutyback-production.up.railway.app/posts", {
            withCredentials: true,
          })
          .then((response) => setposts(response.data.posts))
          .finally(setFetch(true));
      }, 1000);
    }
  }, [fetchP]);
  return (
    <Stack direction="column" width="100%" spacing="10px" className="posts">
      {posts
        ? posts.map((post,i) => (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={i}
            >
              <Post
                key={post._id}
                postId={post._id}
                userAvatar={post.userAvatar}
                body={post.body}
                userId={post.userId}
                username={post.username}
                PostTime={post.createdAt}
                comments={post.comments}
                likes={post.likes}
                user={user}
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
