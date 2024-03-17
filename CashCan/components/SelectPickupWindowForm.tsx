import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
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
import { ReturnModel } from "../model/return-model";

export default function SelectPickupWindowForm({ route, navigation }) {
  const { navigate } = useNavigation();
  const [selectedFromValue, setSelectedFromValue] = useState("8am");
  const [selectedToValue, setSelectedToValue] = useState("8am");

  const [balance, setBalance] = useState<number>(0);

  let returnData: ReturnModel = {
    can: route.params["can"],
    beerBottle: route.params["beerBottle"],
    liquorBottle: route.params["liquorBottle"],
    creditAmount: route.params["creditAmount"],
    startTime: selectedFromValue,
    endTime: selectedToValue,
  };

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
              <Text style={{ fontWeight: "bold" }}>SELECT PICKUP WINDOW</Text>
            </BodyText>
            <Heading3Text> </Heading3Text>
            <BodyText>From</BodyText>
            <Text style={{ fontSize: 5 }}> </Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={Platform.OS === "ios" ? styles.pickerIOS : styles.picker}
                selectedValue={selectedFromValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedFromValue(itemValue)
                }
              >
                <Picker.Item label="8am" value="8am" />
                <Picker.Item label="9am" value="9am" />
                <Picker.Item label="10am" value="10am" />
                <Picker.Item label="11am" value="11am" />
                <Picker.Item label="12pm" value="12pm" />
                <Picker.Item label="1pm" value="1pm" />
                <Picker.Item label="2pm" value="2pm" />
                <Picker.Item label="3pm" value="3pm" />
                <Picker.Item label="4pm" value="4pm" />
                <Picker.Item label="5pm" value="5pm" />
              </Picker>
            </View>

            <Heading3Text> </Heading3Text>
            <BodyText>To</BodyText>
            <View style={styles.pickerContainer}>
              <Picker
                style={Platform.OS === "ios" ? styles.pickerIOS : styles.picker}
                selectedValue={selectedToValue}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedToValue(itemValue)
                }
              >
                <Picker.Item label="8am" value="8am" />
                <Picker.Item label="9am" value="9am" />
                <Picker.Item label="10am" value="10am" />
                <Picker.Item label="11am" value="11am" />
                <Picker.Item label="12pm" value="12pm" />
                <Picker.Item label="1pm" value="1pm" />
                <Picker.Item label="2pm" value="2pm" />
                <Picker.Item label="3pm" value="3pm" />
                <Picker.Item label="4pm" value="4pm" />
                <Picker.Item label="5pm" value="5pm" />
              </Picker>
            </View>

            <Heading3Text> </Heading3Text>
            <Pressable
              style={styles.buttonStyle2}
              onPress={() =>
                navigation.navigate("SelectPickupDays", returnData)
              }
            >
              <BodyText>
                <Text style={{ fontWeight: "bold" }}>SCHEDULE DAY</Text>
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
    maxHeight: 40,
  },

  pickerIOS: {
    maxHeight: 40,
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
});