import { Box } from "@mui/material";
import Head from "./Home/Header";
import { motion } from "framer-motion";
import Section from "./Home/Section";
import { useEffect } from "react";
import Footer from "./Home/Footer";
export default function Home() {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <Box
      sx={{
        color: "white",
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
      transition={{ duration: 0.2 }}
    >
      <Head />
      <Section />
      <Footer />
    </Box>
  );
}
