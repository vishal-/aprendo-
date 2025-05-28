import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../config";
import { useHeader } from "../../../context/HeaderContext";

const Header: React.FC = () => {
  const { headerParams, timer } = useHeader();
  const { title, showHome } = headerParams;

  const navigate = useNavigate();

  return (
    <header className="bg-dark-subtle text-danger-emphasis mb-3 p-3">
      <nav className="row">
        <div className="col-2">
          {showHome && (
            <button
              className="btn btn btn-dark"
              onClick={() => navigate(HashRoutes.Home)}
            >
              <FaHome />
            </button>
          )}
        </div>

        <div className="col-7 h3 text-center">{title}</div>

        {timer.isRunning && (
          <div className="col-2 text-center">
            <div>Timer</div>
            <div className="d-flex justify-content-center">
              <div className="me-1">
                <span className="badge text-bg-dark">
                  {timer.minutes.toString().padStart(2, "0")}
                </span>
                <div>min</div>
              </div>
              :
              <div className="ms-1">
                <span
                  className={`badge ${
                    timer.totalSeconds < 11 ? "text-bg-danger" : "text-bg-dark"
                  }`}
                >
                  {timer.seconds.toString().padStart(2, "0")}
                </span>
                <div>sec</div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
