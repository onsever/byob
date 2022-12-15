import React from "react";
import {
  Alert,
  View,
  ActivityIndicator,
  SectionList,
  Text,
  Image,
  RefreshControl,
} from "react-native";
import { useFetch } from "../../hooks/useFetch";
import tw from "twrnc";
import moment from "moment";
import { getDrinkImage } from "../../utils/DrinkData";

export default function AccountOrderHistoryScreen({ navigation }) {
  const [data, setData] = React.useState(null);
  const [tableData, setTableData] = React.useState(null);
  const { loading, result, error, loaded, fetch } = useFetch();

  const dateParser = (date) => {
    return moment(date).format("MMMM Do YYYY");
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Order History",
    });
  }, []);

  React.useEffect(() => {
    fetch("table/all");
  }, []);

  React.useEffect(() => {
    if (loaded) {
      if (error) {
        Alert.alert("Error", error);
        setIsDataReady(false);
      }
      if (result) {
        setData(result);
      }
    }
  }, [loaded]);

  React.useEffect(() => {
    setTableData(
      data
        ?.map((item) => {
          return {
            title: dateParser(item?.createdAt),
            data: item?.order?.concat(
              item?.drinkOrder.map((x) => {
                x.isDrink = true;
                return x;
              })
            ),
          };
        })
        .filter((i) => i?.data !== undefined)
    );
  }, [data]);

  return (
    <View style={tw`w-full h-full items-center justify-start`}>
      {loading && !loaded ? (
        <ActivityIndicator
          size="large"
          color="black"
          style={tw`items-center justify-center`}
        />
      ) : (
        <View style={tw`w-full`}>
          <SectionList
            sections={tableData || []}
            keyExtractor={(item, index) => item + index}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => fetch("table/all")}
              />
            }
            renderItem={({ item }) => {
              console.log(item);
              return (
                <View
                  style={tw`flex-row items-center px-4 mb-4 bg-white shadow-md py-2`}
                >
                  <Image
                    source={
                      item?.isDrink
                        ? getDrinkImage(item?.image || "")
                        : item?.image?.trim()
                        ? {
                            uri: item?.image,
                          }
                        : require("../../assets/Food.png")
                    }
                    style={tw`w-16 h-16 rounded-full`}
                  />
                  <View>
                    <Text style={tw`font-semibold ml-4 mb-1`}>
                      {item?.name}
                    </Text>
                    <Text style={tw`ml-4`}>Quantity: {item?.quantity}x</Text>
                    <Text style={tw`ml-4`}>Price: {item?.price}$</Text>
                  </View>
                </View>
              );
            }}
            renderSectionHeader={({ section: { title } }) => (
              <View style={tw`bg-[#640100] px-4 py-2 mb-2`}>
                <Text style={tw`font-semibold text-white`}>{title}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
