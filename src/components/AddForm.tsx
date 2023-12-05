import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import Joi from "joi";
import { User } from "../../App";
import FormTemplate from "./reusable/FormTemplate";
import { Button } from "react-native-paper";
import FormButton from "./reusable/FormButton";
import axios from "axios";
import { toast } from "react-toastify";
import apiClient from "../services/apiClient";
import { useNavigation } from "@react-navigation/native";
import { house } from "../hooks/useGetPageData";
// import { useNavigation } from "react-router-native";

interface Props {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setHouses: React.Dispatch<React.SetStateAction<house[]>>;
}

const AddForm = ({ user, setUser, setHouses }: Props) => {
  const navigate = useNavigation<any>();
  const [houseData, setHouseData] = useState<{ [key: string]: any }>({
    houseNumber: "",
    description: "",
    curfew: "",
    price: "",
    distance: "",
    services: ["jacuzzi", "gas", "wifi"],
    backgroundImage: "",
    images: [
      "../../assets/no-image-placeholder.webp",
      "../../assets/no-image-placeholder.webp",
      "../../assets/no-image-placeholder.webp",
    ],
    location: "",
    ownerId: user?._id,
    capacity: "",
    occupied: 0,
  });

  const schema = Joi.object({
    houseNumber: Joi.number().required(),
    description: Joi.string(),
    curfew: Joi.string().required(),
    price: Joi.number().required(),
    distance: Joi.string(),
    services: Joi.array(),
    backgroundImage: Joi.string().allow(""),
    images: Joi.array().allow(""),
    location: Joi.string().required(),
    ownerId: Joi.string().allow(""),
    capacity: Joi.number().integer().required(),
    occupied: Joi.number()
      .integer()
      .max(parseInt(houseData.capacity) || 0)
      .required(),
  });

  const doSubmit = () => {
    console.log("augah");
    apiClient
      .post("/houses/", houseData)
      .then((res) => {
        console.log(res);
        apiClient
          .get("/houses")
          .then((res) => setHouses(res.data))
          .catch((err) => {
            console.log(err.message);
          });
        setUser(user);
        navigate.navigate("my-assets");
      })
      .catch(
        (err) => {
          console.log(err);
        }
        // toast({
        //   title: err.response.data,
        // })
      );
  };

  return (
    <FormTemplate
      schema={schema}
      doSubmit={doSubmit}
      data={houseData}
      setData={setHouseData}
    >
      {(renderInput, renderButton, renderText, renderRadioButtons) => {
        return (
          <>
            {renderInput("houseNumber", "House Number", "number", false)}
            {renderInput("location", "Location", "text", false)}
            {renderInput("description", "Description", "text", false)}
            <View>
              <Text>Curfew</Text>
            </View>
            {renderRadioButtons(
              "curfew",
              [
                { label: "curfew (yes)", value: "yes" },
                { label: "curfew(no)", value: "no" },
              ],
              (id, value) => setHouseData({ ...houseData, curfew: value })
            )}
            {renderInput("price", "Price", "text", false)}
            {renderInput("distance", "Distance (m)", "number", false)}
            {renderInput("capacity", "Capacity", "number", false)}
            {/* {renderInput("occupied", "Occupied", "number", false)} */}

            {renderButton("Add")}
          </>
        );
      }}
    </FormTemplate>
  );
};

export default AddForm;
