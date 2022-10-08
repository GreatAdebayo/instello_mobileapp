import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, Fragment } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { GeneralContext } from "../../contexts/general/state";
import { Alert } from "../../utils/alert";
import { AuthContext } from "../../contexts/auth/state";
import { AlertContext } from "../../contexts/alert/state";
import Spinner from "react-native-loading-spinner-overlay";

//Validation Schema
const updatePassValidationSchema = yup.object().shape({
  code: yup
    .number()
    .required("Code is Required")
    .min(4, ({ min }) => `Code must be at least ${min} characters`),
  password: yup
    .string()
    .required("Password is required")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Password too weak",
    }),
});

const UpdatePasswordScreen = ({ route, navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const {
    updatePassword,
    isSubmitting,
    clearMsg,
    updatePasswordFailMsg,
    updatePasswordSuccessMsg,
  } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (updatePasswordFailMsg) {
      setAlert(updatePasswordFailMsg, "fail");
      clearMsg();
    }

    if (updatePasswordSuccessMsg) {
      setAlert(updatePasswordSuccessMsg, "success");
      clearMsg();
      navigation.navigate("signin");
    }
  }, [updatePasswordSuccessMsg, updatePasswordFailMsg]);

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
      <Spinner
        visible={isSubmitting}
        textContent={"Updating Password..."}
        textStyle={{
          color: "#FFF",
        }}
      />
      <View
        style={[
          tw`mx-4`,
          {
            flex: 1,
            justifyContent: "center",
          },
        ]}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name="instagram" size={30} color="#FF626E" />
          <Text
            style={[
              tw`text-2xl`,
              {
                fontFamily: "OpenSans_600SemiBold",
                color: colorMode === "light" ? "#3B3E43" : "white",
              },
            ]}
          >
            Instello
          </Text>
        </View>

        <Formik
          initialValues={{
            code: "",
            password: "",
          }}
          onSubmit={(values) => updatePassword(values, route.params.email)}
          validationSchema={updatePassValidationSchema}
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
              <View style={tw`w-full h-12 mt-10`}>
                <TextInput
                  style={[
                    tw`flex-auto px-4 border rounded border-gray-200`,
                    {
                      fontFamily: "OpenSans_400Regular",
                      backgroundColor:
                        colorMode === "light" ? "#FAFAFA" : "#E4E7EB",
                    },
                  ]}
                  placeholder="4-digit Code"
                  placeholderTextColor="#808080"
                  autoCapitalize="none"
                  onChangeText={handleChange("code")}
                  onBlur={handleBlur("code")}
                  value={values.code}
                ></TextInput>
              </View>
              {errors.code && touched.code && (
                <Text
                  style={[
                    tw`mt-2 ${
                      colorMode === "light" ? "text-red-700" : "text-red-500"
                    }`,
                    { fontSize: 13, fontFamily: "OpenSans_400Regular" },
                  ]}
                >
                  {errors.code}
                </Text>
              )}
              <View style={tw`w-full h-12 my-4`}>
                <TextInput
                  style={[
                    tw`flex-auto px-4  border rounded border-gray-200`,
                    {
                      fontFamily: "OpenSans_400Regular",
                      backgroundColor:
                        colorMode === "light" ? "#FAFAFA" : "#E4E7EB",
                    },
                  ]}
                  placeholder="New Password"
                  placeholderTextColor="#808080"
                  autoCapitalize="none"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                ></TextInput>
              </View>
              {errors.password && touched.password && (
                <Text
                  style={[
                    tw`mt-2 ${
                      colorMode === "light" ? "text-red-700" : "text-red-500"
                    }`,
                    { fontSize: 13, fontFamily: "OpenSans_400Regular" },
                  ]}
                >
                  {errors.password}
                </Text>
              )}
              <View style={tw`w-full h-12 mt-8`}>
                <TouchableOpacity
                  style={[
                    tw`flex items-center justify-center flex-1 h-full py-1 w-full rounded`,
                    {
                      backgroundColor: "#FF626E",
                    },
                  ]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Text
                    style={[
                      tw`text-base`,
                      {
                        fontFamily: "OpenSans_800ExtraBold",
                        color: "#fff",
                      },
                    ]}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
        </Formik>
      </View>
      <Alert />
    </SafeAreaView>
  );
};

export default UpdatePasswordScreen;
