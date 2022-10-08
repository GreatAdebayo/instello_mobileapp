import { View, Image } from "react-native";
import React from "react";
import tw from "twrnc";

const SavedPosts = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 2 }}>
          <Image
            source={require("../assets/tokyo.jpg")}
            style={tw`w-full h-40 `}
          />
        </View>
        <View style={{ flex: 0.04 }} />
        <View style={{ flex: 2 }}>
          <Image
            source={require("../assets/tokyo.jpg")}
            style={tw`w-full h-40 `}
          />
        </View>
      </View>
    </View>
  );
};

export default SavedPosts;
