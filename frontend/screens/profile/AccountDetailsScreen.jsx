import React from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import moment from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AccountDetailsScreen({ route, navigation }) {
  const { user } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Account Details",
    });
  }, []);

  const dateParser = (date) => {
    return moment(date).format("MMMM Do YYYY");
  };

  return (
    <SafeAreaView>
      <View style={tw`items-center`}>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={120} color="#640100" />
        </TouchableOpacity>
      </View>
      <View style={tw`mx-8 my-4 bg-white px-5  rounded-lg`}>
        <View
          style={tw`flex-row justify-between border-b py-4 border-[#d0d0d0]`}
        >
          <Text style={tw`font-bold text-lg`}>First Name: </Text>
          <Text style={tw`text-lg`}>{user.firstName}</Text>
        </View>
        <View
          style={tw`flex-row justify-between border-b py-4 border-[#d0d0d0]`}
        >
          <Text style={tw`font-bold text-lg`}>Last Name: </Text>
          <Text style={tw`text-lg`}>{user.lastName}</Text>
        </View>
        <View
          style={tw`flex-row justify-between border-b py-4 border-[#d0d0d0]`}
        >
          <Text style={tw`font-bold text-lg`}>Email: </Text>
          <Text style={tw`text-lg`}>{user.email}</Text>
        </View>
        <View
          style={tw`flex-row justify-between border-b py-4 border-[#d0d0d0]`}
        >
          <Text style={tw`font-bold text-lg`}>Phone: </Text>
          <Text style={tw`text-lg`}>{user.phone}</Text>
        </View>
        <View style={tw`flex-row justify-between py-4`}>
          <Text style={tw`font-bold text-lg`}>Date of Birth: </Text>
          <Text style={tw`text-lg`}>{dateParser(user.dob)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
