import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const GradientDiv = () => {
  return (
    <View
      style={{
        marginHorizontal: 3,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        height: 3,
      }}
    >
      <View style={{ width: "50%" }}>
        <LinearGradient
          start={{ x: 0, y: 0 }} // left
          end={{ x: 1, y: 0 }}
          colors={["transparent", "purple"]}
          style={{ width: "100%", height: "100%" }}
        ></LinearGradient>
      </View>
      <View style={{ width: "50%" }}>
        <LinearGradient
          start={{ x: 0, y: 0 }} // left
          end={{ x: 1, y: 0 }}
          colors={["purple", "transparent"]}
          style={{ width: "100%", height: "100%" }}
        ></LinearGradient>
      </View>
    </View>
  );
};

export default GradientDiv;
