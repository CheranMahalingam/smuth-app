import React, {useState} from "react";
import { Text, View, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../config";
import PastTrip from "./PastTrip"
import PastTripGeneric from "./PastTripGeneric"



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

  const [destination, setDestination] = useState("")
  const [starting, setStarting] = useState("")

  const goToMap = () =>{
    navigation.navigate("Map")
  }


  return (
    <View>

      <TextInput
                style={styles.input}
                placeholder="Starting Location"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setStarting(text)}
                value={starting}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
      />
      <TextInput
                style={styles.input}
                placeholder="Destination"
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setDestination(text)}
                value={destination}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
      />
      
      <TouchableOpacity onPress={goToMap} style={styles.button}>
          <Text style={styles.buttonTitle}>Go!</Text>
      </TouchableOpacity>

      <PastTrip duration = {14} arrival= {"10:31 AM"} distance={5.2} bump={"minimal"} />
      <PastTripGeneric duration = {21} arrival= {"5:38 PM"} distance={12} bump={"minimal"} />
      <PastTripGeneric duration = {13.2} arrival= {"9:47 PM"} distance={8} bump={"severe"} />
      <PastTripGeneric duration = {7.8} arrival= {"6:15 PM"} distance={13} bump={"many"} />
      
    </View>
    


  );
}

const styles = StyleSheet.create({
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
