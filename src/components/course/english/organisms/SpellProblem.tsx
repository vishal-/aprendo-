import Keypad from "../../../common/molecules/Keypad";
import WordBox from "../../../common/molecules/WordBox";
import type { SpellItProblemType } from "../constants/english.types";

interface SpellProblemProps {
  problemList: SpellItProblemType[];
  currentIndex: number;
  onAnswer: (w: string) => void;
}

const SpellProblem: React.FC<SpellProblemProps> = ({
  problemList,
  currentIndex,
  onAnswer
}) => {
  const { word, image, answer } = problemList[currentIndex];

  const keySelectHandler = (letter: string) =>
    onAnswer(answer.length < word.length ? answer + letter : answer);

  return (
    <div className="spell-problem text-center">
      <div>
        <img src={image} className="img-fluid" alt="Spell this" />
      </div>

      <WordBox word={answer} size={word.length} onChange={(s) => onAnswer(s)} />

      <Keypad onKeySelect={keySelectHandler} />
    </div>
  );
};

export default SpellProblem;
