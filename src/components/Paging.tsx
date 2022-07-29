import React, { useContext } from "react";

import { UiContext } from "../context/ui-context";

import { Button } from "./Button";

import classes from "./Paging.module.scss";

interface IPagingProps {
  pagesCount: number;
}

export const Paging: React.FunctionComponent<IPagingProps> = ({
  pagesCount,
}) => {
  const { pageNumber, setPageNumber } = useContext(UiContext);

  return (
    <section className={classes.paging}>
      <Button
        id="previous"
        outline
        onClick={() => (pageNumber > 1 ? setPageNumber(pageNumber - 1) : null)}
      >
        Previous
      </Button>
      <p>
        Page {pageNumber} of {pagesCount}{" "}
      </p>
      <Button
        id="next"
        outline
        onClick={() =>
          pageNumber < pagesCount ? setPageNumber(pageNumber + 1) : null
        }
      >
        Next
      </Button>
    </section>
  );
};
