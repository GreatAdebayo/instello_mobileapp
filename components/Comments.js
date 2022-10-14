import { Text, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import tw from "twrnc";
import { GeneralContext } from "../contexts/general/state";
import { PrivateContext } from "../contexts/dashboard/private/state";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { FontAwesome } from "@expo/vector-icons";

const Comments = ({ id }) => {
  const { colorMode } = useContext(GeneralContext);
  const { fetchComments, comments, fetchCommentFailMsg, isFetchingComment } =
    useContext(PrivateContext);

  useEffect(() => {
    fetchComments(id);
  }, []);
  return (
    <View
      style={tw`border-t mt-4 ${
        colorMode === "light" ? "border-gray-300" : "border-zinc-700"
      }`}
    >
      {isFetchingComment ? (
        <Spinner
          visible={isFetchingComment}
          textContent={"Fetching comments..."}
          textStyle={{
            color: "#FFF",
          }}
        />
      ) : (
        comments.map((comment, index) => (
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
              {comment.user &&
                (comment.user.profilePicture ? (
                  <Image
                    source={comment.user.profilePicture}
                    style={tw`w-8 h-8 rounded-full mr-2 mb-2`}
                  />
                ) : (
                  <FontAwesome
                    name="user-circle"
                    size={32}
                    color={colorMode === "light" ? "black" : "white"}
                  />
                ))}
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
                  {comment.user && comment.user.userName}
                </Text>{" "}
                {comment.content}
              </Text>
              <View style={tw`mt-2`}>
                <Text
                  style={{
                    color: "gray",
                    fontFamily: "OpenSans_400Regular",
                  }}
                >
                  {comment.createdAt}
                </Text>
              </View>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

export default Comments;
