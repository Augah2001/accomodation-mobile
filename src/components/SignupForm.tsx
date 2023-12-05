import Joi from "joi";
import { useState } from "react";
import FormTemplate from "./reusable/FormTemplate";
import { ScrollView, View } from "react-native";
import apiClient from "../services/apiClient";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../App";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

interface Props {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const Signup = ({ user, setUser }: Props) => {
  const navigate = useNavigation<any>();
  const [userData, setUserData] = useState<{ [key: string]: string }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
    authorization_key: "",
  });

  const [localContext, setlocalContext] = useState<{ [key: string]: any }>({
    landlordDiv: false,
  });

  const handleRadioChange = (id: string, value: string) => {
    setUserData({ ...userData, [id]: value });
    if (value === "landlord") {
      setlocalContext({ ...localContext, landlordDiv: true });
    } else {
      setlocalContext({ ...localContext, landlordDiv: false });
    }
  };

  const schema: Joi.ObjectSchema<any> & { [key: string]: any } = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string()
      .label("Email")
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com"] },
        ignoreLength: true,
      })
      .required(),
    password: Joi.string().required(),
    userType: Joi.string().required().label("user type"),
    authorization_key:
      userData.userType === "landlord"
        ? Joi.string().required()
        : Joi.string().allow(""),
  });

  const doSubmit = () => {
    if (userData.userType === "tenant") {
      delete userData["authorization_key"];
      apiClient
        .post("/users", userData)
        .then((res) => {
          SecureStore.setItemAsync("token", res.headers["x-auth-token"]);

          const user: User = jwtDecode(res.headers["x-auth-token"]);
          console.log(res.headers["x-auth-token"]);

          navigate.navigate("home");
          setUser(user);
        })
        .catch((err) => console.log(err));
    } else {
      apiClient
        .post("/auth", { authorization_key: userData.authorization_key })
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            apiClient
              .post("/users", userData)
              .then((res) => {
                SecureStore.setItemAsync("token", res.headers["x-auth-token"]);

                const user: User = jwtDecode(res.headers["x-auth-token"]);
                console.log(res.data);
                navigate.navigate("home");
                setUser(res.data);
                console.log(user);
              })
              .catch((err) => console.log(err.response.data));
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          return;
        });
    }
  };

  return (
    <FormTemplate
      doSubmit={doSubmit}
      schema={schema}
      data={userData}
      setData={setUserData}
    >
      {(renderInput, renderButton, renderText, renderRadioButtons) => {
        return (
          <>
            {renderInput("firstName", "First Name", "text", false)}
            {renderInput("lastName", "Last Name", "text", false)}
            {renderInput("email", "Email", "text", false)}
            {renderInput("password", "Password", "text", false)}
            {renderRadioButtons(
              "userType",
              [
                { label: "Tenant", value: "tenant" },
                { label: "Landlord", value: "landlord" },
              ],
              handleRadioChange
            )}

            {renderInput(
              "authorization_key",
              "Authorization Key (landlord)",
              "text",
              userData.userType === "tenant"
            )}
            {renderButton("Join")}
            {renderText("login", "already have an account?", "login")}
          </>
        );
      }}
    </FormTemplate>
  );
};

export default Signup;
