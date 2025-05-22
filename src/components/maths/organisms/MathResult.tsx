import type { MProblem } from "../constants/math.interfaces";

interface MathResultProps {
  problems: MProblem[];
  onReset: () => void;
}

const MathResult: React.FC<MathResultProps> = ({ problems, onReset }) => {
  return (
    <div>
      {problems.map((p: MProblem, i: number) => (
        <div key={`problem_${p.operand1}_${p.operand2}`} className="my-3 py-3">
          <div>Problem #{i + 1}</div>
          <div>
            {p.operand1} + {p.operand2} = {p.solution}
          </div>
          <div>Your answer: {p.answer}</div>
        </div>
      ))}

      <button className="btn btn-link" onClick={onReset}>
        End task
      </button>
    </div>
  );
};

export default MathResult;
