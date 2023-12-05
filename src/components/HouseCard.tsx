import { View, Text } from "react-native";
import React from "react";
import { Card, Title, Paragraph, IconButton } from "react-native-paper";
import GradientDiv from "./reusable/GradientDiv";
import { house } from "../hooks/useGetPageData";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../App";
import { navigationRef } from "../utils/RootNavRef";

interface Props {
  house: house;
  user: User | undefined;
  onDelete: (house: house) => void;
}

const HouseCard = ({ house, user, onDelete }: Props) => {
  const navigate = useNavigation<any>();

  const currentRoute = navigationRef.current?.getCurrentRoute();
  const currentScreen = currentRoute?.name;
  return (
    <View key={house._id}>
      <Card
        style={{
          justifyContent: "flex-start",
          minHeight: 300,
          marginTop: 40,
          marginHorizontal: 8,
          backgroundColor: "#080732",
        }}
        onPress={() =>
          user
            ? navigate.navigate("homeView", { id: house._id })
            : navigate.navigate("login")
        }
      >
        <Card.Cover
          source={require("../../assets/no-image-placeholder.webp")}
        />
        <Card.Content
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Title style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              {`Area: ${house.location.name}`}
            </Title>
            <Paragraph
              style={{ color: "white", fontSize: 17, marginTop: 10 }}
            >{`distance: ${parseInt(house.distance) / 1000}km`}</Paragraph>
            <Paragraph style={{ color: "green", fontSize: 20, marginTop: 10 }}>
              ${house.price}
            </Paragraph>
          </View>
          {currentScreen === "my-assets" && (
            <IconButton
              icon="delete"
              style={{ top: 54 }}
              onPress={() => {
                onDelete(house);
              }}
            />
          )}
        </Card.Content>
      </Card>
      <GradientDiv />
    </View>
  );
};

export default HouseCard;
