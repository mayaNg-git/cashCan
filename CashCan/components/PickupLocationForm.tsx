import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { BodyText } from "../common/BodyText";
import { Heading3Text } from "../common/Heading3Text";
import Checkbox from "expo-checkbox";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../firebase-config";
import { getDatabase, ref, set, push, child, update } from "firebase/database";

export default function PickupLocationForm({ route, navigation }) {
  const { navigate } = useNavigation();
  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(
    "Ontario"
  );
  const [useCurrentLocation, setUseCurrentLocation] = useState<boolean>(false);

  const [balance, setBalance] = useState<number>(0);

  const [city, onChangeCity] = React.useState("");
  const [street, onChangeStreet] = React.useState("");
  const [postal, onChangePostal] = React.useState("");

  const { startDate } = route.params;
  const { endDate } = route.params;
  const { startTime } = route.params;
  const { endTime } = route.params;
  const { can } = route.params;
  const { beerBottle } = route.params;
  const { liquorBottle } = route.params;
  const { creditAmount } = route.params;

  const provinces = [
    { label: "Ontario", value: "Ontario" },
    { label: "Quebec", value: "Quebec" },
    { label: "Nova Scotia", value: "Nova Scotia" },
    { label: "New Brunswick", value: "New Brunswick" },
    { label: "Manitoba", value: "Manitoba" },
    { label: "British Columbia", value: "British Columbia" },
    { label: "Prince Edward Island", value: "Prince Edward Island" },
    { label: "Saskatchewan", value: "Saskatchewan" },
    { label: "Alberta", value: "Alberta" },
    { label: "Newfoundland and Labrador", value: "Newfoundland and Labrador" },
  ];

  let writeDataToDatabase = () => {
    const data = {
      province: selectedProvince,
      city: city,
      street: street,
      postalCode: postal,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      can: can,
      beerBottle: beerBottle,
      liquorBottle: liquorBottle,
      creditAmount: creditAmount,
      isActive: true,
    };
    const db = getDatabase();
    const newReturnKey = push(child(ref(db), "returns")).key;

    update(
      ref(db, "users/" + auth.currentUser?.uid + "/returns/" + newReturnKey),
      data
    );
  };
  const [cityEmpty, setCityEmpty] = useState(true);
  const [streetEmpty, setStreetEmpty] = useState(true);
  const [postalEmpty, setPostalEmpty] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const handleButton = () => {
    setCityEmpty((Boolean(city.trim() == '')));
    setStreetEmpty((Boolean(street.trim() == '')));
    setPostalEmpty((Boolean(postal.trim() == '')));
    if (!cityEmpty && !streetEmpty && !postalEmpty) {
      writeDataToDatabase();
      navigation.navigate("Home Page", { showWelcome: false });
    } else if ((cityEmpty && city.trim() == '') || (street.trim() == '' && streetEmpty) || (postalEmpty && postal.trim() == '')) {
      setErrorMsg('Full location required')
    }
  }


  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/image0.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.windowContainer}>
          <View style={styles.balanceBox}>
            <View style={styles.balanceTextContainer}>
              <BodyText size={14} color="#fff">
                YOUR BALANCE
              </BodyText>
              <Heading3Text color="#fff">${balance.toFixed(2)}</Heading3Text>
            </View>
            <View style={styles.horizontalDivider} />
            <Pressable
              style={styles.walletContainer}
              onPress={() => navigate("Wallet")}
            >
              <Image
                style={styles.walletIcon}
                source={require("../assets/images/wallet.jpg")}
              />
            </Pressable>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.line} />
            <BodyText size={20}>
              <Text style={{ fontWeight: "bold" }}>PICK UP LOCATION</Text>
            </BodyText>
            <Text style={{ fontSize: 5 }}> </Text>

            {/* <Pressable
                            style={{ flexDirection: "row", alignItems: "center" }}
                            onPress={() => setUseCurrentLocation(!useCurrentLocation)}
                        >
                            <Checkbox
                                status={useCurrentLocation ? "checked" : "unchecked"}
                                onPress={() => setUseCurrentLocation(!useCurrentLocation)}
                                color="#FFB200"
                            />
                            <Text style={{ flex: 8 }}>Use my current location</Text>
                        </Pressable> */}

            <Text style={{ fontSize: 5 }}> </Text>
            <BodyText>Province</BodyText>
            <Text style={{ fontSize: 3 }}> </Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={Platform.OS === "ios" ? styles.pickerIOS : styles.picker}
                mode="dropdown"
                selectedValue={selectedProvince}
                onValueChange={(value: string, index) =>
                  setSelectedProvince(value)
                }
              >
                {provinces.map((province) => (
                  <Picker.Item label={province.label} value={province.value} />
                ))}
              </Picker>
            </View>

            <Text style={{ fontSize: 5 }}> </Text>
            <BodyText>City</BodyText>
            <Text style={{ fontSize: 3 }}> </Text>
            <View>
              <TextInput
                style={styles.inputContainer}
                onChangeText={onChangeCity}
                value={city}
              />
            </View>

            <Text style={{ fontSize: 5 }}> </Text>
            <BodyText>Street</BodyText>
            <Text style={{ fontSize: 3 }}> </Text>
            <View>
              <TextInput
                style={styles.inputContainer}
                onChangeText={onChangeStreet}
                value={street}
              />
            </View>

            <Text style={{ fontSize: 10 }}> </Text>
            <BodyText>Postal Code</BodyText>
            <Text style={{ fontSize: 3 }}> </Text>
            <View>
              <TextInput
                style={styles.inputContainer}
                onChangeText={onChangePostal}
                value={postal}
              />
            </View>
            <View>
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
            <Heading3Text> </Heading3Text>

            <Pressable
              style={styles.buttonStyle2}
              onPress={handleButton}
            >
              <BodyText>
                <Text style={{ fontWeight: "bold" }}>PLACE YOUR RETURN</Text>
              </BodyText>
            </Pressable>
            <Heading3Text> </Heading3Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const boxWidth = "80%";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },

  windowContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 20,
  },

  balanceBox: {
    width: boxWidth,
    height: 70,
    backgroundColor: "#212832",
    borderRadius: 5,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "row",
  },
  balanceTextContainer: {
    flex: 3,
    marginTop: "auto",
    marginBottom: "auto",
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 13,
    paddingRight: 20,
  },
  horizontalDivider: {
    flex: 0,
    borderColor: "#FFB200",
    borderWidth: 1,
    backgroundColor: "#FFB200",
    height: "65%",
    margin: "auto",
    borderRadius: 5,
    marginTop: "auto",
    marginBottom: "auto",
  },
  walletContainer: {
    width: 70,
    padding: 20,
  },
  walletIcon: {
    width: "100%",
    height: "100%",
  },
  balanceTitle: {
    //transform: 'scale(0.1)',
  },

  formContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    paddingLeft: 40,
    paddingRight: 40,
    bottom: 0,
  },

  line: {
    backgroundColor: "#312832",
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 100,
    marginRight: 100,
    height: 6,
    borderRadius: 50,
  },

  picker: {
    height: 40,
  },

  pickerIOS: {
    height: 40,
    marginTop: -90
  },

  pickerContainer: {
    overflow: "hidden",
    width: "100%",
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#212832",
  },

  buttonStyle2: {
    height: 35,
    backgroundColor: "#FFB202",
    color: "#212832",
    borderRadius: 5,
    paddingTop: 8,
    alignItems: "center",
  },

  inputContainer: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#212832",
    backgroundColor: "white",
  },
  errorMsg: {
    color: 'red',
    textAlign: 'right'
  }
});
