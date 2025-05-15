import React, {useState} from "react";
import { MathOperation } from "../constants/math.enum";

const Maths: React.FC = () => {
  const [operation, setOperation] = useState<MathOperation>(MathOperation.Addition);
  const [tpq, setTpq] = useState<Number>(Infinity);

  return <div>Mathematics</div>;
};

export default Maths;
