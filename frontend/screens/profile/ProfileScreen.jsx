import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import { logout } from "../../redux/features/authSlice";
import { getData } from "../../utils/asyncStorage";
import moment from "moment";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState();

  useEffect(() => {
    async function getUser() {
      const user = await getData("user");
      console.log("user", user);
      setUser(user);
    }

    getUser();
  }, []);

  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      {user ? (
        <View>
          <Text>
            Name: {user.firstName} {user.lastName}
          </Text>
          <Text>Email: {user.email}</Text>
          <Text>Phone: {user.phone}</Text>
          <Text>DOB: {moment(user.dob).format("DD MMMM, YYYY")}</Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}

      <TouchableOpacity
        style={tw`flex flex-row justify-center items-center`}
        onPress={() => {
          dispatch(logout());
          navigation.replace("Auth");
        }}
      >
        <Image source={require("../../assets/wine_glass.png")} />
        <Text style={tw`text-[#640100] ml-[-4%]`}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}