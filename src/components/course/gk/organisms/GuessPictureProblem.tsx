import type { GKProblemType } from "../constants/gk.types";

interface GuessPictureProblemProps {
  problemList: GKProblemType[];
  currentIndex: number;
  setAnswer: (ans: string) => void;
}

const GuessPictureProblem: React.FC<GuessPictureProblemProps> = ({
  problemList,
  currentIndex,
  setAnswer
}) => {
  const { image, options, answer } = problemList[currentIndex];

  return (
    <>
      <div className="text-center mt-3">
        <h3>Flag #{currentIndex + 1}</h3>

        <div className="text-center mb-3 px-5">
          <img
            src={`https://c8t3.c10.e2-5.dev/flags/imgs/${image}`}
            className="img-fluid"
            alt="flag"
          />
        </div>

        <div className="my-3 p-3 d-flex flex-wrap justify-content-center">
          {options.map((option) => (
            <div key={`flag_option_${option}`} className="m-3">
              <button
                className={`btn ${
                  answer === option ? "btn-secondary" : "btn-outline-secondary"
                }`}
                onClick={() => setAnswer(option)}
              >
                {option}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GuessPictureProblem;
