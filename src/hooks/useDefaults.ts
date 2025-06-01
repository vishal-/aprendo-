import { useNavigate } from "react-router-dom";
import { HashRoutes } from "../components/config";
import { useHeader } from "../context/HeaderContext";
import { useFooter } from "../context/FooterContext";
import {
  defaultFooterParams,
  defaultHeaderParams
} from "../context/context.defaults";

interface UseDefaultsReturn {
  resetHeader: () => void;
  resetFooter: () => void;
  resetNav: () => void;
}

const useDefaults = (): UseDefaultsReturn => {
  const navigate = useNavigate();
  const { setHeaderParams, timer } = useHeader();
  const { setFooterParams } = useFooter();

  const resetHeader = (): void => {
    setHeaderParams({ ...defaultHeaderParams });
    timer.pause();
  };

  const resetFooter = (): void => setFooterParams({ ...defaultFooterParams });

  const resetNav = (): void => {
    resetHeader();
    resetFooter();
    navigate(HashRoutes.Home);
  };

  return { resetHeader, resetFooter, resetNav };
};

export default useDefaults;
