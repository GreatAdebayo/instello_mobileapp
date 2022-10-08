import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Switch,
} from "react-native";
import React, { useContext, useEffect, Fragment, useState } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PrivateContext } from "../../contexts/dashboard/private/state";
import Spinner from "react-native-loading-spinner-overlay";
import { AlertContext } from "../../contexts/alert/state";
import { Alert } from "../../utils/alert";
import { Video } from "expo-av";
import { Formik } from "formik";
import * as yup from "yup";

//Validation Schema
const postSchema = yup.object().shape({
  caption: yup.string().required("Caption is Required"),
});

const PostManageScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const {
    selectedAssets,
    uploadAssets,
    isUploading,
    uploadSuccessMsg,
    uploadFailMsg,
    clearUploadMsg,
  } = useContext(PrivateContext);

  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (uploadSuccessMsg) {
      setAlert(uploadSuccessMsg, "success");
      clearUploadMsg();
      navigation.navigate("profile");
    }

    if (uploadFailMsg) {
      setAlert(uploadFailMsg, "fail");
      clearUploadMsg();
    }
  }, [uploadSuccessMsg, uploadFailMsg]);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView
      style={{
        width,
        height,
        backgroundColor: colorMode === "light" ? "#FAFAFA" : "black",
      }}
    >
      <Spinner
        visible={isUploading}
        textContent={"Uploading..."}
        textStyle={{
          color: "#FFF",
        }}
      />
      <Formik
        initialValues={{
          caption: "",
        }}
        onSubmit={(values) => uploadAssets(values, isEnabled)}
        validationSchema={postSchema}
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
                <MaterialIcons
                  name="arrow-back-ios"
                  size={22}
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
                Manage Post
              </Text>
              <TouchableOpacity onPress={handleSubmit} disabled={isUploading}>
                <Text
                  style={{
                    fontFamily: "OpenSans_600SemiBold",
                    color: "#FF626E",
                  }}
                >
                  Share
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                tw`m-3`,
                {
                  flexDirection: "row",
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                {selectedAssets[0].mediaType === "video" ||
                selectedAssets[0].type === "video" ? (
                  <Video
                    style={tw`w-full h-20`}
                    source={{
                      uri: selectedAssets[0].uri,
                    }}
                    isLooping
                    shouldPlay={true}
                  />
                ) : (
                  <ImageBackground
                    source={{
                      uri: selectedAssets[0].uri,
                    }}
                    style={tw`w-full h-20`}
                  >
                    <View
                      style={[
                        tw`m-1`,
                        {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          alignItems: "flex-end",
                        },
                      ]}
                    >
                      {selectedAssets.length > 1 && (
                        <MaterialCommunityIcons
                          name="card-multiple"
                          size={24}
                          color="white"
                        />
                      )}
                    </View>
                  </ImageBackground>
                )}
              </View>

              <View style={[tw`p-2`, { flex: 3 }]}>
                <TextInput
                  style={{
                    fontFamily: "OpenSans_400Regular",
                    color: colorMode === "light" ? "black" : "white",
                  }}
                  placeholder="Write a caption..."
                  placeholderTextColor={
                    colorMode === "light" ? "black" : "white"
                  }
                  autoCapitalize="none"
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                />
                {errors.caption && touched.caption && (
                  <Text
                    style={[
                      tw`mt-2 ${
                        colorMode === "light" ? "text-red-700" : "text-red-500"
                      }`,
                      { fontSize: 13, fontFamily: "OpenSans_400Regular" },
                    ]}
                  >
                    {errors.caption}
                  </Text>
                )}
              </View>
            </View>

            <View
              style={tw`m-3 border-b border-t py-3 ${
                colorMode === "light" ? "border-gray-300" : "border-zinc-700"
              }`}
            >
              <MaterialCommunityIcons
                name="eye-circle"
                size={24}
                color="#FF626E"
              />
              <View
                style={[
                  tw`mt-1`,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                  },
                ]}
              >
                <Text
                  style={{
                    fontFamily: "OpenSans_600SemiBold",
                    color: colorMode === "light" ? "black" : "white",
                  }}
                >
                  Requires subscribtion
                </Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#FF626E" }}
                  thumbColor="#f4f3f4"
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </Fragment>
        )}
      </Formik>

      <Alert />
    </SafeAreaView>
  );
};

export default PostManageScreen;
