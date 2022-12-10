import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";
import { getDrinkImage } from "../../utils/DrinkData";

const DrinkDescription = ({ navigation, route }) => {
  const { item, title } = route.params;
  const [selectedQty, setSelectedQty] = useState();
  console.log("item.image", item.image);
  const [base64Image, setBase64Image] = useState(item.image);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, []);

  return (
    <SafeAreaView style={tw`w-full h-full`}>
      <View style={tw`mx-10 my-5 flex`}>
        <View style={tw`flex items-center`}>
          <Image
            source={getDrinkImage(item.image)}
            style={tw`w-40 h-50 mb-5`}
          />

          <Text style={tw`text-6 font-bold mb-2`}>{item.name}</Text>
        </View>

        <View style={tw`flex flex-row items-end justify-around`}>
          <Text style={tw`font-bold text-4`}>Price</Text>
          <TextInput style={tw`h-10 border-b-2 border-[#C5C5C5] w-50`} />
        </View>
        <View style={tw`flex flex-row items-center justify-around mb-2`}>
          <Text style={tw`font-bold text-4`}>Qnty</Text>
          <Picker
            selectedValue={selectedQty}
            onValueChange={(itemValue, itemIndex) => setSelectedQty(itemValue)}
            style={tw`w-50`}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>
        <TouchableOpacity style={tw`flex items-center`}>
          <Image
            source={require("../../assets/bid.png")}
            style={tw`w-30 h-30 mb-5`}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DrinkDescription;
