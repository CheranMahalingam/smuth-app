import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../config";
import backgroundImage from "./Android-Background.png";

export default function RegistrationScreen({ navigation }) {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = () => {
    if (password != confirmPassword) {
      alert("Password don't match");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
   
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%"}}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          style={styles.input1}
          placeholder="full name"
          placeholderTextColor="white"
          onChangeText={(text) => setFullname(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="white"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          secureTextEntry
          placeholder="password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          secureTextEntry
          placeholder="confirm password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>create account</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            already got an account?{" "}
            <Text style={styles.footerLink} onPress={() => onFooterLinkPress()}>
              login
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#556995",
  },
  title: {},
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    paddingLeft: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 60,
  },

  input1: {
    color: 'white',
    fontWeight: 'bold',
    height: 48,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    overflow: "hidden",
   
    // backgroundColor: "white",
    marginTop: 100,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
    paddingLeft: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 60,
  },
  
  button: {
    backgroundColor: 'white',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 50,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 60,
  },
  buttonTitle: {
    color: "black",
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
    color: "white",
  },
  footerLink: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
