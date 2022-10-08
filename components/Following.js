import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { Fragment, useContext } from "react";
import tw from "twrnc";
import { GeneralContext } from "../contexts/general/state";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/auth/state";
import { PublicContext } from "../contexts/dashboard/public/state";

const Following = ({ type }) => {
  const { colorMode } = useContext(GeneralContext);
  const navigation = useNavigation();
  const { userInfo } = useContext(AuthContext);
  const { searchedUserInfo } = useContext(PublicContext);

  if (type === "private") {
    return (
      <Fragment>
        {userInfo.following.length > 0 ? (
          userInfo.following.map((user, index) => (
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
                navigation.navigate("public_profile", {
                  username: user.following.userName,
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
                <Image
                  source={require("../assets/profile.jpg")}
                  style={tw`w-12 h-12 rounded-full`}
                />
                <View style={tw`ml-4`}>
                  <Text
                    style={{
                      fontFamily: "OpenSans_600SemiBold",
                      color: colorMode === "light" ? "black" : "white",
                    }}
                  >
                    {user.following.userName}
                  </Text>
                </View>
              </View>
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
              You're Not following anyone
            </Text>
          </View>
        )}
      </Fragment>
    );
  }

  if (type === "public") {
    return (
      <Fragment>
        {searchedUserInfo.following.length > 0 ? (
          searchedUserInfo.following.map((user, index) => (
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
                navigation.navigate("public_profile", {
                  username: user.following.userName,
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
                <Image
                  source={require("../assets/profile.jpg")}
                  style={tw`w-12 h-12 rounded-full`}
                />
                <View style={tw`ml-4`}>
                  <Text
                    style={{
                      fontFamily: "OpenSans_600SemiBold",
                      color: colorMode === "light" ? "black" : "white",
                    }}
                  >
                    {user.following.userName}
                  </Text>
                </View>
              </View>
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
              Not following anyone
            </Text>
          </View>
        )}
      </Fragment>
    );
  }
};

export default Following;
