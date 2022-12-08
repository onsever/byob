import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { FoodData } from "../../utils/FoodData";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Item = ({ image, title, price }) => (
  <View
    style={tw`flex flex-row bg-[#F9F9F9] px-5 py-7 justify-center items-center`}
  >
    <View style={tw`w-20`}>
      <Image
        source={image ? { uri: image } : require("../../assets/momo.jpeg")}
        style={tw`w-15 h-15`}
      />
    </View>
    <View style={tw`w-60`}>
      <Text style={tw`mb-2 text-5 font-thin`}>{title}</Text>
      <Text style={tw`mb-2 text-[#640100]`}>{price}</Text>
      <View style={tw`flex flex-row`}>
        <TouchableOpacity>
          <Text
            style={tw`w-5 h-5 border-[#D9D9D9] border text-center rounded-md mr-3 `}
          >
            +
          </Text>
        </TouchableOpacity>

        <Text style={tw`font-bold`}>1</Text>
        <TouchableOpacity>
          <Text
            style={tw`w-5 h-5 border-[#D9D9D9] border text-center rounded-md ml-3`}
          >
            -
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={tw`w-10`}>
      <Ionicons name="add-circle" size={32} color="#640100" />
    </View>
  </View>
);

const FoodScreen = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} image={item.image} price={`$ ${item.price}`} />
  );
  return (
    <View style={tw`flex-1 bg-[#F9F9F9]`}>
      <FlatList
        data={FoodData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default FoodScreen;
