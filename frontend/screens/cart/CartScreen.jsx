import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { usePost } from "../../hooks/usePost";
import { selectOrder, storeOrder } from "../../redux/features/authSlice";

export default function CartScreen({ navigation }) {
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
    <SafeAreaView>
      <Text>Order</Text>
      {cart.map((order) => {
        return (
          <View style={{ borderWidth: 1, margin: 5, padding: 10 }}>
            <Text>Name: {order.name}</Text>
            <Text>Price: {order.price}</Text>
            <Text>Quantity: {order.quantity}</Text>
          </View>
        );
      })}
      <TouchableOpacity
        onPress={() => onPlaceOrder([...cart])}
        style={{
          backgroundColor: "grey",
          margin: 10,
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
