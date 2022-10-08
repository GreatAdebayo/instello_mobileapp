import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { Fragment, useContext } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { GeneralContext } from "../contexts/general/state";
import { useNavigation } from "@react-navigation/native";

const DirectMessage = () => {
  const navigation = useNavigation();
  const { colorMode } = useContext(GeneralContext);
  const messages = ["s", "d", "s", "d", "s", "d"];
  return (
    <Fragment>
      {messages.map((message, index) => (
        <TouchableOpacity
          style={[
            tw`p-5`,
            {
              flexDirection: "row",
              justifyContent: "space-between",
            },
          ]}
          key={index}
          onPress={() => {
            navigation.navigate("dm_details");
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
              <Text
                style={{
                  color: colorMode === "light" ? "gray" : "white",
                  fontFamily: "OpenSans_400Regular",
                }}
              >
                Have a nice day bro!
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colorMode === "light" ? "gray" : "white",
                fontFamily: "OpenSans_400Regular",
              }}
            >
              now
            </Text>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SimpleLineIcons
              name="camera"
              size={24}
              color={colorMode === "light" ? "gray" : "white"}
            />
          </View>
        </TouchableOpacity>
      ))}
    </Fragment>
  );
};

export default DirectMessage;
