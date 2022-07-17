import React, { useContext, useEffect, useState } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import { Paging } from "../components/Paging";
import { CustomTable } from "../components/SimpleTable";
import UiContext from "../context/ui-context";
import useFetch from "../hooks/useFetch";
import { ISWAPIResponse } from "../interfaces/ISWAPIResponse";

import classes from "./HomePage.module.scss";

export const HomePage = () => {
  const { sendRequest, status, error, data } = useFetch<ISWAPIResponse>();
  const { searchPhrase, pageNumber, setPageNumber } = useContext(UiContext);
  const [pagesCount, setPagesCount] = useState<number>(1);

  useEffect(() => {
    sendRequest(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/people/?search=${searchPhrase}`,
      {
        method: "GET",
      }
    );
    setPageNumber(1);
  }, [searchPhrase]);

  useEffect(() => {
    sendRequest(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/people/?search=${searchPhrase}&page=${pageNumber}`,
      {
        method: "GET",
      }
    );
  }, [pageNumber]);

  useEffect(() => {
    if (status === "fetched" && data) {
      setPagesCount(Math.ceil(data.count / 10));
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
        {data && (
          <React.Fragment>
            <div className={classes.homepage__data}>
              <CustomTable data={data.results} />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    </section>
  );
};
