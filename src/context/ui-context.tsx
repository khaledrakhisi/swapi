import React, { useState } from "react";

type TUiContext = {
  searchPhrase: string;
  setSearchPhrase: (newPhrase: string) => void;
};

const UiContext = React.createContext<TUiContext>({
  searchPhrase: "",
  setSearchPhrase: (newPhrase: string) => {},
});

interface IUiContextProviderProps {
  children: React.ReactNode;
}

export const UiContextProvider: React.FunctionComponent<
  IUiContextProviderProps
> = ({ children }) => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");

  const contextValue: TUiContext = {
    searchPhrase,
    setSearchPhrase,
  };
  return (
    <UiContext.Provider value={contextValue}>{children}</UiContext.Provider>
  );
};

export default UiContext;
