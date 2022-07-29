import React, { useState } from "react";

type TUiContext = {
  searchPhrase: string;
  setSearchPhrase: (newPhrase: string) => void;
  pageNumber: number;
  setPageNumber: (newPageNumber: number) => void;
};

export const UiContext = React.createContext<TUiContext>({
  searchPhrase: "",
  setSearchPhrase: (newPhrase: string) => {},
  pageNumber: 1,
  setPageNumber: (newPageNumber: number) => {},
});

interface IUiContextProviderProps {
  children: React.ReactNode;
}

export const UiContextProvider: React.FunctionComponent<
  IUiContextProviderProps
> = ({ children }) => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  const contextValue: TUiContext = {
    searchPhrase,
    setSearchPhrase,
    pageNumber,
    setPageNumber,
  };
  return (
    <UiContext.Provider value={contextValue}>{children}</UiContext.Provider>
  );
};
