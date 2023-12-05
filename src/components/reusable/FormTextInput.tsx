import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

interface Props {
  id: string;
  label: string;
  value: any;
  onChange: (value: string, id: string) => void;
  errors: { [key: string]: string };
  bool: boolean;
}

const FormTextInput = ({ label, id, value, onChange, errors, bool }: Props) => {
  return (
    <View style={{ marginHorizontal: 20, top: 40 }}>
      <Text style={{ marginBottom: 8, color: "white" }}>{label}</Text>
      <TextInput
        disabled={bool}
        style={{
          height: 40,
          borderColor: "purple",
          borderWidth: 1,
          borderRadius: 5,
          marginBottom: 16,
          paddingHorizontal: 8,
          backgroundColor: "transparent",
        }}
        onChangeText={(value) => onChange(value, id)}
        id={id}
        value={value}
      />
      {errors[id] && <Text style={{ color: "red" }}>{errors[id]}</Text>}
    </View>
  );
};

export default FormTextInput;
