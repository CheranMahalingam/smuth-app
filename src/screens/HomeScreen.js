import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import { firebase } from "../config";

export default function App() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
      </Text>
      <Text style={styles.text}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <Text style={styles.paragraph}>{timestamp}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={subscription ? _unsubscribe : _subscribe}
          style={styles.button}
        >
          <Text>{subscription ? "On" : "Off"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_slow}
          style={[styles.button, styles.middleButton]}
        >
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});
