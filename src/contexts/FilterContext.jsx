import { createContext, useContext } from "react";

const FilterContext = createContext();

export const useFilters = () => {
  return useContext(FilterContext);
};

export const FilterProvider = FilterContext.Provider;
