import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode, toggleColor } = useContext(GeneralContext);

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
          tw`py-2 px-4 border-b ${
            colorMode === "light" ? "border-gray-300" : "border-zinc-700"
          }`,
          {
            flexDirection: "row",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={22}
            color={colorMode === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: colorMode === "light" ? "black" : "white",
            fontSize: 18,
            fontFamily: "OpenSans_600SemiBold",
          }}
        >
          Settings
        </Text>
      </View>

      <View style={tw`py-5 px-4`}>
        <Text
          style={{
            color: colorMode === "light" ? "black" : "white",
            fontFamily: "OpenSans_600SemiBold",
          }}
        >
          Display Settings
        </Text>

        <View
          style={[
            tw`mt-4 h-30`,
            {
              flexDirection: "row",
            },
          ]}
        >
          <TouchableOpacity
            style={[
              tw`${
                colorMode === "light"
                  ? "bg-white"
                  : "bg-zinc-900 border-2 border-blue-400"
              } rounded-lg mx-2 `,
              {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={() => {
              toggleColor("dark");
            }}
          >
            <Ionicons
              name="sunny"
              size={24}
              color={colorMode === "light" ? "black" : "white"}
            />
            <Text
              style={{
                color: colorMode === "light" ? "black" : "white",
                fontFamily: "OpenSans_400Regular",
              }}
            >
              Dark Mode
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`${
                colorMode === "light"
                  ? "bg-white border-2 border-blue-400"
                  : "bg-zinc-900"
              } rounded-lg  mx-2`,
              {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
            onPress={() => {
              toggleColor("light");
            }}
          >
            <Ionicons
              name="sunny-outline"
              size={24}
              color={colorMode === "light" ? "black" : "white"}
            />
            <Text
              style={{
                color: colorMode === "light" ? "black" : "white",
                fontFamily: "OpenSans_400Regular",
              }}
            >
              Light Mode
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
