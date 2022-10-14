import { View, Image, Pressable } from "react-native";
import React, { useContext, useEffect, Fragment } from "react";
import tw from "twrnc";
import { PrivateContext } from "../contexts/dashboard/private/state";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useNavigation } from "@react-navigation/native";

const ImagePosts = () => {
  const navigation = useNavigation();
  const { fetchPersonalPosts, privatePosts, isFetchingPrivatePosts } =
    useContext(PrivateContext);
  useEffect(() => {
    fetchPersonalPosts("image");
  }, []);

  return (
    <Fragment>
      {isFetchingPrivatePosts ? (
        <Spinner
          visible={isFetchingPrivatePosts}
          textContent={"Fetching images..."}
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
              <Image
                source={{
                  uri: item.medias[0].url,
                }}
                style={tw`w-35 h-35`}
              />
            </Pressable>
          ))}
        </View>
      )}
    </Fragment>
  );
};

export default ImagePosts;
