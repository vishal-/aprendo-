import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../config";
import { useHeader } from "../../../context/HeaderContext";
import { defaultHeaderParams } from "../../../context/context.defaults";

const Header: React.FC = () => {
  const { headerParams, setHeaderParams, timer } = useHeader();
  const { title, showHome } = headerParams;

  const navigate = useNavigate();

  const onReturnHome = () => {
    timer.pause();
    setHeaderParams({ ...defaultHeaderParams });
    navigate(HashRoutes.Home);
  };

  return (
    <header className="bg-dark-subtle text-danger-emphasis p-3">
      <nav className="nav text-center align-top">
        <div className="w-25">
          {showHome && (
            <button className="btn btn btn-dark" onClick={onReturnHome}>
              <FaHome />
            </button>
          )}
        </div>

        <div className="display-5 text-center w-50">{title}</div>

        {timer.isRunning && (
          <div className="text-center w-25">
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
