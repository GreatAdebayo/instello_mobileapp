import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext, useEffect } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { PublicContext } from "../../contexts/dashboard/public/state";
import { AlertContext } from "../../contexts/alert/state";
import { Alert } from "../../utils/alert";
import { AuthContext } from "../../contexts/auth/state";
import { FontAwesome } from "@expo/vector-icons";

const PublicProfileScreen = ({ navigation, route }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const {
    publicProfileDetails,
    searchedUserInfo,
    profileErrorMsg,
    clearMsg,
    isLoading,
    follow,
    unFollow,
    followFailMsg,
    followSuccessMsg,
  } = useContext(PublicContext);
  const { setAlert } = useContext(AlertContext);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    publicProfileDetails(route.params.username);
  }, []);

  useEffect(() => {
    if (profileErrorMsg) {
      setAlert(profileErrorMsg, "fail");
      clearMsg();
    }

    if (followSuccessMsg) {
      setAlert(followSuccessMsg, "success");
      clearMsg();
    }

    if (followFailMsg) {
      setAlert(followFailMsg, "fail");
      clearMsg();
    }
  }, [profileErrorMsg, followSuccessMsg, followFailMsg]);

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
          tw`p-3`,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
            fontSize: 16,
            fontFamily: "OpenSans_600SemiBold",
          }}
        >
          {route.params.username}
        </Text>

        <MaterialCommunityIcons
          name="dots-horizontal"
          size={24}
          color={colorMode === "light" ? "black" : "white"}
        />
      </View>

      <View
        style={[
          tw`pt-1 px-5`,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          {searchedUserInfo.profilePicture ? (
            <Image
              source={searchedUserInfo.profilePicture}
              style={tw`w-25 h-25 rounded-full mr-2`}
            />
          ) : (
            <FontAwesome
              name="user-circle"
              size={89}
              color={colorMode === "light" ? "black" : "white"}
            />
          )}
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            {!isLoading && searchedUserInfo.noOfposts}
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans_400Regular",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            Posts
          </Text>
        </View>
        <Pressable
          style={{
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("followers", { type: "public" });
          }}
        >
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            {!isLoading &&
              searchedUserInfo.followers &&
              searchedUserInfo.followers.length}
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans_400Regular",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            Followers
          </Text>
        </Pressable>
        <Pressable
          style={{
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("followings", { type: "public" });
          }}
        >
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            {!isLoading &&
              searchedUserInfo.following &&
              searchedUserInfo.following.length}
          </Text>
          <Text
            style={{
              fontFamily: "OpenSans_400Regular",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            Following
          </Text>
        </Pressable>
      </View>

      <View style={tw`py-2 px-5`}>
        <Text
          style={{
            fontFamily: "OpenSans_600SemiBold",
            color: colorMode === "light" ? "black" : "white",
            fontSize: 15,
          }}
        >
          {!isLoading &&
            searchedUserInfo.firstName + " " + searchedUserInfo.lastName}{" "}
          {searchedUserInfo.email_verified && (
            <MaterialIcons
              name="verified"
              size={14}
              color="#0ea5e9"
              style={tw`pt-1 ml-1`}
            />
          )}
        </Text>
        <Text
          style={{
            fontFamily: "OpenSans_400Regular",
            color: colorMode === "light" ? "black" : "white",
          }}
        >
          {!isLoading && searchedUserInfo.bio}
        </Text>
        {searchedUserInfo.occupation && (
          <Text
            style={{
              fontFamily: "OpenSans_400Regular",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            {searchedUserInfo.occupation}
          </Text>
        )}
        {searchedUserInfo.website && (
          <Text
            style={{
              fontFamily: "OpenSans_400Regular",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            {searchedUserInfo.website}
          </Text>
        )}
      </View>

      {!isLoading && (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {!isLoading &&
          searchedUserInfo.followers &&
          searchedUserInfo.followers.find(
            (info) => info.follower.userName === userInfo.userName
          ) ? (
            <TouchableOpacity
              style={[
                tw`${
                  colorMode === "light" ? "bg-white" : "bg-zinc-900"
                } mx-4 p-2.5 my-3 rounded-lg border-2`,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#3C3C432E",
                  flex: 1,
                },
              ]}
              onPress={() => {
                unFollow(route.params.username);
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans_600SemiBold",
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                UnFollow
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[
                tw`${
                  colorMode === "light" ? "bg-white" : "bg-zinc-900"
                } mx-4 p-2.5 my-3 rounded-lg border-2`,
                {
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#3C3C432E",
                  flex: 1,
                },
              ]}
              onPress={() => {
                follow(route.params.username);
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans_600SemiBold",
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                Follow
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[
              tw`${
                colorMode === "light" ? "bg-white" : "bg-zinc-900"
              } mx-4 p-2.5 my-3 rounded-lg border-2`,
              {
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#3C3C432E",
                flex: 1,
              },
            ]}
            onPress={() => {
              navigation.navigate("dm_details");
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans_600SemiBold",
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              Message
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`${
                colorMode === "light" ? "bg-white" : "bg-zinc-900"
              } mx-4 p-2.5 my-3 rounded-lg border-2`,
              {
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#3C3C432E",
                flex: 1,
              },
            ]}
            onPress={() => {}}
          >
            <Text
              style={{
                fontFamily: "OpenSans_600SemiBold",
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              Subscribe
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={[
          tw`py-2 px-5`,
          {
            flexDirection: "row",
          },
        ]}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <MaterialIcons
            name="grid-on"
            size={32}
            color={colorMode === "light" ? "black" : "white"}
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Fontisto
            name="locked"
            size={29}
            color={colorMode === "light" ? "black" : "white"}
          />
        </View>
      </View>
      {/* <FreePosts /> */}
      <Alert />
    </SafeAreaView>
  );
};

export default PublicProfileScreen;
