import {
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useContext, useState, useEffect } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { AuthContext } from "../../contexts/auth/state";
import { FontAwesome } from "@expo/vector-icons";
import { PrivateContext } from "../../contexts/dashboard/private/state";
import { AlertContext } from "../../contexts/alert/state";
import { Alert } from "../../utils/alert";

const EditProfileScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const { userInfo } = useContext(AuthContext);
  const { editProfile, editSuccessMsg, editFailMsg, clearMsg } =
    useContext(PrivateContext);
  const { setAlert } = useContext(AlertContext);
  const [profile, setProfile] = useState({
    website: userInfo.website,
    bio: userInfo.bio,
    occupation: userInfo.occupation,
    gender: userInfo.gender,
  });

  useEffect(() => {
    if (editSuccessMsg) {
      setAlert(editSuccessMsg, "success");
      clearMsg();
    }

    if (editFailMsg) {
      setAlert(editFailMsg, "fail");
      clearMsg();
    }
  }, [editSuccessMsg, editFailMsg]);

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
          tw`px-5`,
          {
            flex: 1,
          },
        ]}
      >
        <View
          style={[
            tw`py-3`,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans_600SemiBold",
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              fontSize: 16,
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            Edit Profile
          </Text>
          <TouchableOpacity
            onPress={() => {
              editProfile(profile);
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans_600SemiBold",
                color: "#FF626E",
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            tw`py-5`,
            {
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
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
          <TouchableOpacity>
            <Text
              style={[
                tw`mt-3`,
                {
                  fontFamily: "OpenSans_600SemiBold",
                  color: "#FF626E",
                },
              ]}
            >
              Change Profile Photo
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`py-4`}>
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            Personal Information
          </Text>
          <View
            style={[
              tw`mt-5`,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                Name
              </Text>
            </View>
            <View
              style={[
                tw`border-b-2 pb-2 ${
                  colorMode === "light" ? "border-gray-200" : "border-zinc-800"
                }`,
                {
                  flex: 2,
                },
              ]}
            >
              <TextInput
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
                defaultValue={userInfo.firstName + " " + userInfo.lastName}
                editable={false}
              />
            </View>
          </View>
          <View
            style={[
              tw`mt-8`,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                Username
              </Text>
            </View>
            <View
              style={[
                tw`border-b-2 pb-2 ${
                  colorMode === "light" ? "border-gray-200" : "border-zinc-800"
                }`,
                {
                  flex: 2,
                },
              ]}
            >
              <TextInput
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
                defaultValue={userInfo.userName}
                editable={false}
              />
            </View>
          </View>

          <View
            style={[
              tw`mt-8`,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                Website
              </Text>
            </View>
            <View
              style={[
                tw`border-b-2 pb-2 ${
                  colorMode === "light" ? "border-gray-200" : "border-zinc-800"
                }`,
                {
                  flex: 2,
                },
              ]}
            >
              <TextInput
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
                defaultValue={userInfo.website}
                placeholder="Type in website"
                placeholderTextColor={colorMode === "light" ? "black" : "white"}
                autoCapitalize="none"
                onChangeText={(text) => {
                  setProfile({ ...profile, website: text });
                }}
              />
            </View>
          </View>
          <View
            style={[
              tw`mt-8`,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                Bio
              </Text>
            </View>
            <View
              style={[
                tw`border-b-2 pb-2 ${
                  colorMode === "light" ? "border-gray-200" : "border-zinc-800"
                }`,
                {
                  flex: 2,
                },
              ]}
            >
              <TextInput
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
                defaultValue={userInfo.bio}
                placeholder="Type in bio"
                placeholderTextColor={colorMode === "light" ? "black" : "white"}
                autoCapitalize="none"
                onChangeText={(text) => {
                  setProfile({ ...profile, bio: text });
                }}
              />
            </View>
          </View>
          <View
            style={[
              tw`mt-8`,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                Occupation
              </Text>
            </View>
            <View
              style={[
                tw`border-b-2 pb-2 ${
                  colorMode === "light" ? "border-gray-200" : "border-zinc-800"
                }`,
                {
                  flex: 2,
                },
              ]}
            >
              <TextInput
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
                defaultValue={userInfo.occupation}
                placeholder="Type in occupation"
                placeholderTextColor={colorMode === "light" ? "black" : "white"}
                autoCapitalize="none"
                onChangeText={(text) => {
                  setProfile({ ...profile, occupation: text });
                }}
              />
            </View>
          </View>
        </View>

        <View style={tw`py-15`}>
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            Private Information
          </Text>
          <View
            style={[
              tw`mt-5`,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                Email
              </Text>
            </View>
            <View
              style={[
                tw`border-b-2 pb-2 ${
                  colorMode === "light" ? "border-gray-200" : "border-zinc-800"
                }`,
                {
                  flex: 2,
                },
              ]}
            >
              <TextInput
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
                defaultValue={userInfo.email}
                editable={false}
              />
            </View>
          </View>
          <View
            style={[
              tw`mt-8`,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "OpenSans_400Regular",
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                Gender
              </Text>
            </View>
            <View
              style={[
                tw`border-b-2 pb-2 ${
                  colorMode === "light" ? "border-gray-200" : "border-zinc-800"
                }`,
                {
                  flex: 2,
                },
              ]}
            >
              <Picker
                selectedValue={profile.gender}
                onValueChange={(text, index) => {
                  setProfile({ ...profile, gender: text });
                }}
                itemStyle={{
                  color: colorMode === "light" ? "black" : "white",
                  fontFamily: "Ebrima",
                  fontSize: 14,
                  height: 42,
                  fontFamily: "OpenSans_400Regular",
                }}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>
          </View>
        </View>
      </View>
      <Alert />
    </SafeAreaView>
  );
};

export default EditProfileScreen;
