import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState, Fragment } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Comments from "../../components/Comments";
import { PrivateContext } from "../../contexts/dashboard/private/state";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../../contexts/auth/state";

//Validation Schema
const commentSchema = yup.object().shape({
  comment: yup.string().required("Comment is Required"),
});

const CommentsScreen = ({ navigation, route }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const { feeds, addComment, isFetchingComment, fetchComments, privatePosts } =
    useContext(PrivateContext);
  const [feed, setFeed] = useState({});
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (route.params.type === "feeds") {
      const findFeed = feeds.find((feed) => feed._id === route.params.id);
      setFeed(findFeed);
    }

    if (route.params.type === "post") {
      const findPost = privatePosts.find(
        (post) => post._id === route.params.id
      );
      setFeed(findPost);
    }
  }, []);

  const refreshFetchComments = () => {
    fetchComments(route.params.id);
  };

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
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingComment}
            onRefresh={refreshFetchComments}
          />
        }
      >
        <View
          style={[
            tw`px-2 py-3`,
            {
              flexDirection: "row",
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            {feed.user &&
              (feed.user.profilePicture ? (
                <Image
                  source={feed.user.profilePicture}
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
                {feed.user && feed.user.userName}
              </Text>{" "}
              {feed.caption}
            </Text>
            <View style={tw`mt-2`}>
              <Text
                style={{
                  color: "gray",
                  fontFamily: "OpenSans_400Regular",
                }}
              >
                {feed.createdAt}
              </Text>
            </View>
          </View>
        </View>
        <Comments id={route.params.id} />
      </ScrollView>
      <View>
        <View
          style={[
            tw`${
              colorMode === "light" ? "bg-zinc-200" : "bg-zinc-900 "
            } rounded-lg py-3 pl-5 mx-2 my-3 px-3`,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <Formik
            initialValues={{
              comment: "",
            }}
            onSubmit={(values) =>
              addComment({
                comment: values.comment,
                user: {
                  userName: userInfo.userName,
                  email_verified: userInfo.email_verified,
                  profilePicture: userInfo.profilePicture,
                },
                createdAt: Date.now(),
                id: route.params.id,
              })
            }
            validationSchema={commentSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <Fragment>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {feed.user &&
                    (feed.user.profilePicture ? (
                      <Image
                        source={feed.user.profilePicture}
                        style={tw`w-8 h-8 rounded-full mb-2`}
                      />
                    ) : (
                      <FontAwesome
                        name="user-circle"
                        size={32}
                        color={colorMode === "light" ? "black" : "white"}
                      />
                    ))}

                  <TextInput
                    style={{
                      fontSize: 16,
                      fontFamily: "OpenSans_400Regular",
                      color: "white",
                      marginLeft: 10,
                    }}
                    placeholder="Add a Comment"
                    autoCapitalize="none"
                    placeholderTextColor={
                      colorMode === "light" ? "black" : "white"
                    }
                    onChangeText={handleChange("comment")}
                    onBlur={handleBlur("comment")}
                    value={values.comment}
                  />
                </View>
                {errors.comment && touched.comment && (
                  <Text
                    style={[
                      tw`mt-2 ${
                        colorMode === "light" ? "text-red-700" : "text-red-500"
                      }`,
                      { fontSize: 13, fontFamily: "OpenSans_400Regular" },
                    ]}
                  >
                    {errors.comment}
                  </Text>
                )}
                <TouchableOpacity onPress={handleSubmit}>
                  <Text
                    style={{
                      fontFamily: "OpenSans_600SemiBold",
                      color: "#FF626E",
                    }}
                  >
                    Post
                  </Text>
                </TouchableOpacity>
              </Fragment>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CommentsScreen;
