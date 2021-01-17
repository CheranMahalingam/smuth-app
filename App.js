import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SelectScreen from "./src/screens/SelectScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import ResetScreen from "./src/screens/ResetScreen";
import MapScreen from "./src/screens/MapScreen";
import { firebase } from "./src/config";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Select" component={SelectScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Reset" component={ResetScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
