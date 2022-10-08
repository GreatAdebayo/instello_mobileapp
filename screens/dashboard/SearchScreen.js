import { View, Dimensions, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { Octicons } from "@expo/vector-icons";
import SearchUser from "../../components/SearchUser";
import { PublicContext } from "../../contexts/dashboard/public/state";

const SearchScreen = () => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const { searchUser } = useContext(PublicContext);
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
          tw`${
            colorMode === "light" ? "bg-zinc-200" : "bg-zinc-900 "
          } rounded-lg py-3 pl-5 mx-4 my-3`,
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
              color: colorMode === "light" ? "black" : "white",
            }}
            placeholder="Search user"
            placeholderTextColor={colorMode === "light" ? "black" : "white"}
            autoCapitalize="none"
            onChangeText={(text) => {
              searchUser(text);
            }}
          />
        </View>
      </View>
      <SearchUser />
    </SafeAreaView>
  );
};

export default SearchScreen;
