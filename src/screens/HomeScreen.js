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
  const goToSelect = () =>{
    navigation.navigate("Select")
  }


  return (
    <View style={styles.view}>
        <Text style={styles.heading}>
        new trip
      </Text>
      <TextInput
                style={styles.input}
                placeholder="Starting Location"
                placeholderTextColor="white"
                onChangeText={(text) => setStarting(text)}
                value={starting}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
      />
      <TextInput
                style={styles.input}
                placeholder="Destination"
                placeholderTextColor="white"
                onChangeText={(text) => setDestination(text)}
                value={destination}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
      />
      
      <TouchableOpacity onPress={goToSelect} style={styles.button}>
          <Text style={styles.buttonTitle}>Go!</Text>
      </TouchableOpacity>

     
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    
  },
  heading: {
    marginTop: 10,
    fontSize: 30,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  view:{
    backgroundColor: "#556995",
    // marginTop: 200,
    paddingTop: 200,
    paddingBottom: 300
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: "center",
    margin: 30,
  },
  
  button: {
    backgroundColor: "white",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 35,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
  buttonTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    color:  "#556995",
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
