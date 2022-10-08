import React, { Fragment, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AlertContext } from "../contexts/alert/state";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";

export const Alert = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <Fragment>
      {alerts.length
        ? alerts.map((alert, index) => (
            <View style={style.alertPosition} key={index}>
              <View
                style={tw`${
                  alert.type === "fail"
                    ? "bg-rose-700 rounded p-4"
                    : "bg-green-700 rounded p-4"
                }`}
              >
                <Text
                  style={[
                    tw`text-white text-xs capitalize`,
                    {
                      fontFamily: "OpenSans_600SemiBold",
                    },
                  ]}
                >
                  <Entypo name="info-with-circle" size={15} color="white" />{" "}
                  {alert.msg}
                </Text>
              </View>
            </View>
          ))
        : null}
    </Fragment>
  );
};

const style = StyleSheet.create({
  alertPosition: {
    position: "fixed",
    top: 0,
    right: 0,
    margin: 5,
    padding: 10,
  },
});
