import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../config";

const NavBtn = ({
  clickHandler,
  label
}: {
  clickHandler: () => void;
  label: string;
}) => (
  <button className="btn btn-info mx-3 my-3" onClick={clickHandler}>
    {label}
  </button>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBtn clickHandler={() => navigate(HashRoutes.Maths)} label="Maths" />

      <NavBtn clickHandler={() => navigate(HashRoutes.General)} label="G.K" />
    </div>
  );
};

export default Home;
