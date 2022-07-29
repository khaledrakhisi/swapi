import React, { useContext, useEffect, useState } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import { Paging } from "../components/Paging";
import { SimpleTable } from "../components/SimpleTable";
import { CharactersContext } from "../context/character-context";
import { UiContext } from "../context/ui-context";
import useFetch from "../hooks/useFetch";
import { ISWAPIResponse } from "../interfaces/ISWAPIResponse";

import classes from "./HomePage.module.scss";

export const HomePage = () => {
  const { sendRequest, status, error, data } = useFetch<ISWAPIResponse>();
  const { characters, setCharacters } = useContext(CharactersContext);
  const { searchPhrase, pageNumber, setPageNumber } = useContext(UiContext);
  const [pagesCount, setPagesCount] = useState<number>(1);

  useEffect(() => {
    sendRequest(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/people/?search=${searchPhrase}`
    );

    if (pageNumber > 1) {
      setPageNumber(1);
    }
  }, [searchPhrase]);

  useEffect(() => {
    sendRequest(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/people/?search=${searchPhrase}&page=${pageNumber}`
    );
  }, [pageNumber]);

  useEffect(() => {
    if (status === "fetched" && data) {
      setPagesCount(Math.ceil(data.count / 10));
      setCharacters(data.results);
    }
  }, [data]);

  return (
    <section className={classes.homepage}>
      <React.Fragment>
        {status === "error" && error && error?.message}
        <div className={classes.homepage__info}>
          <p>For sorting click on the table headers</p>
          <Paging pagesCount={pagesCount} />
        </div>
        {status === "loading" && <LoadingSpinner asOverlay />}
        {characters && (
          <React.Fragment>
            <div className={classes.homepage__data}>
              <SimpleTable data={characters} />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    </section>
  );
};
