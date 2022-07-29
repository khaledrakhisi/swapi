import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { ReactComponent as MagnifierIcon } from "../assets/images/magnifier.svg";
import { config } from "../config/config";
import { UiContext } from "../context/ui-context";
import useDebounce from "../hooks/useDebounce";

import classes from "./SearchBox.module.scss";

export const SearchBox = () => {
  const { setSearchPhrase } = useContext(UiContext);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  // A custom hook for debouncing
  const debouncedValue = useDebounce<string>(value, config.debouncingDelay);

  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
    },
    [setValue]
  );

  // This use Effect is being used for debouncing sake
  useEffect(() => {
    setSearchPhrase(value);
  }, [debouncedValue]);

  return (
    <div className={classes.searchBox}>
      <MagnifierIcon
        style={{ width: 14 }}
        onClick={() => inputRef.current?.focus()}
      />
      <input
        type="search"
        placeholder={"search by name"}
        name="search"
        className={classes.searchBox_input}
        onChange={inputChangeHandler}
        value={value}
        ref={inputRef}
      />
    </div>
  );
};
