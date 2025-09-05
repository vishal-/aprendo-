type FeedbackProps = {
  message: string;
  variant: "warning" | "danger" | "success" | "info";
};

const Feedback: React.FC<FeedbackProps> = ({
  message,
  variant = "success"
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "warning":
        return "bg-yellow-900/50 text-yellow-300 border-yellow-700";
      case "danger":
        return "bg-red-900/50 text-red-300 border-red-700";
      case "success":
        return "bg-green-900/50 text-green-300 border-green-700";
      case "info":
        return "bg-blue-900/50 text-blue-300 border-blue-700";
      default:
        return "bg-green-900/50 text-green-300 border-green-700";
    }
  };

  return (
    <div
      className={`px-5 py-3 text-center rounded border mb-4 ${getVariantClasses()}`}
    >
      {message}
    </div>
  );
};

export default Feedback;
