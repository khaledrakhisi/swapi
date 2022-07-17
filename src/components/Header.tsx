import { SearchBox } from "./SearchBox";

import classes from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={classes.mainHeader}>
      <h2 className="title"> {"SWAPI consumer!"} </h2>
      <SearchBox />
    </header>
  );
};
