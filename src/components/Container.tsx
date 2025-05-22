import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Maths from "./pages/Maths";
import GK from "./pages/GK";
import "../assets/styles/container.scss";
import Home from "./common/pages/Home";

const Container: React.FC = () => {
  return (
    <div className="">
      <HashRouter>
        <Routes>
          <Route path="/general" element={<GK />} />
          <Route path="/maths" element={<Maths />} />
          {/* <Route path="/" element={<Navigate replace to="/maths" />} /> */}
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default Container;
