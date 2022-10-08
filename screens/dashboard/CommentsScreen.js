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
import { FontAwesome5 } from "@expo/vector-icons";
import Comments from "../../components/Comments";
import { Octicons } from "@expo/vector-icons";

const CommentsScreen = ({ navigation }) => {
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
          Comments
        </Text>

        <FontAwesome5
          name="share"
          size={25}
          color={colorMode === "light" ? "black" : "white"}
        />
      </View>
      <ScrollView>
        <View
          style={[
            tw`px-2 py-3`,
            {
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={require("../../assets/profile.jpg")}
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
              mess!oh my God, what a mess!oh my God, what a mess! oh my God,
              what a mess! oh my God, what a mess!oh my God, what a mess! oh my
              God, what a mess!oh my God, what a mess!oh my God, what a mess! oh
              my God, what a mess!
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
        <Comments />
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
              placeholder="Add a Comment"
              autoCapitalize="none"
              placeholderTextColor={colorMode === "light" ? "black" : "white"}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CommentsScreen;
