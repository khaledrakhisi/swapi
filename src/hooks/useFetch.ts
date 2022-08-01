import { useCallback, useReducer, useRef } from "react";

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

  // eslint-disable-next-line no-undef
  const fetchData = useCallback(async (url: string, options?: RequestInit) => {
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
      const response = await fetch(url, {
        ...options,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      if (response.ok && response.status !== 200) {
        throw new Error("302 error happend. Maybe you forgot .json");
      }

      const data = (await response.json()) as T;

      /***
       *
       * Caching
       */
      cache.current[url] = data;

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      dispatch({ type: "error", payload: error as Error });
    }
  }, []);

  return { ...state, sendRequest: fetchData };
}

export default useFetch;
