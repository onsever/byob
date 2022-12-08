import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import tw from "twrnc";
import { usePost } from '../../hooks/usePost';
import { useFetch } from '../../hooks/useFetch';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [selectedTable, setSelectedTable] = useState("1");
  const [noOfTables, setNoOfTables] = useState(0);

  const fetchConstants = useFetch();
  const reserveTable = usePost();

  useEffect(() => {
    fetchConstants.fetch('constant');
  }, [])

  useEffect(() => {
    if (fetchConstants.error) {
      console.log('Error in fetch constant', fetchConstants.error);
    }

    if (fetchConstants.result) {
      setNoOfTables(+fetchConstants.result.find(x => x.key === "noOfTables").value)
    }
  }, [fetchConstants.loaded])

  useEffect(() => {
    if (reserveTable.error) {
      console.log('Error in reserve Table', reserveTable.error);
      Alert.alert("Reservation Failed", reserveTable.error.data || reserveTable.error)
    }

    if (reserveTable.result) {
      console.log('result', reserveTable.result);
      navigation.replace('Tablescreen')
    }
  }, [reserveTable.loaded])

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1 justify-center`}>
        <Picker
          selectedValue={selectedTable}
          onValueChange={(itemValue, itemIndex) => setSelectedTable(itemValue)}
        >
          {Array(noOfTables).fill("").map((x, i) => {
            return <Picker.Item label={`Table ${i + 1}`} value={i + 1} />
          })}
        </Picker>
        <TouchableOpacity
          style={tw`flex flex-row justify-center items-center`}
          onPress={() => {
            reserveTable.post('table', { tableNo: selectedTable })
          }

            // navigation.navigate("Tablescreen", {
            //   tableNumber: selectedTable,
            // })
          }
        >
          <Image source={require("../../assets/couch4.png")} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
