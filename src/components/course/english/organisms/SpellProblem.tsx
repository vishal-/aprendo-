import { Keypad } from "../../../common/atoms";
import type { SpellItProblemType } from "../constants/english.types";

interface SpellProblemProps {
  problemList: SpellItProblemType[];
  currentIndex: number;
}

const SpellProblem: React.FC<SpellProblemProps> = ({
  problemList,
  currentIndex
}) => {
  const word = problemList[currentIndex]?.word;

  return (
    <div className="p-3">
      {word}

      <div className="text-center">
        {word.split("").map((ab, i) => (
          <span
            key={`alphabet-${word}-${i}-${ab}`}
            className="px-3 mx-1 border-bottom"
            data-val={ab}
          >
            &#160;
          </span>
        ))}
      </div>

      <Keypad onKeySelect={() => undefined} />
    </div>
  );
};

export default SpellProblem;
