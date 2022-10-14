import { View, Pressable } from "react-native";
import React, { useContext, useEffect, Fragment } from "react";
import tw from "twrnc";
import { PrivateContext } from "../contexts/dashboard/private/state";
import { Video } from "expo-av";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useNavigation } from "@react-navigation/native";

const VideoPosts = () => {
  const navigation = useNavigation();
  const { fetchPersonalPosts, privatePosts, isFetchingPrivatePosts } =
    useContext(PrivateContext);
  useEffect(() => {
    fetchPersonalPosts("video");
  }, []);

  return (
    <Fragment>
      {isFetchingPrivatePosts ? (
        <Spinner
          visible={isFetchingPrivatePosts}
          textContent={"Fetching videos..."}
          textStyle={{
            color: "#FFF",
          }}
        />
      ) : (
        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {privatePosts.map((item, index) => (
            <Pressable
              key={index}
              style={{
                flexBasis: "33.3%",
              }}
              onPress={() => {
                navigation.navigate("private_post_details", { id: item._id });
              }}
            >
              <Video
                style={tw`w-40 h-30`}
                source={{
                  uri: item.medias[0].url,
                }}
                isLooping
                shouldPlay={false}
              />
            </Pressable>
          ))}
        </View>
      )}
    </Fragment>
  );
};

export default VideoPosts;
