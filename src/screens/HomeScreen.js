import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import PastTrip from "./PastTrip";
import PastTripGeneric from "./PastTripGeneric";

export default function HomeScreen({ navigation }) {
  const [destination, setDestination] = useState("");
  const [starting, setStarting] = useState("");

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
