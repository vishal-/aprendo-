import React from "react";
import msgTone from "../../../assets/sounds/ca_tone.wav";
import { ButtonVariant } from "../../constants/elements.enum";

interface ButtonProps {
  variant?: string;
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = ButtonVariant.Primary,
  label,
  onClick
}) => {
  let btnClass = "";

  const playSound = () => {
    const notification = new Audio(msgTone);
    notification.play();
  };

  switch (variant) {
    case ButtonVariant.Primary:
      btnClass = "btn-primary";
      break;

    case ButtonVariant.Secondary:
      btnClass = "btn-secondary";
      break;

    default:
      btnClass = "btn-link";
  }

  const clickHandler = () => {
    onClick();
    playSound();
  };

  return (
    <button className={`btn w-100 ${btnClass}`} onClick={clickHandler}>
      {label}
    </button>
  );
};

export default Button;
