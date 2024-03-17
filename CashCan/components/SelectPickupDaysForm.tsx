import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  Button,
  ImageBackground,
} from "react-native";
import { BodyText } from "../common/BodyText";
import { DatePicker } from "react-native-woodpicker";
import { Heading2Text } from "../common/Heading2Text";
import { Heading3Text } from "../common/Heading3Text";
import { ReturnModel } from "../model/return-model";

export default function SelectPickupDaysForm({ route, navigation }) {
  const { navigate } = useNavigation();
  const [pickedFromDate, setPickedFromDate] = useState<Date | null>(null);
  const [pickedToDate, setPickedToDate] = useState<Date | null>(null);
  const handleFromDateChange = (date: Date | null) => setPickedFromDate(date);
  const handleToDateChange = (date: Date | null) => setPickedToDate(date);

  const handleFromText = () => pickedFromDate?.toDateString?.() ?? " ";
  const handleToText = () => pickedToDate?.toDateString?.() ?? " ";

  const [balance, setBalance] = useState<number>(0);

  let returnData: ReturnModel = {
    can: route.params["can"],
    beerBottle: route.params["beerBottle"],
    liquorBottle: route.params["liquorBottle"],
    creditAmount: route.params["creditAmount"],
    startTime: route.params["startTime"],
    endTime: route.params["endTime"],
    startDate: pickedFromDate,
    endDate: pickedToDate,
  };
  const [fromDateEmpty, setFromDateEmpty] = useState(true);
  const [toDateEmpty, setToDateEmpty] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleButton = () => {
    setFromDateEmpty((Boolean(pickedFromDate == null)));
    setToDateEmpty((Boolean(pickedToDate == null)));
    if (!fromDateEmpty && !toDateEmpty) {
      navigation.navigate("PickupLocation", returnData);
    } else if ((fromDateEmpty && pickedFromDate == null) || (toDateEmpty && pickedToDate == null)) {
      setErrorMsg('Pickup Date Required');
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/image0.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.dayContainer}>
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
              <Text style={{ fontWeight: "bold" }}>SELECT PICKUP DAY(S)</Text>
            </BodyText>
            <Heading2Text> </Heading2Text>
            <BodyText>From</BodyText>
            <View>
              <DatePicker
                value={pickedFromDate}
                onDateChange={handleFromDateChange}
                title="Date Picker"
                text={handleFromText()}
                isNullable
                iosDisplay="compact"
                style={styles.pickerStyle}
              />
            </View>
            <BodyText>To</BodyText>
            <View>
              <DatePicker
                value={pickedToDate}
                onDateChange={handleToDateChange}
                title="Date Picker"
                text={handleToText()}
                isNullable
                iosDisplay="compact"
                style={styles.pickerStyle}
              />
            </View>

            <View>
              <Text style={styles.errorMsg}>{errorMsg}</Text>
            </View>
            <Heading2Text> </Heading2Text>
            <Pressable
              style={styles.buttonStyle2}
              onPress={handleButton}
            >
              <BodyText>
                <Text style={{ fontWeight: "bold" }}>PICKUP LOCATION</Text>
              </BodyText>
            </Pressable>
            <Heading2Text> </Heading2Text>
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
  dayContainer: {
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

  buttonStyle2: {
    height: 35,
    backgroundColor: "#FFB202",
    color: "#212832",
    borderRadius: 5,
    paddingTop: 8,
    alignItems: "center",
  },

  pickerStyle: {
    borderWidth: 1,
    borderColor: "#212832",
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    height: 40,
  },

  errorMsg: {
    color: 'red',
    textAlign: 'right'
  }
});
