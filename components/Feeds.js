import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useContext, Fragment, useEffect } from "react";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { GeneralContext } from "../contexts/general/state";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PrivateContext } from "../contexts/dashboard/private/state";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AlertContext } from "../contexts/alert/state";
import { Alert } from "../utils/alert";
import { SliderBox } from "react-native-image-slider-box";
import { Video } from "expo-av";
import { AuthContext } from "../contexts/auth/state";

const Feeds = () => {
  const navigation = useNavigation();
  const { colorMode } = useContext(GeneralContext);
  const {
    fetchFeeds,
    feeds,
    isFetching,
    fetchingFailMsg,
    toggleReadMore,
    savePost,
  } = useContext(PrivateContext);
  const { userInfo } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    fetchFeeds();

    if (fetchingFailMsg) {
      setAlert(fetchingFailMsg, "fail");
    }
  }, [fetchingFailMsg]);

  return (
    <Fragment>
      {isFetching ? (
        <Spinner
          visible={isFetching}
          textContent={"Fetching feeds..."}
          textStyle={{
            color: "#FFF",
          }}
        />
      ) : (
        feeds.map((feed, index) => (
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
                  feed.user.userName === userInfo.userName
                    ? navigation.navigate("profile")
                    : navigation.navigate("public_profile", {
                        username: feed.user.userName,
                      });
                }}
              >
                {feed.user.profilePicture ? (
                  <Image
                    source={feed.user.profilePicture}
                    style={tw`w-8 h-8 rounded-full`}
                  />
                ) : (
                  <FontAwesome
                    name="user-circle"
                    size={40}
                    color={colorMode === "light" ? "black" : "white"}
                  />
                )}

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
                    {feed.user.userName}
                  </Text>
                  {feed.user.email_verified && (
                    <MaterialIcons
                      name="verified"
                      size={14}
                      color="#0ea5e9"
                      style={tw`pt-1 ml-1`}
                    />
                  )}
                </View>
              </Pressable>
            </View>
            <View>
              {feed.mode === "image" ? (
                <SliderBox
                  images={feed.medias.filter((item) => item.format === "image")}
                  dotColor="#FF626E"
                  inactiveDotColor="#90A4AE"
                  style={tw`w-full h-100`}
                />
              ) : (
                <Video
                  style={tw`w-full h-100`}
                  source={{
                    uri: feed.medias[0].url,
                  }}
                  isLooping
                  shouldPlay={false}
                  useNativeControls
                />
              )}
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
                    navigation.navigate("comments", {
                      id: feed._id,
                      type: "feeds",
                    });
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
              ></View>
              <TouchableOpacity
                onPress={() => {
                  savePost(feed._id);
                }}
              >
                <FontAwesome
                  name="bookmark-o"
                  size={32}
                  color={colorMode === "light" ? "black" : "white"}
                />
              </TouchableOpacity>
            </View>

            {/* <View
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
          </View> */}
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
                  {feed.user.userName}
                </Text>{" "}
                {feed.isReadMore ? feed.caption.slice(0, 50) : feed.caption}{" "}
                <Pressable
                  onPress={() => {
                    toggleReadMore(feed._id);
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "OpenSans_600SemiBold",
                      color: colorMode === "light" ? "black" : "white",
                    }}
                  >
                    {feed.isReadMore && "...Show more"}
                    {feed.isReadLess && "...Show Less"}
                  </Text>
                </Pressable>
              </Text>
            </Pressable>
          </Fragment>
        ))
      )}
      <Alert />
    </Fragment>
  );
};

export default Feeds;
