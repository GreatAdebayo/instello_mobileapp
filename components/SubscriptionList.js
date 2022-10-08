import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { Fragment, useContext } from "react";
import tw from "twrnc";
import { GeneralContext } from "../contexts/general/state";
import { useNavigation } from "@react-navigation/native";

const SubscriptionLists = () => {
  const { colorMode } = useContext(GeneralContext);
  const messages = ["s", "d", "s", "d", "s", "d"];
  const navigation = useNavigation();
  return (
    <Fragment>
      {messages.map((message, index) => (
        <TouchableOpacity
          style={[
            tw`py-5 px-3`,
            {
              flexDirection: "row",
              justifyContent: "space-between",
            },
          ]}
          key={index}
          onPress={() => {
            navigation.navigate("public_profile");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/profile.jpg")}
              style={tw`w-12 h-12 rounded-full`}
            />
            <View style={tw`ml-4`}>
              <Text
                style={{
                  fontFamily: "OpenSans_600SemiBold",
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                justgreat
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </Fragment>
  );
};

export default SubscriptionLists;
