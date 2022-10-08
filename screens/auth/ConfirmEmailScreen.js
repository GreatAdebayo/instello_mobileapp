import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext, Fragment, useEffect } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GeneralContext } from "../../contexts/general/state";
import { AuthContext } from "../../contexts/auth/state";
import { AlertContext } from "../../contexts/alert/state";
import { Formik } from "formik";
import * as yup from "yup";
import { Alert } from "../../utils/alert";
import Spinner from "react-native-loading-spinner-overlay";

//Validation Schema
const confirmValidationSchema = yup.object().shape({
  code: yup
    .number()
    .required("Code is Required")
    .min(4, ({ min }) => `Code must be at least ${min} characters`),
});

const ConfirmEmailScreen = ({ route, navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const {
    confirmEmail,
    resendCode,
    sendCodeFailMsg,
    sendCodeSuccessMsg,
    confirmFailMsg,
    isAuthenticated,
    clearMsg,
    isSubmitting,
  } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (sendCodeFailMsg) {
      setAlert(sendCodeFailMsg, "fail");
      clearMsg();
    }

    if (sendCodeSuccessMsg) {
      setAlert(sendCodeSuccessMsg, "success");
      clearMsg();
    }

    if (confirmFailMsg) {
      setAlert(confirmFailMsg, "fail");
      clearMsg();
    }

    if (isAuthenticated) {
      navigation.navigate("home");
    }
  }, [sendCodeFailMsg, sendCodeSuccessMsg, confirmFailMsg, isAuthenticated]);

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
            code: "",
          }}
          onSubmit={(values) =>
            confirmEmail({ values, email: route.params.email })
          }
          validationSchema={confirmValidationSchema}
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
                  placeholder="4-digit code"
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
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
        </Formik>
        <TouchableOpacity
          style={[
            tw`mt-3`,
            {
              alignItems: "flex-end",
            },
          ]}
          onPress={() => {
            resendCode(route.params.email);
          }}
        >
          <Text
            style={{
              color: "#FF626E",
              fontFamily: "OpenSans_600SemiBold",
            }}
          >
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
      <Alert />
    </SafeAreaView>
  );
};

export default ConfirmEmailScreen;
