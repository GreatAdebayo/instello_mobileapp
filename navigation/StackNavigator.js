import React, { useContext, Fragment } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfirmEmailScreen from "../screens/auth/ConfirmEmailScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import SignInScreen from "../screens/auth/SigninScreen";
import SignUpScreen from "../screens/auth/SignupScreen";
import UpdatePasswordScreen from "../screens/auth/UpdatePasswordScreen";
import { AuthContext } from "../contexts/auth/state";
import BottomTabNavigator from "./BottomTabNavigator";
import EditProfileScreen from "../screens/dashboard/EditProfileScreen";
import DirectMesaageScreen from "../screens/dashboard/DirectMessageScreen";
import DmDetailsScreen from "../screens/dashboard/DmDetailsScreen";
import CommentsScreen from "../screens/dashboard/CommentsScreen";
import PublicProfileScreen from "../screens/dashboard/PublicProfileScreen";
import SettingsScreen from "../screens/dashboard/SettingsScreen";
import SavedPostsScreen from "../screens/dashboard/SavedPostsScreen";
import SubscriptionListsScreen from "../screens/dashboard/SubscriptionListsScreen";
import { StatusBar } from "expo-status-bar";
import { GeneralContext } from "../contexts/general/state";
import FollowingScreen from "../screens/dashboard/FollowingScreen";
import FollowerScreen from "../screens/dashboard/FollowerScreen";
import NewPostScreen from "../screens/dashboard/NewPostScreen";
import PostManageScreen from "../screens/dashboard/PostManageScreen";
import CameraScreen from "../screens/dashboard/CameraScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { colorMode } = useContext(GeneralContext);

  return (
    <Fragment>
      <StatusBar style={colorMode == "light" ? "dark" : "light"} />
      <Stack.Navigator>
        {isAuthenticated ? (
          <Fragment>
            <Stack.Screen
              name="index"
              component={BottomTabNavigator}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="edit_profile"
              component={EditProfileScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="direct_message"
              component={DirectMesaageScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="dm_details"
              component={DmDetailsScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="comments"
              component={CommentsScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="public_profile"
              component={PublicProfileScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="settings"
              component={SettingsScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="saved_posts"
              component={SavedPostsScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="subscriptions"
              component={SubscriptionListsScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="followings"
              component={FollowingScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="followers"
              component={FollowerScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="post_manage"
              component={PostManageScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="camera"
              component={CameraScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen
              name="signin"
              component={SignInScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="signup"
              component={SignUpScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="confirmation"
              component={ConfirmEmailScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="passwordreset"
              component={ResetPasswordScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="passwordupdate"
              component={UpdatePasswordScreen}
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
          </Fragment>
        )}
      </Stack.Navigator>
    </Fragment>
  );
};

export default StackNavigator;
