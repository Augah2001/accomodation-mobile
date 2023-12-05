import { View, Text, Button, StatusBar, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Appbar, Menu, TextInput, Divider } from "react-native-paper";
import GradientDiv from "./GradientDiv";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import { house } from "../../hooks/useGetPageData";
import { Link, useNavigation } from "@react-navigation/native";
import { User } from "../../../App";

import UserImageMenu from "./UserImageMenu";
import ThreeDotsMenu from "./ThreeDotsMenu";

interface Props {
  houses: house[];
  searchQuery: string;
  handleSearchChange: (e: string) => void;
  user: User | undefined;
}

const Navbar = ({
  houses,
  searchQuery,
  handleSearchChange,
  user,
}: // navigation,
Props) => {
  const navigate = useNavigation<any>();

  const threeDotsMenuItems = [
    { label: "contact", value: "contact" },
    { label: "about us", value: "about" },
  ];
  const UserMenuItems = [
    user &&
      user.userType === "landlord" && {
        label: "my assets",
        value: "my-assets",
      },
    { label: "signout", value: "signout" },
  ];

  const newUserMenuItems = UserMenuItems.filter(
    (item) => item !== undefined || item !== false
  );
  console.log(newUserMenuItems);
  return (
    <>
      <View>
        <Appbar.Header
          style={{
            backgroundColor: "#000021",
            justifyContent: "space-between",
          }}
        >
          <Appbar.Action
            icon={require("../../../assets/icons8-house-64.png")}
            onPress={() => navigate.navigate("home")}
            color="purple"
            style={{
              borderColor: "purple",
              borderWidth: 1.5,
            }}
          />
          <TextInput
            left={
              <TextInput.Icon
                color="green"
                icon="magnify"
                style={{ right: 10 }}
              />
            }
            value={searchQuery}
            placeholder="Search"
            onChangeText={(e) => {
              console.log(e);
              handleSearchChange(e);
            }}
            style={{
              height: 34,
              backgroundColor: "whit",
              minWidth: "50%",
              paddingLeft: -10,
            }}
          />
          <View
            style={{
              height: 37,
              borderRadius: 5,
              left: 20,
              top: 1,
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }} // left
              end={{ x: 1, y: 0 }}
              colors={["transparent", "#6200ea"]}
              style={{ width: "100%", borderRadius: 40 }}
            >
              {/* <Link to="/signup"> */}
              {!user && (
                <Button
                  color="transparent"
                  title="join"
                  onPress={() => navigate.navigate("signup")}
                />
              )}
              {/* </Link> */}
            </LinearGradient>
          </View>
          {user && <UserImageMenu threeDotsMenuItems={newUserMenuItems} />}
          <ThreeDotsMenu threeDotsMenuItems={threeDotsMenuItems} />
        </Appbar.Header>
      </View>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#000021" />

        <GradientDiv />
      </View>
    </>
  );
};

export default Navbar;
