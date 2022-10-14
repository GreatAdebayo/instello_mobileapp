import {
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { GeneralContext } from "../../contexts/general/state";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feeds from "../../components/Feeds";
import { PrivateContext } from "../../contexts/dashboard/private/state";

const HomeScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const { isFetching, fetchFeeds } = useContext(PrivateContext);

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
          tw`px-5 py-3 ${colorMode === "light" ? "border-b-2" : "border-0"}`,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            borderColor: "#F2F2F2",
          },
        ]}
      >
        <MaterialCommunityIcons name="instagram" size={35} color="#FF626E" />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("direct_message");
          }}
        >
          <MaterialCommunityIcons
            name="facebook-messenger"
            size={32}
            color={colorMode === "light" ? "black" : "white"}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={fetchFeeds} />
        }
      >
        <View style={tw`mb-20`}>
          <Feeds />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
