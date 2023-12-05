import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { Menu, Appbar, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

interface Props {
  threeDotsMenuItems: any;
}

const UserImageMenu = ({ threeDotsMenuItems }: Props) => {
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
        left: 35,
      }}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action
            icon="account"
            onPress={openMenu}
            style={{ borderColor: "green", bottom: 25, borderWidth: 1.5 }}
            color="green"
          />
        }
      >
        {threeDotsMenuItems.map(
          (
            item: { [key: string]: string },
            index: React.Key | null | undefined
          ) => (
            <View key={index}>
              <Menu.Item
                onPress={() => navigate.navigate(item.value)}
                title={item.label}
              />
              <Divider />
            </View>
          )
        )}
      </Menu>
    </View>
  );
};

export default UserImageMenu;
