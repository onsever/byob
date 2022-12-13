import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { usePost } from "../../hooks/usePost";
import { selectOrder, storeOrder } from "../../redux/features/authSlice";
import tw from "twrnc";

export default function OrderHistory({ navigation }) {
  const { post, loading, loaded, result, error } = usePost();
  const order = useSelector(selectOrder);
  const [cart, setCart] = useState(order.order || []);

  const dispatch = useDispatch();

  console.log(cart);

  const onPlaceOrder = (orders) => {
    orders = orders.map((x) => {
      return x;
    });
    post("order", { order: orders });
  };

  useEffect(() => {
    if (error) {
      console.log("Error in palce order", error);
      Alert.alert("Place order failed", error.data || error);
    }
    if (result) {
      let newOrder = [];
      cart.forEach((item) => {
        newOrder.push({
          ...item,
          orderPlaced: true,
          orderPlacedQty: item.quantity,
        });
      });
      dispatch(
        storeOrder({
          ...order,
          order: newOrder,
        })
      );
      Alert.alert("Order Successfully");
      navigation.goBack();
    }
  }, [loaded]);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#f9f9f9]`}>
      <ScrollView style={tw`mt-5`}>
        {cart.map((order) => {
          return (
            <View
              style={tw`flex flex-row bg-white px-5 py-7 justify-center items-center mx-4 mb-2 rounded-lg shadow-md`}
            >
              <View style={tw`w-20 mr-3`}>
                <Image
                  source={
                    order.image
                      ? { uri: order.image }
                      : require("../../assets/Food.png")
                  }
                  style={tw`w-20 h-20`}
                />
              </View>
              <View style={tw`w-60`}>
                <Text style={tw`mb-2 text-5 font-thin`}>{order.name}</Text>
                <Text style={tw`mb-2 font-bold`}>$ {order.price}</Text>
                <Text style={tw`mb-2 font-thin`}>Qty: {order.quantity}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
