import { Text, View, Image } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { GeneralContext } from "../contexts/general/state";

const Notifications = () => {
  const { colorMode } = useContext(GeneralContext);
  const notifications = ["s", "d", "s", "d"];
  return (
    <View
      style={tw`border-t mt-1 ${
        colorMode === "light" ? "border-gray-300" : "border-zinc-700"
      }`}
    >
      {notifications.map((notification, index) => (
        <View
          style={[
            tw`p-3`,
            {
              flexDirection: "row",
            },
          ]}
          key={index}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={require("../assets/profile.jpg")}
              style={tw`w-8 h-8 rounded-full mr-2 mb-2`}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              flex: 9,
            }}
          >
            <Text
              style={{
                color: colorMode === "light" ? "black" : "white",
                fontFamily: "OpenSans_400Regular",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans_600SemiBold",
                }}
              >
                justgreat
              </Text>{" "}
              oh my God, what a mess!oh my God, what a mess! oh my God, what a
            </Text>
            <View style={tw`mt-2`}>
              <Text
                style={{
                  color: "gray",
                  fontFamily: "OpenSans_400Regular",
                }}
              >
                12m
              </Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Notifications;
