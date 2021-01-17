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

export default function Select({navigation}) {
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

  const goToMap = () => {
    navigation.navigate("Map");
  };

  return (
    <View>
      <View style={styles.background}>
      <Text style={styles.heading}>
        new trip
      </Text>
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

      <TouchableOpacity onPress={goToMap} style={styles.button}>
        <Text style={styles.buttonTitle}>go!</Text>
      </TouchableOpacity>
      </View>

      <PastTrip
        duration={14}
        arrival={"10:31 AM"}
        distance={5.5}
        bump={"minimal"}
      />
      <PastTripGeneric
        duration={15}
        arrival={"10:32 PM"}
        distance={5.6}
        bump={"several"}
      />
      <PastTripGeneric
        duration={20}
        arrival={"10:37 PM"}
        distance={5.2}
        bump={"severe"}
      />
      <PastTripGeneric
        duration={21}
        arrival={"10:38 PM"}
        distance={5.9}
        bump={"severe"}
      />
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
    color: 'white',
    fontWeight: 'bold',
    height: 48,
    borderRadius: 10,
    borderColor: 'white',
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
