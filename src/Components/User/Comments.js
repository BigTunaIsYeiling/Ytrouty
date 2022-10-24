import { Stack } from "@mui/material";
import Comment from "./Comment";
import { motion } from "framer-motion";
export default function Comments({ comments, postId, user, setFetch }) {
  return (
    <Stack direction="column" spacing="10px" width="100%">
      {comments.map((comment, i) => (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          viewport={{ once: true }}
          key={i}
        >
          <Comment
            key={comment._id}
            commentID={comment._id}
            avater={comment.userAvatar}
            username={comment.username}
            time={comment.createdAt}
            body={comment.body}
            likes={comment.likes}
            user={user}
            postId={postId}
            userId={comment.userId}
            setFetch={setFetch}
          />
        </motion.div>
      ))}
    </Stack>
  );
}
