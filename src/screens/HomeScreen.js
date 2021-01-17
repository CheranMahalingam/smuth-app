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
import { firebase } from "../config";

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
  
  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.watchPositionAsync(
        {
          timeInterval: 0,
          accuracy: Location.Accuracy.BestForNavigation,
        },
        (loc) => updateHookdata(loc)
      );
    })();
  }, []);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const updateHookdata = (loc) => {
    setLatitude(JSON.stringify(loc.coords.latitude));
    setLongitude(JSON.stringify(loc.coords.longitude));
    setTimestamp(JSON.stringify(loc.timestamp));
  };

  const updateCoordinates = () => {
    let newCoordinateKey = firebase.database().ref().child("coordinates").push()
      .key;

    let coordinate_data = {
      Longitude: longitude,
      Latitude: latitude,
      Time: timestamp,
    };

    let updates = {};
    updates["coordinates/" + newCoordinateKey] = coordinate_data;

    try {
      firebase.database().ref().update(updates);
    } catch (error) {
      alert(error);
    }
  };
  


  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(100);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
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
