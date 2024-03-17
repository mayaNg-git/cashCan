import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
// import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import { Heading1Text } from "../common/Heading1Text";
import Checkbox from "expo-checkbox";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { FacebookAuthProvider, signOut, TwitterAuthProvider } from '@firebase/auth';


export function LoginPage() {
  const { navigate } = useNavigation();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [rememberCheck, setRememberCheck] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);

  const GoogleProvider = new GoogleAuthProvider();
  const FacebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  const auth = getAuth();
  auth.languageCode = 'it';

  let GoogleSignIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      })
  }

  let FacebookSignIn = () => {
    signInWithPopup(auth, FacebookProvider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      })
  }

  let TwitterSignIn = () => {
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = TwitterAuthProvider.credentialFromError(error);
      })
  }
  
    signOut(auth)
    .then(() => {
      // Sign-out
    }).catch((error) => {
      // Error message
        const errorCode = error.code;
        const errorMessage = error.message;
    })

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        // Error message
        setIncorrectCredentials(true);
      });
  };

  const handleLogin = () => {
    setIncorrectCredentials(false);
    setEmailEmpty(!(Boolean(email) || Boolean(email.trim())));
    setPasswordEmpty(!(Boolean(password) || Boolean(password.trim())));

    if (!emailEmpty && !passwordEmpty) handleSignIn();
  };

  const getErrorMessage = () => {
    if (!(emailEmpty || passwordEmpty || incorrectCredentials)) return "";
    else if (emailEmpty && passwordEmpty)
      return "Email and password are empty.";
    else if (emailEmpty) return "Email is empty.";
    else if (passwordEmpty) return "Password is empty.";
    else if (incorrectCredentials) return "Email or password is incorrect.";
    else return "";
  };

  return (
    <View style={styles.container}>
      <Heading1Text size={40} color="#FFB200">
        <Text>WELCOME TO</Text>
      </Heading1Text>
      <Heading1Text size={40} color="#FFB200">
        <Text>CASHCAN</Text>
      </Heading1Text>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          value={email}
          outlineColor="#a5a5a5"
          activeOutlineColor="#212832"
          mode="outlined"
          placeholder="Email"
          onChangeText={onChangeEmail}
          error={emailEmpty || incorrectCredentials}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          outlineColor="#a5a5a5"
          activeOutlineColor="#212832"
          mode="outlined"
          placeholder="Password"
          onChangeText={onChangePassword}
          error={passwordEmpty || incorrectCredentials}
        />
        <Text style={styles.errorText}>
          <Text>{getErrorMessage()}</Text>
        </Text>
      </View>
      <View style={styles.rememberText}>
        <Checkbox
          color="#FFB200"
          value={rememberCheck}
          onValueChange={(newValue) => setRememberCheck(newValue)}
        />
        <Text style={styles.checkBoxText}>REMEMBER ME</Text>
      </View>
      <Button style={styles.buttonStyle} onPress={handleLogin}>
        <Text style={styles.titleStyle}> Log In </Text>
      </Button>
      <View style={styles.authLayout}>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Pressable onPress={FacebookSignIn}>
            <Image source={require('../assets/images/facebook.png')} style={styles.image} />
          </Pressable>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Pressable onPress={TwitterSignIn}>
            <Image source={require('../assets/images/twitter.png')} style={styles.image} />
          </Pressable>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Pressable onPress={GoogleSignIn}>
            <Image source={require('../assets/images/google.png')} style={styles.image} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.haveaccount}>
        <Text>New account? </Text>
        <Text style={styles.login} onPress={() => navigate("Register")}>
          Sign up
        </Text>
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const font = "BebasKai";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212832",
    marginLeft: 0,
    paddingTop: 150,
    paddingLeft: 30,
  },
  mainText1: {
    color: "#FFB200",
    fontSize: 34,
    textAlign: "left",
    marginLeft: 30,
    marginTop: 80,
  },
  mainText2: {
    color: "#FFB200",
    fontSize: 34,
    textAlign: "left",
    marginLeft: 30,
  },
  input: {
    marginLeft: 0,
    marginRight: 30,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10,
  },
  titleStyle: {
    color: "#212832",
    fontSize: 20,
    fontFamily: font
  },
  buttonStyle: {
    height: 50,
    marginRight: 30,
    marginTop: 30,
    backgroundColor: "#FFB200",
    color: "#212832",
    textAlign: "center",
  },
  haveaccount: {
    marginTop: 20,
    color: "#F1F2F2",
    alignSelf: "center",
    marginLeft: -30
  },
  login: {
    color: "#F1F2F2",
    textDecorationLine: "underline",
  },
  checkBoxText: {
    color: "#FFF",
    marginTop: -3,
    marginLeft: 10,
    fontSize: 17,
    fontFamily: font
  },
  rememberText: {
    flexDirection: "row",
    marginLeft: 0,
  },
  errorText: {
    color: "red",
  },
  image: {
    width: 50,
    height: 50
  },
  authLayout: {
    marginTop: 20,
    flexDirection: "row",
    marginRight: 30
  }
});