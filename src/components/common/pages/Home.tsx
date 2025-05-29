import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../config";
import MathImg from "../../../assets/images/math_logo.jpg";
import GkImg from "../../../assets/images/general_knowledge.webp";

const NavBtn = ({
  clickHandler,
  imageSource,
  label
}: {
  clickHandler: () => void;
  imageSource: string;
  label: string;
}) => (
  <div className="my-3 px-3 cursor-pointer" onClick={clickHandler}>
    <img src={imageSource} alt={label} className="img-fluid" />
  </div>
);

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <NavBtn
        clickHandler={() => navigate(HashRoutes.Maths)}
        label="Maths"
        imageSource={MathImg}
      />

      <NavBtn
        clickHandler={() => navigate(HashRoutes.General)}
        label="G.K"
        imageSource={GkImg}
      />
    </div>
  );
};

export default Home;
