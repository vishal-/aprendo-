import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Maths from "./pages/Maths";
import "../assets/styles/container.scss";

const Container: React.FC = () => {
  return (
    <div className="">
      <HashRouter>
        <Routes>
          <Route path="/maths" element={<Maths />} />
          <Route path="/" element={<Navigate replace to="/maths" />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default Container;
