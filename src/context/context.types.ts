import type { useTimerResultType } from "react-timer-hook/dist/types/src/useTimer";

export interface HeaderContextParamsType {
  title: string;
  showHome: boolean;
}

export interface HeaderContextType {
  //   showHome: boolean;
  //   setShowHome: (s: boolean) => void;
  timer: useTimerResultType;
  headerParams: HeaderContextParamsType;
  setHeaderParams: (params: HeaderContextParamsType) => void;
}
