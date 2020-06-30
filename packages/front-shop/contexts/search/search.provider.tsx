import React, { useReducer } from "react";
import { SearchContext } from "./search.context";
type ActionType = {
  type: "UPDATE ADDRESS" | "UPDATE TEXT" | "RESET";
  payload: any;
};

function reducer(state: any, action: ActionType): any {
  switch (action.type) {
    case "UPDATE ADDRESS":
      return {
        ...state,
        address: action.payload.address,
      };
    case "UPDATE TEXT":
      return {
        ...state,
        text: action.payload.text,
      };
    case "RESET":
      return { text: "" };
    default:
      return state;
  }
}

export const SearchProvider: React.FunctionComponent<{ query: any }> = ({
  children,
  query = { text: "" },
}) => {
  const [state, dispatch] = useReducer(reducer, query);
  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
