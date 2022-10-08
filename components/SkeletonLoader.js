import { View } from "react-native";
import React from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import tw from "twrnc";

const SkeletonLoader = () => {
  return (
    <View>
      {["1", "2"].map((item, index) => (
        <View
          style={[
            tw`h-23 bg-white rounded-lg shadow-md mx-5 my-2 p-3`,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          key={index}
        >
          <ContentLoader>
            <Circle cx="30" cy="30" r="30" />
            <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
            <Rect x="80" y="40" rx="3" ry="3" width="300" height="13" />
          </ContentLoader>
        </View>
      ))}
    </View>
  );
};

export default SkeletonLoader;
