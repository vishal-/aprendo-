import type {
  FooterContextParamsType,
  HeaderContextParamsType
} from "./context.types";

export const defaultHeaderParams: HeaderContextParamsType = {
  title: "Kids Learning",
  showHome: true,
  onTimerExpire: () => undefined
};

export const defaultFooterParams: FooterContextParamsType = {
  showFooter: false,
  onFinish: undefined,
  onPrevious: undefined,
  onNext: undefined
};
