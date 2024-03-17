import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { BodyText } from "../common/BodyText";
import { Heading1Text } from "../common/Heading1Text";
import { Heading3Text } from "../common/Heading3Text";
import { auth } from "../firebase-config";
import { useNavigation } from "@react-navigation/native";
import { getDatabase, ref, onValue, remove } from "firebase/database";

export function HomePage({ route }) {
  const { navigate } = useNavigation();
  const [balance, setBalance] = useState<number>(0);
  const [returns, setReturns] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>("");
  const showWelcome = route.params.showWelcome
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      }
    });
    getActiveReturns()
  }, []);


  let getActiveReturns = () => {
    const db = getDatabase();
    const returnsRef = ref(db, 'users/' + auth.currentUser?.uid + '/returns/');
    onValue(returnsRef, (snapshot) => {
      const resArray: React.SetStateAction<any[]> = [];
      snapshot.forEach(data => {
        const dataValue = data.val();
        if (dataValue.isActive) {
          resArray.push({
            key: data.key,
            province: dataValue.province,
            city: dataValue.city,
            street: dataValue.street,
            postalCode: dataValue.postalCode,
            startDate: dataValue.startDate,
            endDate: dataValue.endDate,
            startTime: dataValue.startTime,
            endTime: dataValue.endTime,
            can: dataValue.can,
            beerBottle: dataValue.beerBottle,
            liquorBottle: dataValue.liquorBottle,
            creditAmount: dataValue.creditAmount,
          });
        }
      })
      setReturns(resArray);
    });
  }

  const removeReturn = (key: string) => {
    const db = getDatabase();
    const returnsRef = ref(db, 'users/' + auth.currentUser?.uid + '/returns/' + key);
    remove(returnsRef);
    setReturns(returns.filter(item => item.key !== key));
  }


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/image0.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        < View style={styles.welcomeContainer}>

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

          <ScrollView style={styles.scrollView}>
                    {
                        returns.map(item => {
                            return (
                                <View style={styles.box}>
                                <View style={styles.returnBox}>
                                    <View style={styles.balanceTextContainer}>
                                        <BodyText size={18} color='#fff' >
                                            ACTIVE RETURN
                                        </BodyText>
                                        <BodyText size={14} color='#fff'>
                                            {username}
                                        </BodyText>
                                        <BodyText>       </BodyText>
                                        <Text style= {{color:'#fff'}}>
                                            {item.street}
                                        </Text>
                                        <Text style= {{color:'#fff'}}>
                                            {item.startTime} - {item.endTime}
                                        </Text>
                                    </View>
                                    <View style={styles.balanceTextContainer}>
                                        <BodyText size={25} color='#fff'>
                                            ${item.creditAmount}
                                        </BodyText>
                                        <BodyText>       </BodyText>
                                        <View style={styles.emptiesContainer}>
                                            <View style={styles.itemContainer}>
                                                <BodyText size={18} color='#fff'>   {item.can}</BodyText>
                                                <Image style={styles.emptiesIcon} source={require('../assets/images/can.png')} />
                                            </View>
                                            <View style={styles.itemContainer}>
                                                <BodyText size={18} color='#fff'>   {item.beerBottle}</BodyText>
                                                <Image style={styles.emptiesIcon} source={require('../assets/images/beerbottle.png')} />
                                            </View>
                                            <View style={styles.itemContainer}>
                                                <BodyText size={18} color='#fff'>   {item.liquorBottle}</BodyText>
                                                <Image style={styles.emptiesIcon} source={require('../assets/images/Liquorbottle.png')} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{alignItems: 'center',}}>
                                    <Pressable style={styles.buttonStyle} onPress={() => removeReturn(item.key)}>
                                        <BodyText size={18}>
                                            CANCEL RETURN
                                        </BodyText>
                                    </Pressable>
                                    <BodyText>       </BodyText>
                                </View>
                            </View>
                            );
                        })
                    }
                <Heading3Text size={30}>  </Heading3Text>
                </ScrollView> 

          <View style={{
            width: boxWidth,
            height: "33%",
            backgroundColor: "#212832",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: 30,
            paddingLeft: 25,
            paddingRight: 25,
            display: showWelcome ? 'flex' : 'none'
          }}>
            <Heading1Text color="#FFB200">WELCOME BACK,</Heading1Text>
            <Heading1Text color="#FFB200">
              {username?.toUpperCase()}!
            </Heading1Text>
            <Text style={{ color: "#fff", marginTop: 5, fontSize: 18 }}>
              What would you like to do today?</Text>
          </View>
        </View>

      </ImageBackground>
    </SafeAreaView>
  );
}

const boxWidth = '80%';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  welcomeContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 20,
  },
  balanceBox: {
    width: boxWidth,
    height: 75,
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
  welcomeBox: {
    width: boxWidth,
    height: "33%",
    backgroundColor: "#212832",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: 30,
    paddingLeft: 25,
    paddingRight: 25
  },

  box:{
    marginTop:50,
    width: '85%',
    height: 180,
    backgroundColor: '#212832',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
},

returnBox: {

    flexDirection: 'row',
},

  emptiesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
},

itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
},

emptiesIcon: {
    width: '80%',
    height: '50%'
},

buttonStyle: {     
    alignItems: 'center',  
    width: '90%',
    height: 35,
    backgroundColor: 'white',
    color: '#212832',
    borderRadius: 5,
    paddingTop: 8,
},

scrollView: {
    marginHorizontal: 15,
},

  
});
