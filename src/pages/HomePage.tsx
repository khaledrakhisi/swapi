import React, { useContext, useEffect } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import { Paging } from "../components/Paging";
import { CustomTable } from "../components/SimpleTable";
import UiContext from "../context/ui-context";
import useFetch from "../hooks/useFetch";
import { ISWAPIResponse } from "../interfaces/ISWAPIResponse";

import classes from "./HomePage.module.scss";

export const HomePage = () => {
  const { sendRequest, status, error, data } = useFetch<ISWAPIResponse>();
  const { searchPhrase } = useContext(UiContext);

  useEffect(() => {
    sendRequest(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/people/?search=${searchPhrase}`,
      {
        method: "GET",
      }
    );
  }, [searchPhrase]);

  return (
    <section className={classes.homepage}>
      {status === "loading" && <LoadingSpinner asOverlay />}
      <React.Fragment>
        {status === "error" && error && error?.message}
        {data && (
          <React.Fragment>
            <div className={classes.homepage__info}>
              <p>For sorting click on the table headers</p>
              <Paging />
            </div>
            <div className={classes.homepage__data}>
              <CustomTable data={data.results} />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    </section>
  );
};
