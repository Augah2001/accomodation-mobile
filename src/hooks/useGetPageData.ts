import { useEffect } from "react";

import axios from "axios";
import useFetchHouses from "./useFetchHouses";
import useSearchHouses from "./useSearchHouses";

export interface house {
  houseNumber: number;
  description: string;
  curfew: boolean;
  price: number;
  distance: string;
  services: any[];
  backgroundImage: string;
  images: any[];
  location: { name: string; _id: string; distance: string };

  [key: string]: any;
}

const useGetPageData = () => {
  const { data: houses, setData: setHouses } = useFetchHouses();

  const { searchQuery, handleSearchChange } = useSearchHouses(setHouses);

  return {
    houses,

    setHouses,
    handleSearchChange,
    searchQuery,
  };
};

export default useGetPageData;
