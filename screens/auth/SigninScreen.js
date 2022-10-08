import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext, useEffect, Fragment } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import * as yup from "yup";
import { GeneralContext } from "../../contexts/general/state";
import { Alert } from "../../utils/alert";
import { AuthContext } from "../../contexts/auth/state";
import { AlertContext } from "../../contexts/alert/state";
import Spinner from "react-native-loading-spinner-overlay";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//Validation Schema
const signinValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup.string().required("Password is required"),
});

const SignInScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const { signIn, isSubmitting, signInFailMsg, clearMsg, isAuthenticated } =
    useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (signInFailMsg) {
      setAlert(signInFailMsg, "fail");
      clearMsg();
    }

    if (isAuthenticated) {
      navigation.navigate("home");
    }
  }, [isAuthenticated, signInFailMsg]);

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
        textContent={"Signing In..."}
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
            password: "",
          }}
          onSubmit={(values) => signIn(values)}
          validationSchema={signinValidationSchema}
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
                  placeholder="Password"
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
              <Pressable
                style={{
                  alignItems: "flex-end",
                }}
                onPress={() => {
                  navigation.navigate("passwordreset");
                }}
              >
                <Text
                  style={{
                    color: "#FF626E",
                    fontFamily: "OpenSans_600SemiBold",
                  }}
                >
                  Forgot Password?
                </Text>
              </Pressable>
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
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}
        </Formik>

        <View
          style={[
            tw`my-8`,
            {
              flexDirection: "row",
              justifyContent: "center",
            },
          ]}
        >
          <View
            style={tw`border-b-[0.3px] w-88 mb-2 w-40 mt-3 border-gray-400`}
          ></View>
          <Text
            style={[
              tw`mx-5 ${
                colorMode === "light" ? "text-gray-400" : "text-white"
              } mt-2`,
              {
                fontFamily: "OpenSans_600SemiBold",
              },
            ]}
          >
            OR
          </Text>
          <View
            style={tw`border-b-[0.3px] w-88 mb-2 w-40 mt-3 border-gray-400`}
          ></View>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={[
              tw`${colorMode === "light" ? "text-gray-400" : "text-white"}`,
              {
                fontFamily: "OpenSans_400Regular",
              },
            ]}
          >
            Dont have an account?{" "}
            <Pressable
              onPress={() => {
                navigation.navigate("signup");
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans_600SemiBold",
                  color: "#FF626E",
                }}
              >
                Sign Up
              </Text>
            </Pressable>
          </Text>
        </View>
      </View>
      <Alert />
    </SafeAreaView>
  );
};

export default SignInScreen;
