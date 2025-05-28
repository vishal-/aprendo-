import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../config";
import { useHeader } from "../../../context/HeaderContext";

const MainMenuBtn = () => {
  const navigate = useNavigate();
  const { setShowHome } = useHeader();

  const gotoHome = () => {
    setShowHome(true);
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
