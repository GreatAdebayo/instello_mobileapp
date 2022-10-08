import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext, Fragment, useEffect } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GeneralContext } from "../../contexts/general/state";
import { Formik } from "formik";
import * as yup from "yup";
import { AuthContext } from "../../contexts/auth/state";
import { AlertContext } from "../../contexts/alert/state";
import { Alert } from "../../utils/alert";
import Spinner from "react-native-loading-spinner-overlay";

//Validation Schema
const signupValidationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  userName: yup.string().required("Username is Required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: "Password too weak",
    }),
});

const SignUpScreen = ({ navigation }) => {
  const { height, width } = Dimensions.get("window");
  const { colorMode } = useContext(GeneralContext);
  const {
    signUp,
    isSubmitting,
    signupFailMsg,
    clearMsg,
    signupSuccessMsg,
    userInfo,
  } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (signupFailMsg) {
      setAlert(signupFailMsg, "fail");
      clearMsg();
    }

    if (signupSuccessMsg) {
      setAlert(signupSuccessMsg, "success");
      clearMsg();
      navigation.navigate("confirmation", { email: userInfo.email });
    }
  }, [signupFailMsg, signupSuccessMsg]);
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
        textContent={"Signing Up..."}
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
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          onSubmit={(values) => signUp(values)}
          validationSchema={signupValidationSchema}
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
                  placeholder="First Name"
                  placeholderTextColor="#808080"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                  autoCapitalize="none"
                ></TextInput>
              </View>
              {errors.firstName && touched.firstName && (
                <Text
                  style={[
                    tw`mt-2 ${
                      colorMode === "light" ? "text-red-700" : "text-red-500"
                    }`,
                    { fontSize: 13, fontFamily: "OpenSans_400Regular" },
                  ]}
                >
                  {errors.firstName}
                </Text>
              )}

              <View style={tw`w-full h-12 mt-4`}>
                <TextInput
                  style={[
                    tw`flex-auto px-4 border rounded border-gray-200`,
                    {
                      fontFamily: "OpenSans_400Regular",
                      backgroundColor:
                        colorMode === "light" ? "#FAFAFA" : "#E4E7EB",
                    },
                  ]}
                  placeholder="Last Name"
                  placeholderTextColor="#808080"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                  autoCapitalize="none"
                ></TextInput>
              </View>
              {errors.lastName && touched.lastName && (
                <Text
                  style={[
                    tw`mt-2 ${
                      colorMode === "light" ? "text-red-700" : "text-red-500"
                    }`,
                    { fontSize: 13, fontFamily: "OpenSans_400Regular" },
                  ]}
                >
                  {errors.lastName}
                </Text>
              )}

              <View style={tw`w-full h-12 mt-4`}>
                <TextInput
                  style={[
                    tw`flex-auto px-4 border rounded border-gray-200`,
                    {
                      fontFamily: "OpenSans_400Regular",
                      backgroundColor:
                        colorMode === "light" ? "#FAFAFA" : "#E4E7EB",
                    },
                  ]}
                  placeholder="Username"
                  placeholderTextColor="#808080"
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  value={values.userName}
                  autoCapitalize="none"
                ></TextInput>
              </View>
              {errors.userName && touched.userName && (
                <Text
                  style={[
                    tw`mt-2 ${
                      colorMode === "light" ? "text-red-700" : "text-red-500"
                    }`,
                    { fontSize: 13, fontFamily: "OpenSans_400Regular" },
                  ]}
                >
                  {errors.userName}
                </Text>
              )}

              <View style={tw`w-full h-12 mt-4`}>
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
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  autoCapitalize="none"
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

              <View style={tw`w-full h-12 mt-4`}>
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
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  autoCapitalize="none"
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
              <View style={tw`w-full h-12 mt-10`}>
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
                    Sign Up
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
            Already have an account?{" "}
            <Pressable
              onPress={() => {
                navigation.navigate("signin");
              }}
            >
              <Text
                style={{
                  fontFamily: "OpenSans_600SemiBold",
                  color: "#FF626E",
                }}
              >
                Sign In
              </Text>
            </Pressable>
          </Text>
        </View>
      </View>
      <Alert />
    </SafeAreaView>
  );
};

export default SignUpScreen;
