import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Maths from "./pages/Maths";
import GK from "./pages/GK";
import "../assets/styles/container.scss";
import Home from "./common/pages/Home";
import { HashRoutes } from "./config";

const Container: React.FC = () => {
  return (
    <div className="">
      <HashRouter>
        <Routes>
          <Route path={HashRoutes.General} element={<GK />} />
          <Route path={HashRoutes.Maths} element={<Maths />} />
          {/* <Route path="/" element={<Navigate replace to="/maths" />} /> */}
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default Container;
