import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const navigateToMaths = () => {
    navigate("/maths");
  };

  const navigateToGK = () => {
    navigate("/general");
  };

  return (
    <div>
      <button className="btn btn-info mx-3 my-3" onClick={navigateToMaths}>
        Maths
      </button>
      <button className="btn btn-info mx-3 my-3" onClick={navigateToGK}>
        GK
      </button>
    </div>
  );
};

export default Home;
