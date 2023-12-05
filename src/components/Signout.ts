import { useNavigation } from "@react-navigation/native";
import { Dispatch, SetStateAction, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { User } from "../../App";
interface Props {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

const Signout = ({ user, setUser }: Props) => {
  console.log(user);
  const navigate = useNavigation<any>();
  useEffect(() => {
    SecureStore.deleteItemAsync("token");
    setUser(undefined);

    navigate.navigate("home");
  }, []);

  return null;
};

export default Signout;
