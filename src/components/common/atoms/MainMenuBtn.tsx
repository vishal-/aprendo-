import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../config";
import { FaHome } from "react-icons/fa";

const MainMenuBtn = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center position-absolute bottom-0 mb-3 p-0 w-100">
      <button
        className="btn btn-dark w-75"
        onClick={() => navigate(HashRoutes.Home)}
      >
        <FaHome />
      </button>
    </div>
  );
};

export default MainMenuBtn;
