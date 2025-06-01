import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import GK from "./pages/GK";
import "../assets/styles/container.scss";
import { HashRoutes } from "./config";
import { HeaderProvider } from "../context/HeaderContext";
import Home from "./common/pages/Home";
import Header from "./common/organisms/Header";
import Footer from "./common/organisms/Footer";
import { FooterProvider } from "../context/FooterContext";
import English from "./course/english/pages/English";
import Maths from "./course/maths/pages/Maths";

const Container: React.FC = () => {
  return (
    <div className="app-container">
      <HashRouter>
        <HeaderProvider>
          <FooterProvider>
            <Header />

            <Routes>
              <Route path={HashRoutes.English} element={<English />} />
              <Route path={HashRoutes.General} element={<GK />} />
              <Route path={HashRoutes.Maths} element={<Maths />} />
              {/* <Route path="/" element={<Navigate replace to="/maths" />} /> */}
              <Route path="/" element={<Home />} />
            </Routes>

            <Footer />
          </FooterProvider>
        </HeaderProvider>
      </HashRouter>
    </div>
  );
};

export default Container;
