import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useContext, Fragment, useState } from "react";
import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { GeneralContext } from "../contexts/general/state";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Feeds = () => {
  const navigation = useNavigation();
  const { colorMode } = useContext(GeneralContext);
  const [posts, setPosts] = useState([
    {
      text: `oh my God, what a mess!oh my God, what a mess! oh my God, what a mess!oh my God, what a mess!oh my God, what a mess! oh my God,
  what a mess! oh my God, what a mess!oh my God, what a mess! oh my God, what a mess!oh my God, what a mess!oh my God, what a mess! oh my God, what a mess!`,
      isReadMore: true,
      id: 1,
    },
    {
      text: `oh my God, what a mess!oh my God, what a mess! oh my God, what a mess!oh my God, what a mess!oh my God, what a mess! oh my God,
  what a mess! oh my God, what a mess!oh my God, what a mess! oh my God, what a mess!oh my God, what a mess!oh my God, what a mess! oh my God, what a mess!`,
      isReadMore: true,
      id: 2,
    },
    {
      text: `oh my God, what a mess!oh my God, what a mess! oh my God, what a mess!oh my God, what a mess!oh my God, what a mess! oh my God,
  what a mess! oh my God, what a mess!oh my God, what a mess! oh my God, what a mess!oh my God, what a mess!oh my God, what a mess! oh my God, what a mess!`,
      isReadMore: true,
      id: 3,
    },
  ]);

  const toggleReadMore = (id) => {};

  return (
    <View>
      {posts.map((post, index) => (
        <Fragment key={index}>
          <View
            style={[
              tw`px-2 py-3`,
              {
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Pressable
              style={{
                flexDirection: "row",
              }}
              onPress={() => {
                navigation.navigate("public_profile", {
                  username: "greatest",
                });
              }}
            >
              <Image
                source={require("../assets/profile.jpg")}
                style={tw`w-8 h-8 rounded-full`}
              />
              <View
                style={[
                  tw`ml-2`,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans_600SemiBold",
                    fontSize: 15,
                    color: colorMode === "light" ? "black" : "white",
                  }}
                >
                  justgreat.eth
                </Text>
                <MaterialIcons
                  name="verified"
                  size={14}
                  color="#0ea5e9"
                  style={tw`pt-1 ml-1`}
                />
              </View>
            </Pressable>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color={colorMode === "light" ? "black" : "white"}
              />
            </View>
          </View>
          <View>
            <Image
              source={require("../assets/tokyo.jpg")}
              style={tw`w-full h-100`}
            />
          </View>
          <View
            style={[
              tw`px-3 py-3`,
              {
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <TouchableOpacity>
                <AntDesign
                  name="hearto"
                  size={32}
                  color={colorMode === "light" ? "black" : "white"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`pl-2`}
                onPress={() => {
                  navigation.navigate("comments");
                }}
              >
                <Ionicons
                  name="chatbubble-outline"
                  size={32}
                  color={colorMode === "light" ? "black" : "white"}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <Text>ss</Text> */}
            </View>
            <FontAwesome
              name="bookmark-o"
              size={32}
              color={colorMode === "light" ? "black" : "white"}
            />
          </View>

          <View
            style={[
              tw`px-3`,
              {
                flexDirection: "row",
              },
            ]}
          >
            <Image
              source={require("../assets/profile.jpg")}
              style={tw`w-5 h-5 rounded-full mr-2`}
            />
            <Text
              style={{
                fontFamily: "OpenSans_400Regular",
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              Liked by{" "}
              <Text
                style={{
                  fontFamily: "OpenSans_600SemiBold",
                }}
              >
                Great
              </Text>{" "}
              and{" "}
              <Text
                style={{
                  fontFamily: "OpenSans_600SemiBold",
                }}
              >
                40 others
              </Text>
            </Text>
          </View>
          <Pressable
            style={tw`p-3`}
            onPress={() => {
              navigation.navigate("comments");
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans_400Regular",
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans_600SemiBold",
                }}
              >
                justgreat.eth
              </Text>{" "}
              {post.isReadMore ? post.text.slice(0, 80) : post.text}{" "}
              <Pressable
                onPress={() => {
                  toggleReadMore(post.id);
                }}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans_600SemiBold",
                    color: colorMode === "light" ? "black" : "white",
                  }}
                >
                  {post.isReadMore ? "...Read more" : " Show less"}
                </Text>
              </Pressable>
            </Text>
          </Pressable>
        </Fragment>
      ))}
    </View>
  );
};

export default Feeds;
