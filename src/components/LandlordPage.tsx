import { View, Text, ScrollView } from "react-native";
import React from "react";
import { house } from "../hooks/useGetPageData";
import HouseRoll from "./HouseRoll";
import FormButton from "./reusable/FormButton";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../App";
import { IconButton } from "react-native-paper";
import apiClient from "../services/apiClient";
import { AxiosError } from "axios";
interface Props {
  houses: house[];
  user: User | undefined;
  setHouses: React.Dispatch<React.SetStateAction<house[]>>;
}

const LandlordPage = ({ user, houses, setHouses }: Props) => {
  const newHouse = houses.filter((house) => house.owner._id === user?._id);
  console.log(newHouse);
  const navigate = useNavigation<any>();
  const handlePress = () => {
    navigate.navigate("add");
  };

  const handleDelete = (house: house) => {
    apiClient
      .delete(`/houses/${house._id}`)
      .then((res) => {
        console.log(res);

        apiClient
          .get("/houses")
          .then((res1) => setHouses(res1.data))
          .catch((err1) => console.log(err1));
        navigate.navigate("my-assets");
      })
      .catch((err: AxiosError) => console.log(err));
  };

  return (
    <>
      <View style={{ marginBottom: 20 }}>
        <FormButton label="Add" handlePress={handlePress} />
      </View>
      <View style={{ marginTop: 40 }}>
        <HouseRoll setHouses={setHouses} user={user} houses={newHouse} />
      </View>
    </>
  );
};

export default LandlordPage;
