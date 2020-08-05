import React, { useReducer, useEffect } from 'react';
import { SearchContext } from './search.context';
type ActionType = {
  type: 'UPDATE ADDRESS' | 'RESET ADDRESS' | 'UPDATE TEXT' | 'RESET';
  payload: any;
};

function reducer(state: any, action: ActionType): any {
  switch (action.type) {
    case 'UPDATE ADDRESS':
      return {
        ...state,
        address: action.payload.address,
      };
    case 'RESET ADDRESS':
      return {
        ...state,
        address: null,
      };
    case 'UPDATE TEXT':
      return {
        ...state,
        text: action.payload.text,
      };
    case 'RESET':
      return { text: '' };
    default:
      return state;
  }
}

const isBrowser = typeof window !== 'undefined';
const initialState = isBrowser
  ? JSON.parse(localStorage.getItem('address') as string) || ''
  : '';

export const SearchProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(JSON.stringify(state));
    localStorage.setItem(
      'address',
      JSON.stringify({
        address: state.address,
      })
    );
  }, [state]);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
