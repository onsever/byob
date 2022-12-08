import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function ProfileScreen() {
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
