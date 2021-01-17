import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import PastTrip from "./PastTrip";
import PastTripGeneric from "./PastTripGeneric";
import { firebase } from "../config";

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [previousData, setPreviousData] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [destination, setDestination] = useState("");
  const [starting, setStarting] = useState("");
  const [startMapLongitude, setStartMapLongitude] = useState(0);
  const [startMapLatitude, setStartMapLatitude] = useState(0);
  const [endMapLongitude, setEndMapLongitude] = useState(0);
  const [endMapLatitude, setEndMapLatitude] = useState(0);

  const goToMap = async () => {
    let geo1 = await Location.geocodeAsync(starting);
    let geo2 = await Location.geocodeAsync(destination);
    firebase.database().ref("geo/1").set({
      longitude: geo1[0].longitude,
      latitude: geo1[0].latitude,
    });
    firebase.database().ref("geo/2").set({
      longitude: geo2[0].longitude,
      latitude: geo2[0].latitude,
    });
    navigation.navigate("Map");
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  if (
    data.y > 1.5 &&
    previousData != timestamp &&
    latitude &&
    longitude &&
    timestamp
  ) {
    setPreviousData(timestamp);
    updateCoordinates();
  }
  const { x, y, z } = data;

  const goToSelect = () => {
    navigation.navigate("Select");
  };

  return (
    <View>
      <View style={styles.background}>
        <Text style={styles.heading}>new trip</Text>
        <TextInput
          style={styles.input}
          placeholder="starting location"
          placeholderTextColor="white"
          onChangeText={(text) => setStarting(text)}
          value={starting}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="destination"
          placeholderTextColor="white"
          onChangeText={(text) => setDestination(text)}
          value={destination}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />

        <TouchableOpacity onPress={goToSelect} style={styles.button}>
          <Text style={styles.buttonTitle}>go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginTop: 10,
    fontSize: 30,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },

  background: {
    backgroundColor: "#556995",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    color: "white",
    fontWeight: "bold",
    height: 48,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 3,
    overflow: "hidden",
    // backgroundColor: "white",
    marginTop: 20,
    // marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    paddingLeft: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 60,
  },
  button: {
    backgroundColor: "white",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 60,
  },
  buttonTitle: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#3356EB",
    fontWeight: "bold",
    fontSize: 16,
  },
  resetLink: {
    color: "#3356EB",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 40,
    marginTop: 10,
  },
});
