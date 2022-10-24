import { Route, Routes, useLocation } from "react-router-dom";
import "./Styles/App.scss";
import React, { useState } from "react";
import Home from "./Components/Home";
import { AnimatePresence } from "framer-motion";
import Register from "./Components/Register";
import Main from "./Components/Main";
export default function App() {
  const location = useLocation();
  const [Signed, setSigned] = useState(false);
  return (
    <React.Fragment>
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route element={<Home />} path="/" />
          <Route
            element={<Register Signed={Signed} setSigned={setSigned} />}
            path="/Register"
          />
          <Route
            element={<Main Signed={Signed} setSigned={setSigned} />}
            path="/main/*"
          />
        </Routes>
      </AnimatePresence>
    </React.Fragment>
  );
}
