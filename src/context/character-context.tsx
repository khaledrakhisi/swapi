import React from "react";

import { ICharacter } from "../interfaces/ICharacter";

type TCharacterContext = {
  characters: Array<ICharacter>;
  setCharacters: (characters: Array<ICharacter>) => void;
};

export const CharactersContext = React.createContext<TCharacterContext>({
  characters: [],
  setCharacters: (characters: Array<ICharacter>) => {},
});

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
