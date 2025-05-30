import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../../config";
import MathImg from "../../../assets/images/math_logo.jpg";
import GkImg from "../../../assets/images/general_knowledge.webp";
import EnglishImg from "../../../assets/images/english_logo.jpg";

const Home = () => {
  const navigate = useNavigate();

  const courses = [
    {
      label: "Maths",
      imageSource: MathImg,
      route: HashRoutes.Maths
    },
    {
      label: "G.K",
      imageSource: GkImg,
      route: HashRoutes.General
    },
    {
      label: "English",
      imageSource: EnglishImg,
      route: HashRoutes.English
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
          <img src={imageSource} alt={label} className="img-fluid" />
        </div>
      ))}
    </div>
  );
};

export default Home;
