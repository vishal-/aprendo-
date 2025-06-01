import React from "react";
import type {
  FooterContextParamsType,
  FooterContextType
} from "./context.types";
import { defaultFooterParams } from "./context.defaults";

export const FooterContext = React.createContext<FooterContextType | undefined>(
  undefined
);

export const FooterProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [footerParams, setFooterParams] =
    React.useState<FooterContextParamsType>({ ...defaultFooterParams });

  return (
    <FooterContext.Provider value={{ footerParams, setFooterParams }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = (): FooterContextType => {
  const context = React.useContext(FooterContext);

  if (context === undefined) {
    throw new Error("useFooter must be used within a FooterProvider");
  }

  return context;
};
