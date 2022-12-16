import { useEffect, useState, useLayoutEffect } from "react";
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

export default function CartScreen({ navigation, route }) {
  const { post, loading, loaded, result, error } = usePost();
  const order = useSelector(selectOrder);
  // const [fullCart, setFullCart] = useState(order.order || []);
  const cart = route.params.cart;

  const dispatch = useDispatch();

  console.log(cart);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Cart",
    });
  }, [navigation]);

  const onPlaceOrder = (orders) => {
    orders = orders.map((x) => {
      return x;
    });
    let orderHistory = [...orders];

    orders.map((item) => {
      if (orderHistory.some((x) => x.foodId === item.foodId)) {
        orderHistory = orderHistory.map((o) => {
          let order = { ...o };
          if (order.foodId === item.foodId) {
            order.quantity = +item.quantity;
          } else {
            orderHistory.push(item);
          }

          return order;
        });
      } else {
        orderHistory.push(item);
      }
    });

    // if(order.order)
    dispatch(storeOrder(orderHistory));
    post("order", { order: orderHistory });
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
      route.params.goBackHandler();
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
      <TouchableOpacity
        onPress={() => onPlaceOrder([...cart])}
        style={tw`items-center p-3`}
      >
        <Image
          source={require("../../assets/placeOrder.png")}
          style={tw`w-20 h-20`}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
