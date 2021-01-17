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
  const [lat1, setLat1] = useState(0);
  const [long1, setLong1] = useState(0);
  const [lat2, setLat2] = useState(0);
  const [long2, setLong2] = useState(0);

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
    let coordinateRef = firebase.database().ref("geo/1");
    coordinateRef.on("value", (snapshot) => {
      setLat1(snapshot.val().latitude);
      setLong1(snapshot.val().longitude);
    });
    let coordinateRef2 = firebase.database().ref("geo/2");
    coordinateRef2.on("value", (snapshot) => {
      setLat2(snapshot.val().latitude);
      setLong2(snapshot.val().longitude);
    });
  });

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
      latitude: lat1,
      longitude: long1,
    },
    {
      latitude: lat2,
      longitude: long2,
    },
  ];

  return (
    <MapView
      initialRegion={{
        latitude: (lat1 + lat2) / 2,
        longitude: (long1 + long2) / 2,
        latitudeDelta: 0.5,
        longitudeDelta: 0.4,
      }}
      style={{ flex: 1 }}
      showsUserLocation
    >
      <MapView.Marker draggable coordinate={coordinates[0]} />
      <MapView.Marker draggable coordinate={coordinates[1]} />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 - 0.123,
          longitude: -80.54481 + 0.421,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 - 0.189,
          longitude: -80.54481 + 0.1328,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.37612,
          longitude: -80.54481 + 0.3643,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.132,
          longitude: -80.54481 + 0.14329,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.231,
          longitude: -80.54481 + 0.098,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.422,
          longitude: -80.54481 + 0.1921,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.0432,
          longitude: -80.54481 + 0.131,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.432,
          longitude: -80.54481 + 0.1321,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.5221,
          longitude: -80.54481 + 0.2313,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.321,
          longitude: -80.54481 + 0.0123,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.023,
          longitude: -80.54481 + 0.1932,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.05,
          longitude: -80.54481 + 0.01,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.15,
          longitude: -80.54481 + 0.07,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.3,
          longitude: -80.54481 + 0.3,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.02,
          longitude: -80.54481 + 0.03,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapView.Marker
        coordinate={{
          latitude: 43.47397 + 0.01,
          longitude: -80.54481 + 0.01,
        }}
        image={require("../../assets/pothole.png")}
        onZoomRadiusChange={{
          zoom: [0, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17],
          radius: [
            1.0,
            1.0,
            1.5,
            2.0,
            3.0,
            6.0,
            8.0,
            1.0,
            1.2,
            1.5,
            1.8,
            2.0,
            2.5,
            2.5,
          ],
        }}
      />
      <MapViewDirections
        origin={coordinates[0]}
        destination={coordinates[1]}
        apikey={GOOGLE_MAPS_APIKEY}
        provideRouteAlternatives={true}
        strokeWidth={3}
        strokeColor="red"
        resetOnChange={true}
      />
    </MapView>
  );
}
