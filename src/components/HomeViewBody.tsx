import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Card, Divider, List, Paragraph, Title } from "react-native-paper";
import GradientDiv from "./reusable/GradientDiv";
import { house } from "../hooks/useGetPageData";
import { useRoute } from "@react-navigation/native";
import FormButton from "./reusable/FormButton";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
interface Props {
  houses: house[];
}

export interface moreDetails {
  curfew: boolean | null;
  houseNumber: number | null;
  distance: string | null;
  [key: string]: string | boolean | number | null;
}

const HomeViewBody = ({ houses }: Props) => {
  const { params } = useRoute<any>();

  const house = houses.find((house) => house._id === params.id);

  const moreDetails: moreDetails = {
    curfew: null,
    houseNumber: null,
    distance: "",
  };

  for (let key1 in house) {
    for (let key2 in moreDetails) {
      if (key1 === key2) {
        if (key2 === "distance") {
          moreDetails[key2] = `${house[key1] / 1000}km`;
        } else {
          moreDetails[key2] = house[key1];
        }
      }
    }
  }
  return (
    <ScrollView key={house?._id}>
      <Card
        style={{
          justifyContent: "flex-start",
          minHeight: 300,
          marginTop: 40,
          marginHorizontal: 8,
          backgroundColor: "#080732",
        }}
      >
        <Card.Cover
          source={require("../../assets/no-image-placeholder.webp")}
        />
        <Card.Content>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Title
              style={{ color: "dodgerblue", fontSize: 20, fontWeight: "bold" }}
            >
              {`Area: ${house?.location.name}`}
            </Title>
            <View style={{ marginBottom: 20, bottom: 38 }}>
              <FormButton label="CLAIM" handlePress={() => {}} />
            </View>
          </View>
          {
            <Paragraph
              style={{ color: "white", fontSize: 17, marginTop: 10 }}
            >{`distance: ${
              house && parseInt(house?.distance) / 1000
            }km`}</Paragraph>
          }
          {
            <Paragraph
              style={{ color: "white", fontSize: 17, marginTop: 10 }}
            >{`capacity: ${house && house.capacity}`}</Paragraph>
          }
          {
            <Paragraph style={{ color: "green", fontSize: 20, marginTop: 15 }}>
              ${house?.price}
            </Paragraph>
          }
          <Divider style={{ top: 10 }} />

          <Title
            style={{
              color: "dodgerblue",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 40,
            }}
          >
            {`More Details`}
          </Title>
          {Object.keys(moreDetails).map((key, index) => (
            <List.Item
              key={index}
              title={
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text
                    style={{ color: "white", fontWeight: "700" }}
                  >{`${key}: `}</Text>
                  <Text
                    style={{ color: "white" }}
                  >{`${moreDetails[key]}`}</Text>
                </View>
              }
            />
          ))}
          <Divider />
          <Title
            style={{
              color: "dodgerblue",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 40,
            }}
          >
            {`Services`}
          </Title>
          {house?.services.map((item, index) => (
            <List.Item
              key={index}
              title={<Text style={{ color: "white" }}>{item}</Text>}
            />
          ))}
        </Card.Content>
      </Card>
      <GradientDiv />
    </ScrollView>
  );
};

export default HomeViewBody;
