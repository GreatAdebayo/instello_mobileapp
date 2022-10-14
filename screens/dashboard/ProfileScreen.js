import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
  Linking,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useContext, useState } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import ImagePosts from "../../components/ ImagePosts";
import { AuthContext } from "../../contexts/auth/state";
import MenuModal from "../../components/MenuModal";
import VideoPosts from "../../components/VideoPosts";

const ProfileScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const { userInfo, isLoading, persitSignin } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [view, setView] = useState({ image: true, video: false });
  const openModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleView = (val1, val2) => {
    setView({ ...view, image: val1, video: val2 });
  };
  return (
    <SafeAreaView
      style={{
        width,
        height,
        backgroundColor: colorMode === "light" ? "#FAFAFA" : "black",
      }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={persitSignin} />
        }
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
          <Text
            style={{
              fontSize: 20,
              fontFamily: "OpenSans_600SemiBold",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            <Entypo
              name="lock"
              size={18}
              color={colorMode === "light" ? "black" : "white"}
            />{" "}
            {!isLoading && userInfo.userName}{" "}
            <MaterialIcons
              name="keyboard-arrow-down"
              size={18}
              color={colorMode === "light" ? "black" : "white"}
            />
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("new_post");
              }}
            >
              <FontAwesome
                name="plus-square-o"
                size={32}
                style={tw`mr-5`}
                color={colorMode === "light" ? "black" : "white"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                openModal();
              }}
            >
              <EvilIcons
                name="navicon"
                size={40}
                color={colorMode === "light" ? "black" : "white"}
              />
            </TouchableOpacity>
          </View>
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
            {userInfo.profilePicture ? (
              <Image
                source={userInfo.profilePicture}
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
              {!isLoading && userInfo.noOfposts}
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
              navigation.navigate("followers", { type: "private" });
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans_600SemiBold",
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              {!isLoading && userInfo.followers.length}
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
              navigation.navigate("followings", { type: "private" });
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans_600SemiBold",
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              {!isLoading && userInfo.following.length}
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
            {!isLoading && userInfo.lastName} {!isLoading && userInfo.firstName}{" "}
            {!isLoading && userInfo.email_verified && (
              <MaterialIcons
                name="verified"
                size={14}
                color="#0ea5e9"
                style={tw`ml-1`}
              />
            )}
          </Text>

          <Text
            style={{
              fontFamily: "OpenSans_400Regular",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            {!isLoading && userInfo.bio}
          </Text>
          {userInfo.occupation && (
            <Text
              style={{
                fontFamily: "OpenSans_400Regular",
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              {userInfo.occupation}
            </Text>
          )}
          {userInfo.website && (
            <Pressable
              onPress={() => {
                Linking.openURL(userInfo.website);
              }}
            >
              <Text
                style={[
                  tw`text-blue-400`,
                  {
                    fontFamily: "OpenSans_400Regular",
                  },
                ]}
              >
                {userInfo.website}
              </Text>
            </Pressable>
          )}
        </View>

        <TouchableOpacity
          style={[
            tw`${
              colorMode === "light" ? "bg-white" : "bg-zinc-900"
            } mx-4 p-2.5 my-3 rounded-lg border-2`,
            {
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#3C3C432E",
            },
          ]}
          onPress={() => {
            navigation.navigate("edit_profile");
          }}
        >
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
        <View
          style={[
            tw`py-2`,
            {
              flexDirection: "row",
            },
          ]}
        >
          <Pressable
            style={[
              tw`pb-2`,
              {
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderBottomWidth: view.image && 1,
                borderBottomColor:
                  view.image && (colorMode === "light" ? "black" : "white"),
              },
            ]}
            onPress={() => {
              toggleView(true, false);
            }}
          >
            <MaterialIcons
              name="insert-photo"
              size={32}
              color={colorMode === "light" ? "black" : "white"}
            />
          </Pressable>
          <Pressable
            style={[
              tw`pb-2`,
              {
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                borderBottomWidth: view.video && 1,
                borderBottomColor:
                  view.video && (colorMode === "light" ? "black" : "white"),
              },
            ]}
            onPress={() => {
              toggleView(false, true);
            }}
          >
            <FontAwesome
              name="video-camera"
              size={32}
              color={colorMode === "light" ? "black" : "white"}
            />
          </Pressable>
        </View>
        {view.image && <ImagePosts />}
        {view.video && <VideoPosts />}
        <MenuModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
