import { View, Modal, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { GeneralContext } from "../contexts/general/state";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../contexts/auth/state";

const MenuModal = ({ isModalVisible, setModalVisible }) => {
  const { colorMode } = useContext(GeneralContext);
  const { signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <View
          style={[
            styles.modalView,
            tw`${colorMode === "light" ? "bg-white" : "bg-zinc-900"}`,
          ]}
        >
          <View
            style={[
              tw`px-5 py-3`,
              {
                height: 250,
              },
            ]}
          >
            <TouchableOpacity
              style={{
                alignItems: "flex-end",
              }}
              onPress={() => {
                closeModal();
              }}
            >
              <Entypo
                name="cross"
                size={25}
                color={colorMode === "light" ? "black" : "white"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!isModalVisible);
                navigation.navigate("settings");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: colorMode === "light" ? "black" : "white",
                  fontFamily: "OpenSans_400Regular",
                }}
              >
                <Feather
                  name="settings"
                  size={20}
                  color={colorMode === "light" ? "black" : "white"}
                />{" "}
                Settings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`mt-5`}
              onPress={() => {
                setModalVisible(!isModalVisible);
                navigation.navigate("subscriptions");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: colorMode === "light" ? "black" : "white",
                  fontFamily: "OpenSans_400Regular",
                }}
              >
                <Entypo
                  name="list"
                  size={20}
                  color={colorMode === "light" ? "black" : "white"}
                />{" "}
                Subscription Lists
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`mt-5`}
              onPress={() => {
                setModalVisible(!isModalVisible);
                navigation.navigate("saved_posts");
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: colorMode === "light" ? "black" : "white",
                  fontFamily: "OpenSans_400Regular",
                }}
              >
                <FontAwesome
                  name="bookmark"
                  size={20}
                  color={colorMode === "light" ? "black" : "white"}
                />
                {"  "}
                Saved
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`mt-5`}
              onPress={() => {
                setModalVisible(!isModalVisible);
                signOut();
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: colorMode === "light" ? "black" : "white",
                  fontFamily: "OpenSans_400Regular",
                }}
              >
                <AntDesign
                  name="logout"
                  size={20}
                  color={colorMode === "light" ? "black" : "white"}
                />{" "}
                Signout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MenuModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    margin: 2,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
