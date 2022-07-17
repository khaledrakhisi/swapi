import { SearchBox } from "./SearchBox";

import classes from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={classes.mainHeader}>
      <div className={classes.title}>
        <h2 className="title"> {"SWAPI consumer!"} </h2>
        <p> {"with caching"} </p>
      </div>
      <SearchBox />
    </header>
  );
};
