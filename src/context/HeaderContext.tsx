import React from "react";
import { useTimer } from "react-timer-hook";
import type {
  HeaderContextParamsType,
  HeaderContextType
} from "./context.types";
import { defaultHeaderParams } from "./context.defaults";

const HeaderContext = React.createContext<HeaderContextType | undefined>(
  undefined
);

export const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [headerParams, setHeaderParams] =
    React.useState<HeaderContextParamsType>({
      ...defaultHeaderParams
    });

  const timer = useTimer({
    expiryTimestamp: new Date(),
    autoStart: false,
    onExpire: headerParams.onExpire
  });

  return (
    <HeaderContext.Provider value={{ headerParams, setHeaderParams, timer }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = (): HeaderContextType => {
  const context = React.useContext(HeaderContext);

  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }

  return context;
};
