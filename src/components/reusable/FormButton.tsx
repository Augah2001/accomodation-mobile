import { View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

interface Props {
  label: string;
  handlePress: (params: any) => any;
}

const FormButton = ({ label, handlePress }: Props) => {
  return (
    <Button
      textColor="white"
      style={{
        marginHorizontal: 20,
        top: 50,
        width: "90%",
        backgroundColor: "#1b5e2a",

        borderRadius: 5,
        alignSelf: "center",
      }}
      onPress={handlePress}
    >
      <Text>{label}</Text>
    </Button>
  );
};

export default FormButton;
