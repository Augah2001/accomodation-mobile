import { View, Text } from "react-native";
import React from "react";
import { Link } from "@react-navigation/native";

interface Props {
  route: string;
  text: string | null;
  linkText: string | null;
}

const FormText = ({ route, text, linkText }: Props) => {
  return (
    <View style={{ marginHorizontal: 20, top: 70 }}>
      <Text style={{ color: "white" }}>
        {text + " "}{" "}
        <Link
          style={{ color: "purple" }}
          to={`/${route}`}
          onPress={() => console.log("clicked")}
        >
          {linkText}
        </Link>
      </Text>
    </View>
  );
};

export default FormText;
