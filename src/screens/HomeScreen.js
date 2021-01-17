import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import PastTrip from "./PastTrip";
import PastTripGeneric from "./PastTripGeneric";
import * as Location from "expo-location";
import { firebase } from "../config"

export default function HomeScreen({navigation}) {
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
    let geo1 = await Location.geocodeAsync(starting)
    let geo2 = await Location.geocodeAsync(destination)
    firebase.database().ref('geo/1').set({
      longitude: geo1[0].longitude,
      latitude: geo1[0].latitude,
    })
    firebase.database().ref('geo/2').set({
      longitude: geo2[0].longitude,
      latitude: geo2[0].latitude,
    })
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
  

  const goToMap = async () => {
      let geo1 = await Location.geocodeAsync(starting)
      let geo2 = await Location.geocodeAsync(destination)
      setStartMapLatitude(geo1[0].latitude);
      setStartMapLongitude(geo1[0].longitude);
      setEndMapLatitude(geo2[0].latitude);
      setEndMapLongitude(geo2[0].longitude);
      navigation.navigate("Map");
      };

  return (
    <View>
      <TextInput
                style={styles.input}
                placeholder="starting location"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setStarting(text)}
                value={starting}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
      />
      <TextInput
                style={styles.input}
                placeholder="destination"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setDestination(text)}
                value={destination}
                underlineColorAndroid="transparent"
                autoCapitalize="none"

      />

      <TouchableOpacity onPress={goToMap} style={styles.button}>
        <Text style={styles.buttonTitle}>Go!</Text>
      </TouchableOpacity>

      <PastTrip
        duration={14}
        arrival={"10:31 AM"}
        distance={5.2}
        bump={"minimal"}
      />
      <PastTripGeneric
        duration={21}
        arrival={"5:38 PM"}
        distance={12}
        bump={"minimal"}
      />
      <PastTripGeneric
        duration={13.2}
        arrival={"9:47 PM"}
        distance={8}
        bump={"severe"}
      />
      <PastTripGeneric
        duration={7.8}
        arrival={"6:15 PM"}
        distance={13}
        bump={"many"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#556995",
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#556995",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: "white",
    fontSize: 16,
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
