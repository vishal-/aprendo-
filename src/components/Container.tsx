import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Maths from "./pages/Maths";
import GK from "./pages/GK";
import "../assets/styles/container.scss";
import { HashRoutes } from "./config";
import { HeaderProvider } from "../context/HeaderContext";
import Home from "./common/pages/Home";
import Header from "./common/organisms/Header";

const Container: React.FC = () => {
  return (
    <div className="app-container">
      <HashRouter>
        <HeaderProvider>
          <Header />

          <Routes>
            <Route path={HashRoutes.General} element={<GK />} />
            <Route path={HashRoutes.Maths} element={<Maths />} />
            {/* <Route path="/" element={<Navigate replace to="/maths" />} /> */}
            <Route path="/" element={<Home />} />
          </Routes>
        </HeaderProvider>
      </HashRouter>
    </div>
  );
};

export default Container;
