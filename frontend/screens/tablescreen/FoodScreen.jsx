import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFetch } from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder, storeOrder } from "../../redux/features/authSlice";

const Item = ({
  image,
  title,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onAdd,
}) => (
  <View
    style={tw`flex flex-row bg-[#F9F9F9] px-5 py-7 justify-center items-center`}
  >
    <View style={tw`w-20`}>
      <Image
        source={image ? { uri: image } : require("../../assets/Food.png")}
        style={tw`w-15 h-15`}
      />
    </View>
    <View style={tw`w-60`}>
      <Text style={tw`mb-2 text-5 font-thin`}>{title}</Text>
      <Text style={tw`mb-2 text-[#640100]`}>{price}</Text>
      <View style={tw`flex flex-row`}>
        <TouchableOpacity onPress={onDecrease}>
          <Text
            style={tw`w-5 h-5 border-[#D9D9D9] border text-center rounded-md mr-3 `}
          >
            -
          </Text>
        </TouchableOpacity>

        <Text style={tw`font-bold`}>{quantity}</Text>
        <TouchableOpacity onPress={onIncrease}>
          <Text
            style={tw`w-5 h-5 border-[#D9D9D9] border text-center rounded-md ml-3`}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity style={tw`w-10`} onPress={onAdd}>
      <Ionicons name="add-circle" size={32} color="#640100" />
    </TouchableOpacity>
  </View>
);

const FoodScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [foodData, setFoodData] = useState([]);
  const [cart, setCart] = useState([]);
  const { fetch, loading, loaded, result, error } = useFetch();
  const order = useSelector(selectOrder);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = () => {
    fetch("menu/food");
  };

  useEffect(() => {
    if (error) {
      console.log("Error in fetch constant", error);
    }

    if (result) {
      setFoodData(
        result.map((item) => {
          let quantity = 0;
          let orderPlaced = false;
          let orderPlacedQty = 0;
          if (
            order?.order?.length &&
            order.order.some((x) => x.foodId === item._id)
          ) {
            let food = order.order.find((x) => x.foodId === item._id);
            quantity = food.quantity;
            orderPlaced = food.orderPlaced;
            orderPlacedQty = food.orderPlacedQty;
          }
          return {
            foodId: item._id,
            price: item.price,
            quantity: quantity,
            name: item.title,
            image: item.image,
            orderPlaced: orderPlaced,
            orderPlacedQty: orderPlacedQty,
          };
        })
      );
    }

    if (order) {
      setCart(order.order || []);
    }
  }, [loaded, order]);

  const renderItem = ({ item }) => (
    <Item
      title={item.name}
      image={item.image}
      price={`$ ${item.price}`}
      quantity={item.quantity}
      onIncrease={() => {
        setFoodData(
          foodData.map((x) => {
            if (x.foodId === item.foodId) {
              x.quantity += 1;
            }
            return x;
          })
        );
      }}
      onDecrease={() => {
        if (item.orderPlaced && item.quantity - 1 < item.orderPlacedQty)
          Alert.alert(
            "Already Ordered",
            "This item has already been ordered, Please consult a server if you want to decrese the quantity."
          );
        else
          setFoodData(
            foodData.map((x) => {
              if (x.foodId === item.foodId) {
                x.quantity -= 1;
              }
              return x;
            })
          );
      }}
      onAdd={() => {
        if (item.quantity > 0) {
          let tempCart = [...cart];
          if (tempCart.length && tempCart.some((x) => x.foodId === item.foodId)) {
            tempCart = tempCart.filter((x) => x.foodId !== item.foodId);
            tempCart.push(item);
            dispatch(storeOrder({ ...order, order: tempCart }));
          } else {
            dispatch(storeOrder({ ...order, order: [...cart, item] }));
          }
        }
      }}
    />
  );
  return (
    <View style={tw`flex-1 bg-[#F9F9F9]`}>
      <FlatList
        data={foodData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchMenu} />
        }
      />
      <TouchableOpacity
        style={tw`bg-[#640100] m-3 p-3 rounded-lg`}
        onPress={() => navigation.navigate("CartScreen")}
      >
        <Text style={tw`text-center text-white text-4`}>
          View Cart ({cart.length})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoodScreen;
