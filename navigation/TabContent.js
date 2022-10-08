import React, { useContext, useEffect } from "react";
import tw from "twrnc";
import { View, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { GeneralContext } from "../contexts/general/state";
import { AuthContext } from "../contexts/auth/state";

const TabContent = ({ state, descriptors, navigation }) => {
  const { colorMode } = useContext(GeneralContext);
  const { userInfo, persitSignin, isLoading } = useContext(AuthContext);
  useEffect(() => {
    persitSignin();
  }, []);

  return (
    <View
      style={[
        tw`py-3 shadow-lg ${
          colorMode === "light" ? "bg-white border-t-2" : "bg-zinc-900"
        } h-20`,
        {
          alignItems: "flex-start",
          flexDirection: "row",
          borderColor: "#F2F2F2",
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              {index === 0 &&
                (isFocused ? (
                  <Foundation name="home" size={32} color="#FF626E" />
                ) : (
                  <Octicons
                    name="home"
                    size={32}
                    color={colorMode === "light" ? "black" : "white"}
                  />
                ))}
              {index === 1 &&
                (isFocused ? (
                  <FontAwesome name="search" size={32} color="#FF626E" />
                ) : (
                  <Feather
                    name="search"
                    size={32}
                    color={colorMode === "light" ? "black" : "white"}
                  />
                ))}
              {index === 2 &&
                (isFocused ? (
                  <FontAwesome name="plus-square" size={32} color="#FF626E" />
                ) : (
                  <FontAwesome
                    name="plus-square-o"
                    size={32}
                    color={colorMode === "light" ? "black" : "white"}
                  />
                ))}
              {index === 3 &&
                (isFocused ? (
                  <FontAwesome name="heart" size={32} color="#FF626E" />
                ) : (
                  <AntDesign
                    name="hearto"
                    size={32}
                    color={colorMode === "light" ? "black" : "white"}
                  />
                ))}

              {index === 4 &&
                (!isLoading && userInfo.profilePicture ? (
                  <Image
                    source={userInfo.profilePicture}
                    style={tw`w-8 h-8 rounded-full`}
                  />
                ) : (
                  <FontAwesome
                    name="user-circle"
                    size={32}
                    color={
                      colorMode === "light" && isFocused
                        ? "#FF626E"
                        : colorMode === "dark" && isFocused
                        ? "#FF626E"
                        : colorMode === "light"
                        ? "black"
                        : "white"
                    }
                  />
                ))}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabContent;
