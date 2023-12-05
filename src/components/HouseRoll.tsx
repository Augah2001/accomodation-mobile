import { View, Text, ScrollView } from "react-native";
import React from "react";
import HouseCard from "./HouseCard";
import { house } from "../hooks/useGetPageData";
import { User } from "../../App";
import apiClient from "../services/apiClient";
import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";

interface Props {
  houses: house[];
  user: User | undefined;
  setHouses: React.Dispatch<React.SetStateAction<house[]>>;
}

const HouseRoll = ({ houses, user, setHouses }: Props) => {
  const navigate = useNavigation<any>();

  const handleDelete = (house: house) => {
    apiClient
      .delete(`/houses/${house._id}`)
      .then((res) => {
        apiClient
          .get("/houses")
          .then((res1) => setHouses(res1.data))
          .catch((err1) => console.log(err1));
        navigate.navigate("my-assets");
      })
      .catch((err: AxiosError) => console.log(err));
  };

  return (
    <ScrollView>
      {houses.map((house) => (
        <HouseCard
          onDelete={handleDelete}
          user={user}
          key={house._id}
          house={house}
        />
      ))}
    </ScrollView>
  );
};

export default HouseRoll;
