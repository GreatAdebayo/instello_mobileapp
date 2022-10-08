import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/dashboard/HomeScreen";
import TabContent from "./TabContent";
import SearchScreen from "../screens/dashboard/SearchScreen";
import NewPostScreen from "../screens/dashboard/NewPostScreen";
import NotificationScreen from "../screens/dashboard/ NotificationScreen";
import ProfileScreen from "../screens/dashboard/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabContent {...props} />}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="new_post"
        component={NewPostScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
