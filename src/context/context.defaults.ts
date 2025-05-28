import type { HeaderContextParamsType } from "./context.types";

export const defaultHeaderParams: HeaderContextParamsType = {
  title: "Kids Learning",
  showHome: true,
  onExpire: () => {
    console.log("time over");
  }
};
