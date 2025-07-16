import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../config";
import MathImg from "../../../assets/images/math_logo.jpg";
import GkImg from "../../../assets/images/general_knowledge.webp";
import EnglishImg from "../../../assets/images/english_logo.jpg";
import HindiImg from "../../../assets/images/hindi.jpg";

const Home = () => {
  const navigate = useNavigate();

  const courses = [
    {
      label: "Maths",
      imageSource: MathImg,
      route: HashRoutes.Maths
    },
    {
      label: "English",
      imageSource: EnglishImg,
      route: HashRoutes.English
    },
      {
      label: "Hindi",
      imageSource: HindiImg,
      route: HashRoutes.Hindi
    },
    {
      label: "G.K",
      imageSource: GkImg,
      route: HashRoutes.General
    }
  ];

  return (
    <div className="text-center">
      {courses.map(({ label, route, imageSource }) => (
        <div
          key={`course_${label}`}
          className="mx-5 my-2 px-3 cursor-pointer"
          onClick={() => navigate(route)}
        >
          <img src={imageSource} alt={label} className="img-fluid border" />
        </div>
      ))}
    </div>
  );
};

export default Home;
