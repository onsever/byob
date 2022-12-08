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
import Ionicons from "@expo/vector-icons/Ionicons";

const Item = ({ name, marketPrice, guaranteedPrice, currentPrice }) => (
  <View style={tw`mt-3`}>
    <TouchableOpacity style={tw`flex flex-row`}>
      <Text style={tw`font-thin w-40 `}>{name}</Text>
      <Text style={tw`w-15 text-center`}>$ {marketPrice}</Text>
      <Text style={tw`w-15 text-center`}>$ {guaranteedPrice}</Text>
      <Text style={tw`w-15 text-center`}>$ {currentPrice}</Text>
    </TouchableOpacity>
  </View>
);
const DrinksScreen = () => {
  const [label, setLabel] = React.useState(null);

  const labelHandler = (str) => {
    switch (str) {
      case "MP":
        setLabel("Market Price");
        break;
      case "GP":
        setLabel("Guaranteed Price");
        break;
      case "CP":
        setLabel("Current Price");
        break;
      default:
        break;
    }

    setTimeout(() => {
      setLabel(null);
    }, 2000);
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex flex-row bg-[#F9F9F9] p-5 items-center`}>
        <Text style={tw`font-bold w-40 text-6`}>Drinks </Text>
        {label ? (
          <Text style={tw`font-bold text-center`}>{label}</Text>
        ) : (
          <>
            <TouchableOpacity
              style={tw`flex flex-row items-center w-15`}
              onPress={() => labelHandler("MP")}
            >
              <Text style={tw`font-bold `}>MP</Text>
              <Ionicons name="information-circle" size={20} color="#640100" />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex flex-row items-center w-15`}
              onPress={() => labelHandler("GP")}
            >
              <Text style={tw`font-bold`}>GP</Text>
              <Ionicons name="information-circle" size={20} color="#640100" />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex flex-row items-center w-15`}
              onPress={() => labelHandler("CP")}
            >
              <Text style={tw`font-bold`}>CP</Text>
              <Ionicons name="information-circle" size={20} color="#640100" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <SectionList
        style={tw`mx-5 mb-5`}
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
