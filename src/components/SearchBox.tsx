import React, { useCallback, useContext, useRef } from "react";

import { ReactComponent as MagnifierIcon } from "../assets/images/magnifier.svg";
import UiContext from "../context/ui-context";

import classes from "./SearchBox.module.scss";

export const SearchBox = () => {
  const { searchPhrase, setSearchPhrase } = useContext(UiContext);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchPhrase(e.currentTarget.value);
    },
    [setSearchPhrase]
  );

  return (
    <div className={classes.searchBox}>
      <MagnifierIcon
        style={{ width: 14 }}
        onClick={() => inputRef.current?.focus()}
      />
      <input
        type="search"
        placeholder={"search"}
        name="search"
        className={classes.searchBox_input}
        onChange={inputChangeHandler}
        value={searchPhrase}
        ref={inputRef}
      />
    </div>
  );
};
