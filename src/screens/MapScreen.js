import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Accelerometer } from "expo-sensors";
import MapViewDirections from "react-native-maps-directions";
import { firebase, GOOGLE_MAPS_APIKEY } from "../config";

export default function MapScreen({ navigation }) {
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
        alert("Permission to access location was denied");
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

  const coordinates = [
    {
      latitude: 43.47250338656596,
      longitude: -80.54485760211877,
    },
    {
      latitude: 43.533436958129414,
      longitude: -80.2260946029965
    },
  ];

  return (
    <MapView
      initialRegion={{
        latitude: 43.50250338656596, 
        longitude: -80.38085760211877,
        latitudeDelta: 0.50,
        longitudeDelta: 0.40,
      }}
      style={{ flex: 1 }}
      showsUserLocation
    >
      <MapView.Marker draggable coordinate={coordinates[0]} />
      <MapView.Marker draggable coordinate={coordinates[1]} />
      <MapView.Marker coordinate={{latitude: 43.50250338656596, longitude: -80.34485760211877,}}
       image={require('../../assets/pothole.png')}
       onZoomRadiusChange={{
        zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        radius: [1.0, 1.0, 1.5, 2.0, 3.0, 6.0, 8.0, 1.00, 1.20, 1.50, 1.80, 2.0, 2.5, 2.5]
     }}
      />
      <MapViewDirections
        origin={coordinates[0]}
        destination={coordinates[1]}
        apikey={GOOGLE_MAPS_APIKEY}
        provideRouteAlternatives = {true}
        strokeWidth={3}
        strokeColor="red"
        resetOnChange = {true}
      />
    </MapView>
  );
}