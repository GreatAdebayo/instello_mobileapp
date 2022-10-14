import {
  View,
  Text,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { Fragment, useState, useEffect, useContext } from "react";
import tw from "twrnc";
import { GeneralContext } from "../../contexts/general/state";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { PrivateContext } from "../../contexts/dashboard/private/state";
import { SliderBox } from "react-native-image-slider-box";
import { Video } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";

const PrivatePostDetails = ({ navigation, route }) => {
  const { height, width } = Dimensions.get("window");
  const { privatePosts } = useContext(PrivateContext);
  const [post, setPost] = useState(null);
  const { colorMode } = useContext(GeneralContext);
  useEffect(() => {
    const findPost = privatePosts.find((post) => post._id === route.params.id);
    setPost(findPost);
  }, []);
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
          Post
        </Text>

        <View></View>
      </View>
      {post && (
        <Fragment>
          <View>
            {post.mode === "image" ? (
              <SliderBox
                images={post.medias.filter((item) => item.format === "image")}
                dotColor="#FF626E"
                inactiveDotColor="#90A4AE"
                style={tw`w-full h-100`}
              />
            ) : (
              <Video
                style={tw`w-full h-100`}
                source={{
                  uri: post.medias[0].url,
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
              <TouchableOpacity
                style={tw`pl-2`}
                onPress={() => {
                  navigation.navigate("comments", {
                    id: post._id,
                    type: "post",
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
                {post.user.userName}
              </Text>{" "}
              {post.caption}
            </Text>
          </Pressable>
        </Fragment>
      )}
    </SafeAreaView>
  );
};

export default PrivatePostDetails;
