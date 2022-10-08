import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import DirectMessage from "../../components/DirectMessage";

const DirectMesaageScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);

  return (
    <SafeAreaView
      style={{
        width,
        height,
        backgroundColor: colorMode === "light" ? "#FAFAFA" : "black",
      }}
    >
      <View
        style={[
          tw`px-5 py-3`,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={32}
            color={colorMode === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "OpenSans_600SemiBold",
            color: colorMode === "light" ? "black" : "white",
          }}
        >
          justgreat
          <MaterialIcons
            name="keyboard-arrow-down"
            size={18}
            color={colorMode === "light" ? "black" : "white"}
          />
        </Text>
        <Octicons
          name="plus"
          size={24}
          color={colorMode === "light" ? "black" : "white"}
        />
      </View>

      <View
        style={[
          tw`${
            colorMode === "light" ? "bg-zinc-200" : "bg-zinc-900 "
          } mx-3 rounded-lg py-3 pl-5`,
          {
            flexDirection: "row",
            alignItems: "center",
          },
        ]}
      >
        <Octicons name="search" size={20} color="gray" />
        <View style={tw`mx-2`}>
          <TextInput
            style={{
              fontSize: 16,
              fontFamily: "OpenSans_400Regular",
              color: "gray",
            }}
            placeholderTextColor={colorMode === "light" ? "black" : "white"}
            placeholder="Search"
          />
        </View>
      </View>
      <DirectMessage />
    </SafeAreaView>
  );
};

export default DirectMesaageScreen;
