import type { useTimerResultType } from "react-timer-hook/dist/types/src/useTimer";

export interface HeaderContextParamsType {
  title: string;
  showHome: boolean;
  onTimerExpire: () => void;
}

export interface HeaderContextType {
  timer: useTimerResultType;
  headerParams: HeaderContextParamsType;
  setHeaderParams: (params: HeaderContextParamsType) => void;
}

export interface FooterContextParamsType {
  showFooter: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onFinish?: () => void;
}

export interface FooterContextType {
  footerParams: FooterContextParamsType;
  setFooterParams: (params: FooterContextParamsType) => void;
}
