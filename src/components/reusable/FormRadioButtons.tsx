import { View, Text } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { RadioButton } from "react-native-paper";

interface Props {
  data: { [key: string]: string };
  id: string;
  setData: Dispatch<SetStateAction<{ [key: string]: string }>>;
  errors: { [key: string]: string };
  radioData: { label: string; value: any }[];
  handleRadioChange?: (id: string, value: string) => void;
  onChange: (value: string, id: string) => void;
}

const FormRadioButtons = ({
  data,
  id,
  radioData,
  errors,
  handleRadioChange,
}: Props) => {
  return (
    <RadioButton.Group
      onValueChange={(newValue) => {
        handleRadioChange?.(id, newValue);
        console.log(newValue);
      }}
      value={data[id]}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginHorizontal: 20,
          top: 40,
          alignContent: "center",
          justifyContent: "space-around",
        }}
      >
        {radioData.map((item) => (
          <View key={item.label}>
            <Text style={{ color: "white" }}>{item.label}</Text>
            <RadioButton value={item.value} />
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
};

export default FormRadioButtons;
