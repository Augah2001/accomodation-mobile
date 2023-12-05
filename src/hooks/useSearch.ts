import React, { useState } from "react";

const useSearch = <T extends Record<string, string>>(
  initialData: T[],

  setData: React.Dispatch<React.SetStateAction<T[] | []>>
) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queriedData, setQueriedData] = useState<T[]>([]);

  const handleSearchChange = (e: string) => {
    const query = e;

    setSearchQuery(query);

    const data = initialData.filter((item: any) => {
      const regex = new RegExp(query, "i");
      for (let key in item) {
        if (item[key] instanceof Object) {
          for (let key2 in item[key]) {
            if (regex.test(item[key][key2])) return true;
          }
        }
        if (regex.test(item[key])) {
          return true;
        }
      }

      return false;
    });
    data.length <= 0 ? setQueriedData(data) : setQueriedData(initialData);

    setData(data);
  };

  return {
    queriedData,
    searchQuery,
    handleSearchChange,
    setSearchQuery,
    setData,
  };
};

export default useSearch;
