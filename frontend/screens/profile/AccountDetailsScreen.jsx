import React from "react";
import { View, Text, TextInput } from "react-native";
import tw from "twrnc";
import moment from "moment";

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
    <View style={tw`items-center justify-center my-4`}>
      <View style={tw`flex-row`}>
        <Text style={tw`font-bold text-lg`}>First Name: </Text>
        <Text style={tw`text-lg`}>{user.firstName}</Text>
      </View>
      <View style={tw`flex-row`}>
        <Text style={tw`font-bold text-lg`}>Last Name: </Text>
        <Text style={tw`text-lg`}>{user.lastName}</Text>
      </View>
      <View style={tw`flex-row`}>
        <Text style={tw`font-bold text-lg`}>Email: </Text>
        <Text style={tw`text-lg`}>{user.email}</Text>
      </View>
      <View style={tw`flex-row`}>
        <Text style={tw`font-bold text-lg`}>Phone Number: </Text>
        <Text style={tw`text-lg`}>{user.phone}</Text>
      </View>
      <View style={tw`flex-row`}>
        <Text style={tw`font-bold text-lg`}>Date of Birth: </Text>
        <Text style={tw`text-lg`}>{dateParser(user.dob)}</Text>
      </View>
    </View>
  );
}
