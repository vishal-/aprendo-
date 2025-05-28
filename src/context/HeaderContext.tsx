import React, {
  createContext,
  useState,
  type ReactNode,
  useContext
} from "react";
import { useTimer } from "react-timer-hook";
import type {
  HeaderContextParamsType,
  HeaderContextType
} from "./context.types";
import { defaultHeaderParams } from "./context.defaults";

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [headerParams, setHeaderParams] = useState<HeaderContextParamsType>({
    ...defaultHeaderParams
  });
  // const [title, setTitle] = useState<string>("Areyyy");
  // const [showHome, setShowHome] = useState<boolean>(true);
  const timer = useTimer({ expiryTimestamp: new Date(), autoStart: false });

  return (
    <HeaderContext.Provider value={{ headerParams, setHeaderParams, timer }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);

  if (context === undefined) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }

  return context;
};
