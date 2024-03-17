import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase-config';
import { getDatabase, ref, update } from 'firebase/database';

export function RegisterPage() {
  const { navigate } = useNavigation();
  const [fullName, onChangeFullName] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confirmPassword, onChangeConfirmPassword] = React.useState('');

  const REQUIRED_PWD_LENGTH = 6;
  const [passwordHasValidLength, setPasswordHasValidLength] = React.useState(true);
  const [emailHasValidLength, setEmailHasValidLength] = React.useState(true);
  const [passwordMatched, setMatch] = React.useState(true);
  const [nameNotEmpty, setNameNotEmpty] = React.useState(true);
  const [emailNotEmpty, setEmailNotEmpty] = React.useState(true);
  const [emailInUse, setEmailInUse] = React.useState(false);

  const handleSignUp = () => {
    setNameNotEmpty(Boolean(fullName) && Boolean(fullName.trim()));
    setEmailNotEmpty(Boolean(email) && Boolean(email.trim()));
    setPasswordHasValidLength(password.length >= REQUIRED_PWD_LENGTH);
    setEmailHasValidLength(email.length >= REQUIRED_PWD_LENGTH);
    setMatch(password === confirmPassword);

    if (nameNotEmpty && emailNotEmpty && passwordHasValidLength && emailHasValidLength && passwordMatched)
      signUpWithServer();
  }

  const signUpWithServer = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(user, { displayName: fullName }).then(() => {
          const db = getDatabase();
          update(ref(db, 'users/' +
            userCredential.user.uid),
            {
              dob: '',
              country: 'Canada',
              province: '',
              city: '',
              street: '',
              imageUrl: '',
              phoneNumber: ''
            });
        });

        auth.signOut();
      }) 
      .catch((error) => {
        // Error message
        setEmailInUse(true);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainText1}>CREATE</Text>
      <Text style={styles.mainText2}>AN ACCOUNT</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        outlineColor="#a5a5a5"
        activeOutlineColor="#212832"
        mode="outlined"
        placeholder={"Full name"}
        onChangeText={onChangeFullName}
        error={!nameNotEmpty}
      />
      <Text style={styles.errorText}>
        <Text>{nameNotEmpty ? ""  : "Full name not valid"}</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        outlineColor="#a5a5a5"
        activeOutlineColor="#212832"
        mode="outlined"
        placeholder="Email"
        onChangeText={onChangeEmail}
        error={!(emailNotEmpty && emailHasValidLength)}
      />
      <Text style={styles.errorText}>
        <Text>{emailNotEmpty && emailHasValidLength  ? (emailInUse ? "Email already in use" : "") : "Email not valid"}</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry
        outlineColor="#a5a5a5"
        activeOutlineColor="#212832"
        mode="outlined"
        placeholder="Password"
        onChangeText={onChangePassword}
        error={!passwordHasValidLength}
      />
      <Text style={styles.errorText}>
        <Text>{passwordHasValidLength  ? "" : "Password not valid"}</Text>
      </Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        secureTextEntry
        outlineColor="#a5a5a5"
        activeOutlineColor="#212832"
        mode="outlined"
        placeholder="Confirm password"
        onChangeText={onChangeConfirmPassword}
        error={!passwordMatched}
      />
      <Text style={styles.errorText}>
        <Text>{passwordMatched  ? "" : "Password must match"}</Text>
      </Text>
      <Pressable style={styles.buttonStyle} onPress={handleSignUp}>
        <Text style={styles.titleStyle}>SIGN UP</Text>
      </Pressable>
      <Text style={styles.haveaccount}>
        <Text>Have an account? </Text>
        <Text style={styles.login} onPress={() => navigate("Login")}>Login</Text>
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212832',
  },
  mainText1: {
    color: '#FFB200',
    fontSize: 34,
    textAlign: 'left',
    marginLeft: 30,
    marginTop: 80,
    fontFamily: 'BebasKai'
  },
  mainText2: {
    color: '#FFB200',
    fontSize: 34,
    textAlign: 'left',
    marginLeft: 30,
    fontFamily: 'BebasKai'
  },
  input: {
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    backgroundColor: '#f1f2f2',
    borderRadius: 10
  },
  wrongInput: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    backgroundColor: '#f1f2f2',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
    color: 'red',
    borderStyle: 'solid',
  },
  titleStyle: {
    color: '#212832',
    fontSize: 20,
    fontFamily: 'BebasKai',
  },
  buttonStyle: {
    height: 50,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
    backgroundColor: '#FFB200',
    color: '#212832',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  haveaccount: {
    marginTop: 20,
    color: '#F1F2F2',
    textAlign: 'center',
  },
  login: {
    color: '#F1F2F2',
    textDecorationLine: 'underline'
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginLeft: 50,
    marginTop: -10,
    marginBottom: -10,
  },
  hidden: {
    display: 'none'
  }
});
