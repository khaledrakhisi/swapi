import React, { useState } from "react";

import { ICharacter } from "../interfaces/ICharacter";

import classes from "./SimpleTable.module.scss";

interface ICustomTableProps {
  data: Array<ICharacter>;
}

export const CustomTable: React.FunctionComponent<ICustomTableProps> = ({
  data,
}) => {
  const [sortSettings, setSortSettings] = useState<{
    sortBy: string;
    order: number;
  }>({
    sortBy: "name",
    order: 1, //1 == ascending, -1 == descending
  });

  const reSort = (fieldName: string) => {
    setSortSettings((prev) => ({
      ...prev,
      sortBy: fieldName,
      order: prev.order * -1,
    }));
  };

  return (
    <section className={classes.simpleTable}>
      <div className={classes.header} onClick={() => reSort("name")}>
        Name
      </div>
      <div className={classes.header} onClick={() => reSort("height")}>
        Height
      </div>
      <div className={classes.header} onClick={() => reSort("mass")}>
        Mass
      </div>
      <div className={classes.header} onClick={() => reSort("gender")}>
        Gender
      </div>
      <div className={classes.header} onClick={() => reSort("hair_color")}>
        Hair color
      </div>
      <div className={classes.header} onClick={() => reSort("skin_color")}>
        Skin color
      </div>
      <div className={classes.header} onClick={() => reSort("eye_color")}>
        Eye Color
      </div>
      <div className={classes.header} onClick={() => reSort("homeworld")}>
        Homeworld
      </div>
      <div className={classes.header} onClick={() => reSort("films")}>
        Films
      </div>

      {data
        .sort((a, b) =>
          a[sortSettings.sortBy as keyof ICharacter] >
          b[sortSettings.sortBy as keyof ICharacter]
            ? 1 * Number(sortSettings.order)
            : -1 * Number(sortSettings.order)
        )
        .map((item) => (
          <React.Fragment key={item.name}>
            <div>{item.name}</div>
            <div>{item.height}</div>
            <div>{item.mass}</div>
            <div>{item.gender}</div>
            <div>{item.hair_color}</div>
            <div>{item.eye_color}</div>
            <div>{item.skin_color}</div>
            <div>{item.homeworld}</div>
            <div>{item.films}</div>
          </React.Fragment>
        ))}
    </section>
  );
};
