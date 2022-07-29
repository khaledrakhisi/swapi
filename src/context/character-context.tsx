import React from "react";

import { ICharacter } from "../interfaces/ICharacter";

export type TCharacterContext = {
  characters: Array<ICharacter>;
  setCharacters: (characters: Array<ICharacter>) => void;
};

const CharactersContext = React.createContext<TCharacterContext | null>(null);

interface ICharactersProviderProps {
  children?: React.ReactNode;
}
export const CharactersContextProvider: React.FunctionComponent<
  ICharactersProviderProps
> = ({ children }) => {
  const [characters, setCharacters] = React.useState<Array<ICharacter>>([]);

  return (
    <CharactersContext.Provider
      value={{
        characters,
        setCharacters,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
