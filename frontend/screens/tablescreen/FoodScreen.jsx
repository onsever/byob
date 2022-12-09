import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFetch } from "../../hooks/useFetch";

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
  const [foodData, setFoodData] = useState([]);
  const [cart, setCart] = useState([]);
  const { fetch, loading, loaded, result, error } = useFetch();

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
        result.map((x) => {
          return { ...x, quantity: 0 };
        })
      );
    }
  }, [loaded]);

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      image={item.image}
      price={`$ ${item.price}`}
      quantity={item.quantity}
      onIncrease={() => {
        setFoodData(
          foodData.map((x) => {
            if (x._id === item._id) {
              x.quantity += 1;
            }
            return x;
          })
        );
      }}
      onDecrease={() => {
        setFoodData(
          foodData.map((x) => {
            if (x._id === item._id) {
              x.quantity -= 1;
            }
            return x;
          })
        );
      }}
      onAdd={() => {
        let tempCart = [...cart];
        if (tempCart.length && tempCart.some((x) => x.foodId === item._id)) {
          tempCart = tempCart.map((x) => {
            if (x.foodId === item._id) {
              x.quantity = item.quantity;
            }
          });
          setCart(tempCart);
        } else {
          setCart([
            ...cart,
            {
              foodId: item._id,
              price: item.price,
              quantity: item.quantity,
              name: item.title,
            },
          ]);
        }
      }}
    />
  );
  return (
    <View style={tw`flex-1 bg-[#F9F9F9]`}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={foodData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // refreshing={loading}
          // refreshControl={loading && <ActivityIndicator />}
          // onRefresh={() => fetchMenu()}
        />
      )}
      <TouchableOpacity
        style={tw`bg-[#640100] m-3 p-3 rounded-lg`}
        onPress={() => navigation.navigate("CartScreen", { cart })}
      >
        <Text style={tw`text-center text-white text-4`}>
          View Cart ({cart.length})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoodScreen;
