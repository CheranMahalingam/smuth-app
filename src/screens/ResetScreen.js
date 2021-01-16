import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { firebase } from "../config";

export default function ResetScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const onFooterResetPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        ToastAndroid.show("Email Sent Successfully", ToastAndroid.SHORT);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => onFooterResetPress()}>
          <Text>Send Email</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
