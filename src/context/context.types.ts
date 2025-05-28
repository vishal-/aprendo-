import type { useTimerResultType } from "react-timer-hook/dist/types/src/useTimer";

export interface HeaderContextParamsType {
  title: string;
  showHome: boolean;
  onExpire: () => void;
}

export interface HeaderContextType {
  timer: useTimerResultType;
  headerParams: HeaderContextParamsType;
  setHeaderParams: (params: HeaderContextParamsType) => void;
}
