import { useFooter } from "../../../context/FooterContext";
import PrevNext from "../atoms/PrevNext";

const Footer: React.FC = () => {
  const { footerParams } = useFooter();
  const { showFooter, onFinish, onNext, onPrevious } = footerParams;

  return showFooter ? (
    <footer
      className={`position-fixed start-0 bottom-0 bg-dark-subtle text-danger-emphasis w-100 p-2`}
    >
      <PrevNext onNext={onNext} onPrevious={onPrevious} />

      {onFinish !== undefined && (
        <div className="d-flex justify-content-center">
          <button className="btn btn-sm btn-danger" onClick={onFinish}>
            Finish
          </button>
        </div>
      )}
    </footer>
  ) : (
    <></>
  );
};

export default Footer;
