import { View, Text } from "react-native";
import React, { useState } from "react";
import { Menu, Appbar, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

interface Props {
  threeDotsMenuItems: { [key: string]: string }[];
}

const ThreeDotsMenu = ({ threeDotsMenuItems }: Props) => {
  const navigate = useNavigation<any>();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View
      style={{
        paddingTop: 50,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            onPress={openMenu}
            style={{ borderColor: "purple", bottom: 25, left: 14 }}
            color="purple"
          />
        }
      >
        {threeDotsMenuItems.map((item: { [key: string]: string }) => (
          <View key={item.value}>
            <Menu.Item
              onPress={() => navigate.navigate(item.value)}
              title={item.label}
            />
            <Divider />
          </View>
        ))}
      </Menu>
    </View>
  );
};

export default ThreeDotsMenu;
