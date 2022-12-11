import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFetch } from "../../hooks/useFetch";

const Item = ({
  title,
  price,
  guranteedPrice,
  currentPrice,
  onAction,
  _id,
}) => (
  <View style={tw`mt-3`} key={_id}>
    <TouchableOpacity style={tw`flex flex-row`} onPress={onAction}>
      <Text style={tw`font-thin w-40 `}>{title}</Text>
      <Text style={tw`w-15 text-center`}>${price}</Text>
      <Text style={tw`w-15 text-center`}>${guranteedPrice}</Text>
      <Text style={tw`w-15 text-center`}>${currentPrice}</Text>
    </TouchableOpacity>
  </View>
);
const DrinksScreen = ({ navigation }) => {
  const [label, setLabel] = React.useState(null);
  const [drinkData, setDrinkData] = useState([]);
  const { fetch, loading, loaded, result, error } = useFetch();

  useEffect(() => {
    fetch("menu/drink");
  }, []);

  useEffect(() => {
    if (error) {
      console.log("Error in getting drinks", error);
    }
    if (result) {
      setDrinkData(result);
    }
  }, [loaded]);

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

  const handleBack = () => {
    fetch("menu/drink");
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

      {loading ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          style={tw`mx-5 mb-5`}
          sections={drinkData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, section }) => (
            <Item
              {...item}
              onAction={() => {
                navigation.navigate("DrinkDescription", {
                  item: item,
                  title: section.title,
                  goBack: handleBack,
                });
              }}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={tw`border-b-2 border-[#640100] w-full pb-3 my-3`}>
              <Text style={tw`font-semibold text-5 `}>{title}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default DrinksScreen;