import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useFetch = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([] as T[]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get(endpoint)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  console.log(endpoint);

  return { data, error, setData };
};

export default useFetch;
