import React, { useEffect, useState } from "react";
import { house } from "./useGetPageData";
import useSearch from "./useSearch";

import useFetchHouses from "./useFetchHouses";

const useSearchHouses = (
  setHouses: React.Dispatch<React.SetStateAction<house[] | []>>
) => {
  const { data: houses } = useFetchHouses();
  const initialData = houses;

  return useSearch<house>(initialData, setHouses);
};

export default useSearchHouses;
