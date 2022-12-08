import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/authSlice";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import tw from "twrnc";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [selectedTable, setSelectedTable] = useState();
  return (
    <SafeAreaView style={tw`flex-1`}>
      {/* <Text style={tw`font-bold text-8 text-center mt-5`}>Select a Table</Text> */}
      <View style={tw`flex-1 justify-center`}>
        <Picker
          selectedValue={selectedTable}
          onValueChange={(itemValue, itemIndex) => setSelectedTable(itemValue)}
        >
          <Picker.Item label="Table 1" value="table1" />
          <Picker.Item label="Table 2" value="table2" />
          <Picker.Item label="Table 3" value="table3" />
          <Picker.Item label="Table 4" value="table4" />
          <Picker.Item label="Table 5" value="table5" />
          <Picker.Item label="Table 6" value="table6" />
          <Picker.Item label="Table 7" value="table7" />
          <Picker.Item label="Table 8" value="table8" />
        </Picker>
        <TouchableOpacity
          style={tw`flex flex-row justify-center items-center`}
          onPress={() => navigation.navigate("Tablescreen")}
        >
          <Image source={require("../../assets/couch4.png")} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
