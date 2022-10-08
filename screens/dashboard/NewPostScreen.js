import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
} from "react-native";
import React, { Fragment, useContext, useEffect } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { PrivateContext } from "../../contexts/dashboard/private/state";

const NewPostScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const {
    indexAsset,
    selectMultiple,
    isSelectMultiple,
    select,
    setAssets,
    assets,
    selectedAssets,
  } = useContext(PrivateContext);

  MediaLibrary.requestPermissionsAsync();

  const changeIndexAssets = (asset) => {
    setAssets(asset, "change", "unsupport");
  };

  useEffect(() => {
    (async () => {
      const assets = await MediaLibrary.getAssetsAsync({
        mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
        base64: true,
      });

      setAssets(assets.assets, "index", "unsupport");
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
      // allowsMultipleSelection: true,
      base64: true,
      allowsEditing: true,
    });

    if (!result.cancelled) {
      result.schema = "support";
      setAssets(result, "change");
      navigation.navigate("post_manage");
    }
  };

  return (
    <SafeAreaView
      style={[
        tw`${colorMode === "light" ? "bg-white" : "bg-black"}`,
        {
          width,
          height,
        },
      ]}
    >
      <View
        style={[
          tw`p-3`,
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
          <Entypo
            name="cross"
            size={30}
            color={colorMode === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "OpenSans_600SemiBold",
            fontSize: 16,
            color: colorMode === "light" ? "black" : "white",
          }}
        >
          New Post
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("post_manage");
          }}
          disabled={selectedAssets.length == 0 && true}
        >
          <Text
            style={{
              fontFamily: "OpenSans_600SemiBold",
              color: "#FF626E",
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={{
            uri: indexAsset.uri,
          }}
          style={tw`w-full h-100`}
        />

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
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              pickImage();
            }}
          >
            <Text
              style={{
                fontFamily: "OpenSans_600SemiBold",
                fontSize: 16,
                color: colorMode === "light" ? "black" : "white",
              }}
            >
              Recents
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={25}
              color={colorMode === "light" ? "black" : "white"}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Pressable
              style={tw`${
                colorMode === "light" && isSelectMultiple
                  ? "bg-gray-100 bg-blue-500"
                  : colorMode === "dark" && isSelectMultiple
                  ? "bg-zinc-900 bg-blue-500"
                  : colorMode === "light"
                  ? "bg-gray-100"
                  : "bg-zinc-900"
              } rounded-full px-2 py-1`}
              onPress={() => {
                selectMultiple();
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans_600SemiBold",
                  fontSize: 14,
                  color: colorMode === "light" ? "black" : "white",
                }}
              >
                <MaterialCommunityIcons
                  name="image-multiple-outline"
                  size={15}
                  color={
                    colorMode === "light" && isSelectMultiple
                      ? "white"
                      : colorMode === "dark" && isSelectMultiple
                      ? "white"
                      : colorMode === "light"
                      ? "black"
                      : "white"
                  }
                />
              </Text>
            </Pressable>
            <Pressable
              style={tw`ml-3 ${
                colorMode === "light" ? "bg-gray-100" : "bg-zinc-900"
              } rounded-full p-2`}
              onPress={() => {
                navigation.navigate("camera");
              }}
            >
              <FontAwesome
                name="camera"
                size={15}
                color={colorMode === "light" ? "black" : "white"}
              />
            </Pressable>
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {assets.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  flexBasis: "33.3%",
                  opacity:
                    item.uri === indexAsset.uri || item.selected == true
                      ? 0.5
                      : 1,
                }}
                onPress={() => {
                  changeIndexAssets(item);
                }}
              >
                <ImageBackground
                  source={{
                    uri: item.uri,
                  }}
                  style={tw`w-35 h-35`}
                >
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      alignItems: "flex-end",
                    }}
                  >
                    {isSelectMultiple && !item.selected && (
                      <Ionicons
                        name="radio-button-off-sharp"
                        size={24}
                        color="white"
                        onPress={() => {
                          select(item.id, true);
                        }}
                      />
                    )}
                    {item.selected && (
                      <Pressable
                        onPress={() => {
                          select(item.id, false);
                        }}
                        style={[
                          tw`bg-red-500 my-1 mx-2 rounded-full  w-5 h-5`,
                          {
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#0ea5e9",
                          },
                        ]}
                      >
                        {selectedAssets.map((ite, ind) => (
                          <Fragment key={ind}>
                            {item.id === ite.id ? (
                              <Text
                                style={{
                                  fontFamily: "OpenSans_600SemiBold",
                                  fontSize: 14,
                                  color: "white",
                                }}
                              >
                                {ind + 1}
                              </Text>
                            ) : null}
                          </Fragment>
                        ))}
                      </Pressable>
                    )}
                  </View>
                </ImageBackground>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default NewPostScreen;
