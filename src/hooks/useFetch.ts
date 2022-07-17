import { useReducer, useRef } from "react";

interface State<T> {
  data?: T;
  error?: Error;
  status: "loading" | "fetched" | "error" | "idle";
  // eslint-disable-next-line no-undef
  sendRequest: (url: string, options?: RequestInit) => void;
}

/**
 *
 * This provides caching for same urls
 */
type Cache<T> = { [url: string]: T };

// discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

function useFetch<T = unknown>(): State<T> {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    status: "idle",
    sendRequest: () => {},
  };

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, status: action.type };
      case "fetched":
        return { ...initialState, data: action.payload, status: action.type };
      case "error":
        return { ...initialState, error: action.payload, status: action.type };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  // useEffect(() => {
  // Do nothing if the url is not provided
  // if (!url) {
  //   return;
  // }

  // eslint-disable-next-line no-undef
  const fetchData = async (url: string, options?: RequestInit) => {
    dispatch({ type: "loading" });

    /**
     *
     * Caching implemented here
     */
    if (cache.current[url]) {
      dispatch({ type: "fetched", payload: cache.current[url] });
      return;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      if (response.ok && response.status !== 200) {
        // console.log(response.status);
        throw new Error("302 error happend. Maybe you forgat .json");
      }

      const data = (await response.json()) as T;
      cache.current[url] = data;
      if (cancelRequest.current) {
        return;
      }

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      if (cancelRequest.current) {
        return;
      }

      dispatch({ type: "error", payload: error as Error });
    }
  };

  // void fetchData();

  // Use the cleanup function for avoiding a possibly...
  // ...state update after the component was unmounted
  // return () => {
  //   cancelRequest.current = true;
  // };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [url]);

  return { ...state, sendRequest: fetchData };
}

export default useFetch;
