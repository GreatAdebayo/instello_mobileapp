import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { MaterialIcons } from "@expo/vector-icons";
import Notifications from "../../components/Notifications";

const NotificationScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);

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
          tw`py-3 px-4`,
          {
            flexDirection: "row",
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
          Notifications
        </Text>
      </View>
      <Notifications />
    </SafeAreaView>
  );
};

export default NotificationScreen;
