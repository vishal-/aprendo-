import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Maths from "./pages/Maths";

const Container: React.FC = () => {
  return (
    <div className="app-container">
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
