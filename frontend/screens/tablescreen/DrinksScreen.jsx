import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { DrinkData } from "../../utils/DrinkData";

const Item = ({ name, marketPrice, guaranteedPrice }) => (
  <View style={tw`mt-3`}>
    <TouchableOpacity style={tw`flex flex-row`}>
      <Text style={tw`font-thin w-50 `}>{name}</Text>
      <Text style={tw`w-20 text-center`}>$ {marketPrice}</Text>
      <Text style={tw`w-20 text-center`}>$ {guaranteedPrice}</Text>
    </TouchableOpacity>
  </View>
);
const DrinksScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex flex-row bg-[#F9F9F9] p-5 items-center`}>
        <Text style={tw`font-bold w-50 text-6`}>Drinks </Text>
        <Text style={tw`font-bold w-20`}>Market Price</Text>
        <Text style={tw`font-bold w-20`}>Guaranteed Price</Text>
      </View>
      <SectionList
        style={tw`mx-5`}
        sections={DrinkData}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item {...item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={tw`border-b-2 border-[#640100] w-full pb-3 my-3`}>
            <Text style={tw`font-semibold text-5 `}>{title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default DrinksScreen;
