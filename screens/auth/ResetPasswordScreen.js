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
const resetValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
});

const ResetPasswordScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const {
    isSubmitting,
    clearMsg,
    userInfo,
    checkEmailSuccessMsg,
    checkEmailFailMsg,
    checkEmail,
  } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (checkEmailFailMsg) {
      setAlert(checkEmailFailMsg, "fail");
      clearMsg();
    }

    if (checkEmailSuccessMsg) {
      setAlert(checkEmailSuccessMsg, "success");
      clearMsg();
      navigation.navigate("passwordupdate", { email: userInfo.email });
    }
  }, [checkEmailFailMsg, checkEmailSuccessMsg]);

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
        textContent={"Confirming Email..."}
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
            email: "",
          }}
          onSubmit={(values) => checkEmail(values)}
          validationSchema={resetValidationSchema}
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
                  placeholder="Email Address"
                  placeholderTextColor="#808080"
                  autoCapitalize="none"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                ></TextInput>
              </View>
              {errors.email && touched.email && (
                <Text
                  style={[
                    tw`mt-2 ${
                      colorMode === "light" ? "text-red-700" : "text-red-500"
                    }`,
                    { fontSize: 13, fontFamily: "OpenSans_400Regular" },
                  ]}
                >
                  {errors.email}
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
                    Reset
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

export default ResetPasswordScreen;
