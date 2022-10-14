import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { MaterialIcons } from "@expo/vector-icons";
import SavedPosts from "../../components/SavedPosts";
import { PrivateContext } from "../../contexts/dashboard/private/state";

const SavedPostsScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const { savedPosts } = useContext(PrivateContext);
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
          tw`py-3 px-4 border-b ${
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
          Saved Posts
        </Text>
      </View>
      <View style={tw`mt-4`}>
        <SavedPosts />
      </View>
    </SafeAreaView>
  );
};

export default SavedPostsScreen;
