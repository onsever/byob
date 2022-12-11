import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";
import { getDrinkImage } from "../../utils/DrinkData";
import { usePost } from "../../hooks/usePost";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder, storeOrder } from "../../redux/features/authSlice";

const DrinkDescription = ({ navigation, route }) => {
  const { item, title, goBack } = route.params;
  const [drinkOrder, setDrinkOrder] = useState({
    drinkId: item._id,
    price: item.currentPrice,
    quantity: "1",
    name: item.name,
  });

  const { post, loading, loaded, result, error } = usePost();
  const dispatch = useDispatch();
  const order = useSelector(selectOrder);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, []);

  React.useEffect(() => {
    if (error) {
      console.log("Error on drink bidding", error);
      Alert.alert("Bid Failed", error.data || error);
    }

    if (result) {
      // dispatch(storeOrder({...order, drinkOrder: [order.drinkOrder]}))
      Alert.alert(
        "Congratulations",
        "Your bid has been accepted. Your drink will be served to you in a while."
      );
      goBack();
      navigation.goBack();
    }
  }, [loaded]);

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
          <TextInput
            style={tw`h-10 border-b-2 border-[#C5C5C5] w-50`}
            value={drinkOrder.price}
            onChangeText={(text) =>
              setDrinkOrder({ ...drinkOrder, price: text })
            }
          />
        </View>
        <View style={tw`flex flex-row items-center justify-around mb-2`}>
          <Text style={tw`font-bold text-4`}>Qnty</Text>
          <Picker
            selectedValue={drinkOrder.quantity}
            onValueChange={(itemValue) =>
              setDrinkOrder({ ...drinkOrder, quantity: itemValue })
            }
            style={tw`w-50`}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>
        <TouchableOpacity
          style={tw`flex items-center`}
          onPress={() => {
            console.log("drink order", drinkOrder);
            post("order/drink", drinkOrder);
          }}
        >
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