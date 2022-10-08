import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useRef, useEffect, useState } from "react";
import tw from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PrivateContext } from "../../contexts/dashboard/private/state";
import { Camera } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const CameraScreen = ({ navigation }) => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [flash, setFlash] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const { takePicture, setAssets } = useContext(PrivateContext);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const switchCamera = () => {
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const flashSwitch = () => {
    setFlash(!flash);
  };

  const takePic = async () => {
    let options = {
      quality: 0.1,
      base64: true,
      skipProcessing: true,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    takePicture(newPhoto);
    navigation.navigate("post_manage");
  };

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
      setAssets(result, "change");
      navigation.navigate("post_manage");
    }
  };
  return (
    <Camera
      style={styles.container}
      ref={cameraRef}
      flashMode={
        flash ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
      }
      type={cameraType}
    >
      <View
        style={[
          tw`mx-4 my-15`,
          {
            flexDirection: "row",
            position: "absolute",
            top: 0,
          },
        ]}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center" }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Entypo name="cross" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          onPress={() => {
            flashSwitch();
          }}
        >
          {flash ? (
            <Ionicons name="flash-off" size={30} color="white" />
          ) : (
            <Ionicons name="flash" size={30} color="white" />
          )}
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}
        >
          <Feather name="settings" size={30} color="white" />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          takePic();
        }}
        style={[
          tw`mx-4 my-20 border rounded-full border-white px-1`,
          {
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
          },
        ]}
      >
        <FontAwesome name="circle" size={80} color="white" />
      </TouchableOpacity>

      <View
        style={[
          tw`mx-4 mb-8 px-1`,
          {
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
          },
        ]}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            pickImage();
          }}
        >
          <MaterialCommunityIcons
            name="image-multiple-outline"
            size={40}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flex: 1, alignItems: "flex-end" }}
          onPress={() => {
            switchCamera();
          }}
        >
          <MaterialIcons name="flip-camera-android" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
