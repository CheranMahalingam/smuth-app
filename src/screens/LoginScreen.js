import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../config";
import backgroundImage from "../../assets/Android-Background.png";
import "firebase/functions";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterRegisterPress = () => {
    navigation.navigate("Registration");
  };

  const onFooterForgotPress = () => {
    navigation.navigate("Reset");
  };

  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImage} style={styles.bg}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: "100%" }}
          keyboardShouldPersistTaps="always"
        >
          <Text style={styles.logo}>smüth</Text>
          <TextInput
            style={styles.input}
            placeholder="e-mail"
            placeholderTextColor="white"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="white"
            secureTextEntry={true}
            selectionColor="white"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={styles.resetLink} onPress={() => onFooterForgotPress()}>
            forgot password?
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onLoginPress()}
          >
            <Text style={styles.buttonTitle}>log in</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              don't have an account?{" "}
              <Text
                onPress={() => onFooterRegisterPress()}
                style={styles.footerLink}
              >
                sign up
              </Text>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#556995",
  },
  logo: {
    flex: 1,
    alignSelf: "center",
    marginTop: 100,
    marginBottom: 80,
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  input: {
    color: "white",
    fontWeight: "bold",
    height: 48,
    borderRadius: 10,
    borderColor: "white",
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

  button: {
    backgroundColor: "white",
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
    marginTop: 10,
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
  resetLink: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 50,
    marginTop: 5,
  },
});
