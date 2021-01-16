import React from "react";
import { Text, View, Button } from "react-native";
import { firebase } from "../config";

export default function HomeScreen({ navigation }) {
  const updateCoordinates = () => {
    let newCoordinateKey = firebase.database().ref().child("coordinates").push()
      .key;

    let coordinate_data = {
      Longitude: 1,
      Latitude: 1,
      Time: Math.floor(Date.now() / 1000),
    };

    let updates = {};
    updates["coordinates/" + newCoordinateKey] = coordinate_data;

    try {
      firebase.database().ref().update(updates);
    } catch (error) {
      alert(error);
    }
  };

  const getCoordinates = () => {
    let coordinateRef = firebase.database().ref("coordinates");
    let index = 0;
    coordinateRef.on("value", (snapshot) => {
      snapshot.forEach((child1) => {
        child1.forEach((child2) => {
          if (index % 3 == 2) {
            console.log(child2.val());
          }
          index++;
        });
      });
    });
  };

  return (
    <View>
      <Text
        onPress={updateCoordinates}
        style={{ marginLeft: 100, marginTop: 100 }}
      >
        Text
      </Text>
      <Text
        onPress={getCoordinates}
        style={{ marginLeft: 100, marginTop: 200 }}
      >
        Cool
      </Text>
    </View>
  );
}
