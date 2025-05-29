import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../config";
import { useHeader } from "../../../context/HeaderContext";
import { defaultHeaderParams } from "../../../context/context.defaults";

const MainMenuBtn = () => {
  const navigate = useNavigate();
  const { setHeaderParams, timer } = useHeader();

  const gotoHome = () => {
    setHeaderParams({ ...defaultHeaderParams });
    timer.pause();
    navigate(HashRoutes.Home);
  };

  return (
    <div className="text-center my-3">
      <button className="btn btn-dark btn-primary" onClick={gotoHome}>
        End task
      </button>
    </div>
  );
};

export default MainMenuBtn;
