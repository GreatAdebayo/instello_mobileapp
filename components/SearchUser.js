import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { Fragment, useContext } from "react";
import tw from "twrnc";
import { GeneralContext } from "../contexts/general/state";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PublicContext } from "../contexts/dashboard/public/state";
import { AuthContext } from "../contexts/auth/state";
import { FontAwesome } from "@expo/vector-icons";

const SearchUser = () => {
  const { colorMode } = useContext(GeneralContext);
  const { searchedUsers, isSearching, removeUser, searchFailureMsg } =
    useContext(PublicContext);
  const { userInfo } = useContext(AuthContext);

  const navigation = useNavigation();

  return (
    <Fragment>
      {!isSearching ? (
        searchedUsers.map((user, index) => (
          <TouchableOpacity
            style={[
              tw`py-5 px-3`,
              {
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
            key={index}
            onPress={() => {
              user.userName === userInfo.userName
                ? navigation.navigate("profile")
                : navigation.navigate("public_profile", {
                    username: user.userName,
                  });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {user.profilePicture ? (
                <Image
                  source={user.profilePicture}
                  style={tw`w-25 h-25 rounded-full mr-2`}
                />
              ) : (
                <FontAwesome
                  name="user-circle"
                  size={50}
                  color={colorMode === "light" ? "black" : "white"}
                />
              )}
              <View style={tw`ml-4`}>
                <Text
                  style={{
                    fontFamily: "OpenSans_600SemiBold",
                    color: colorMode === "light" ? "black" : "white",
                  }}
                >
                  {user.userName}
                </Text>
                <Text
                  style={[
                    tw`mt-1`,
                    {
                      fontFamily: "OpenSans_400Regular",
                      color: colorMode === "light" ? "black" : "white",
                    },
                  ]}
                >
                  {user.bio}
                </Text>
              </View>
            </View>

            <Pressable
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                removeUser(user._id);
              }}
            >
              <Entypo
                name="cross"
                size={24}
                color={colorMode === "light" ? "gray" : "white"}
              />
            </Pressable>
          </TouchableOpacity>
        ))
      ) : (
        <View
          style={[
            tw`py-5 px-3`,
            {
              alignItems: "center",
            },
          ]}
        >
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            {searchFailureMsg}
          </Text>
        </View>
      )}
    </Fragment>
  );
};

export default SearchUser;
