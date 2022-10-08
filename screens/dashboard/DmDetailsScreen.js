import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { MaterialIcons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const DmDetailsScreen = ({ navigation }) => {
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
          tw`py-3 px-4 border-b ${
            colorMode === "light" ? "border-gray-300" : "border-zinc-700"
          }`,
          {
            flexDirection: "row",
            justifyContent: "space-between",
          },
        ]}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={25}
              color={colorMode === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
          <Image
            source={require("../../assets/profile.jpg")}
            style={tw`w-12 h-12 rounded-full`}
          />
          <View style={tw`ml-2`}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "OpenSans_600SemiBold",
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              MCNEYO
            </Text>
            <Text
              style={{
                fontFamily: "OpenSans_400Regular",
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              justgreat
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Zocial
            name="call"
            size={25}
            color={colorMode === "light" ? "black" : "white"}
          />
          <Feather
            name="video"
            size={28}
            color={colorMode === "light" ? "black" : "white"}
            style={tw`ml-6`}
          />
        </View>
      </View>

      <ScrollView>
        <View style={tw`p-4`}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/profile.jpg")}
              style={tw`w-7 h-7 rounded-full mr-2`}
            />
            <View
              style={[
                tw`bg-gray-500 p-4 rounded-lg`,
                {
                  flex: 3,
                  alignItems: "flex-start",
                },
              ]}
            >
              <Text
                style={[
                  tw`text-white`,
                  {
                    fontFamily: "OpenSans_400Regular",
                  },
                ]}
              >
                Hi,Boss good evening Hi,Boss good evening Hi,Boss good evening
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "flex-end",
            }}
          >
            <View
              style={[
                tw`mt-5 p-4 rounded-lg`,
                {
                  backgroundColor: "#FF626E",
                },
              ]}
            >
              <Text
                style={[
                  tw`text-white`,
                  {
                    fontFamily: "OpenSans_400Regular",
                  },
                ]}
              >
                Fine boss
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View>
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
          <Image
            source={require("../../assets/profile.jpg")}
            style={tw`w-8 h-8 rounded-full mr-2`}
          />
          <View style={tw`mx-2`}>
            <TextInput
              style={{
                fontSize: 16,
                fontFamily: "OpenSans_400Regular",
                color: "white",
              }}
              placeholder="Message..."
              autoCapitalize="none"
              placeholderTextColor={colorMode === "light" ? "black" : "white"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DmDetailsScreen;
