import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import { logout } from "../../redux/features/authSlice";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <Text>ProfileScreen</Text>
      <TouchableOpacity
        style={tw`flex flex-row justify-center items-center`}
        onPress={() => {
          dispatch(logout());
        }}
      >
        <Image source={require("../../assets/wine_glass.png")} />
        <Text style={tw`text-[#640100] ml-[-4%]`}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
