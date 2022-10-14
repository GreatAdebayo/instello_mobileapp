import { View, Modal, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { GeneralContext } from "../contexts/general/state";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const PostTypeModal = ({ isModalVisible, setModalVisible, pickImage }) => {
  const { colorMode } = useContext(GeneralContext);

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
                height: 200,
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
                pickImage(true);
                closeModal();
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colorMode === "light" ? "black" : "white",
                  fontFamily: "OpenSans_400Regular",
                }}
              >
                <MaterialIcons
                  name="insert-photo"
                  size={18}
                  color={colorMode === "light" ? "black" : "white"}
                />{" "}
                Photos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw`mt-5`}
              onPress={() => {
                pickImage(false);
                closeModal();
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: colorMode === "light" ? "black" : "white",
                  fontFamily: "OpenSans_400Regular",
                }}
              >
                <Ionicons
                  name="videocam"
                  size={20}
                  color={colorMode === "light" ? "black" : "white"}
                />{" "}
                Videos
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PostTypeModal;

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
