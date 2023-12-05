import { View, Text } from "react-native";
import React, { useState } from "react";
import Joi from "joi";
import FormTemplate from "./FormTemplate";
import apiClient from "../../services/apiClient";
import { User } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import Toast from "react-native-toast-message";

interface Props {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const LoginForm = ({ user, setUser }: Props) => {
  const navigate = useNavigation<any>();
  const [loginData, setLoginData] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
  });

  const schema: Joi.ObjectSchema<any> & { [key: string]: any } = Joi.object({
    email: Joi.string()
      .label("Email")
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com"] },
        ignoreLength: true,
      })
      .required(),
    password: Joi.string().required(),
  });

  const doSubmit = () => {
    apiClient
      .post("/logins", loginData)
      .then((res) => {
        Toast.show({
          position: "top",
          topOffset: 200,
          type: "success",
          text1: "Hello",
          text2: "This is a toast message",
        });

        console.log(res.headers["x-auth-token"]);
        const jwt = res.headers["x-auth-token"];
        SecureStore.setItemAsync("token", jwt);
        const user: User = jwtDecode(jwt);
        setUser(user);

        navigate.navigate("home");
        Toast.show({
          position: "bottom",
          bottomOffset: 100,
          type: "success",
          text1: "Hello",
          text2: "This is a toast message",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <FormTemplate
      doSubmit={doSubmit}
      schema={schema}
      data={loginData}
      setData={setLoginData}
    >
      {(renderInput, renderButton, renderText, renderRadioButtons) => {
        return (
          <>
            {renderInput("email", "Email", "text", false)}
            {renderInput("password", "Password", "text", false)}

            {renderButton("Login")}
            {renderText("signup", "Don't have an account?", "signup")}
          </>
        );
      }}
    </FormTemplate>
  );
};

export default LoginForm;
