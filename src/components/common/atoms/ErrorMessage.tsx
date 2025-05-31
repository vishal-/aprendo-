import { TbAlertOctagonFilled } from "react-icons/tb";

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="p-3 text-danger bg-danger-subtle border border-danger-subtle rounded-3">
    <span className="h3 me-3">
      <TbAlertOctagonFilled />
    </span>
    <span>{message}</span>
  </div>
);

export default ErrorMessage;
