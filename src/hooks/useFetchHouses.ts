

import useFetch from "./useFetch";
import { house } from "./useGetPageData";

const useFetchHouses = () => useFetch<house>("/houses");

export default useFetchHouses;
