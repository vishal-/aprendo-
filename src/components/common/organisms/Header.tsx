import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../config";
import { useHeader } from "../../../context/HeaderContext";

const Header: React.FC = () => {
  const { headerParams, timer } = useHeader();
  const { title, showHome } = headerParams;

  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log("timer is running....", timer.isRunning);
  //     if (!timer.isRunning) {
  //       const time = new Date();
  //       time.setSeconds(time.getSeconds() + 60 * 2);

  //       timer.restart(time);
  //     }
  //   }, [timer, timer.isRunning]);

  console.log(timer.isRunning);

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
          <div className="col-3">
            <div>Time left</div>
            <span className="badge mx-1 text-bg-dark">
              {timer.totalSeconds.toString().padStart(2, "0")}
            </span>
            <div>seconds</div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
