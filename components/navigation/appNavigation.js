import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LocalVideoScreen from '../screens/LocalVideoScreen'; // adjust path

// Screens
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import PersonScreen from "../screens/PersonScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// ✅ Drawer Navigator with black background
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#2d2e30',
        },
        drawerActiveTintColor: 'white',   
        drawerInactiveTintColor: 'gray',   
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
}

// ✅ Main App Navigation with Stack
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      detachInactiveScreens={true}
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DrawerHome" component={DrawerNavigator} />
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Person" component={PersonScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="LocalVideo" component={LocalVideoScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
