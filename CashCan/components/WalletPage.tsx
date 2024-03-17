import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Touchable, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { BodyText } from '../common/BodyText';
import { Heading1Text } from '../common/Heading1Text';
import { Heading3Text } from '../common/Heading3Text';
import { Button, TextInput } from 'react-native-paper';
import { signOut } from '@firebase/auth';
import { auth } from '../firebase-config';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { child, getDatabase, push, ref } from '@firebase/database';
import { onValue, remove } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

//TODO: add stripe
export function WalletPage() {
  const [balance, setBalance] = useState<number>(0);
  const [payments, setPayments] = useState<any[]>([]);
  const navigation = useNavigation();

  let getPayments = () => {
    const db = getDatabase();
    const paymentsRef = ref(db, "users/" + auth.currentUser?.uid + "/paymentMethods/");
    onValue(paymentsRef, (snapshot) => {
      const paymentsArray: React.SetStateAction<any[]> = [];
      snapshot.forEach(data => {
        const dataValue = data.val();
        paymentsArray.push({
          key: data.key,
          cardCvv: dataValue.cardCvv,
          cardDate: dataValue.cardDate,
          cardNumber: dataValue.cardNumber,
          city: dataValue.city,
          country: dataValue.country,
          street: dataValue.street,
        });
      })
      setPayments(paymentsArray);
    });
  }

  useEffect(() => {
    getPayments();
  }, []);

  const formatCardNumber = (number: string) => {
    return '**** ' + number.slice(12);
  };

  const removePaymentOption = (key: string) => {
    const db = getDatabase();
    const paymentsRef = ref(db, 'users/' + auth.currentUser?.uid + '/paymentMethods/' + key);
    Alert.alert(
      "Delete payment method",
      "You are about to delete a payment method, do you wish to continue?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Yes", onPress: () => {
            remove(paymentsRef);
            setPayments(payments.filter(item => item.key !== key));
          } 
        }
      ]
    );
  };

  const editPaymentOption = (key: string) => {
    const db = getDatabase();
    const paymentsRef = ref(db, 'users/' + auth.currentUser?.uid + '/paymentMethods/' + key);

    let data = {}
    onValue(paymentsRef, (snapshot) => {
      const dataValue = snapshot.val();
      if(dataValue) {
        data = {
          key:  snapshot.key,
          cardCvv: dataValue.cardCvv,
          cardDate: dataValue.cardDate,
          cardNumber: dataValue.cardNumber,
          city: dataValue.city,
          country: dataValue.country,
          street: dataValue.street,
        };
      }
    })
    navigation.navigate('AddPaymentMethod', data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.creditsBox}>
        <View>
          <BodyText size={16} color='#fff'>
            TOTAL CREDITS
          </BodyText>
          <Heading3Text color='#fff'>
            ${balance.toFixed(2)}
          </Heading3Text>
        </View>
        <Button mode='contained' style={styles.button} onPress={() => console.log('TEST: Money sent to your active account')}>
          <BodyText size={16}>
            REDEEM
          </BodyText>
        </Button>
        <Button mode='contained' style={styles.button} onPress={() => console.log('TEST: Added to funds')}>
          <BodyText size={16}>
            ADD TO FUNDS
          </BodyText>
        </Button>
      </View>
      <View style={styles.paymentMethod}>
        <Heading3Text>
          PAYMENT METHOD 
        </Heading3Text>
        <Pressable style={{ marginTop: 20 }} onPress={() => navigation.navigate('AddPaymentMethod')}>
          <Text>
            Add new payment method
          </Text>
        </Pressable>
        <View style={{height: '80%'}}>
          <ScrollView style={styles.scrollView}>
              {
                payments.map(item => {
                    return (
                      <Pressable 
                      style={styles.paymentOption}>
                        <View style={{flexDirection: 'row', height: '100%', alignItems: 'center'}}>
                          <Pressable 
                          style={styles.paymentChoose}
                          onPressIn={() => editPaymentOption(item.key)}>
                            <Text style={styles.paymentOptionText}>{formatCardNumber(item.cardNumber)}</Text>
                          </Pressable>
                          <Pressable onPressIn={() => removePaymentOption(item.key)} style={styles.paymentOptionRemove}>
                            <MaterialIcons 
                            color={'#a3050d'}
                            name='cancel' 
                            size={20} 
                            ></MaterialIcons>
                          </Pressable>
                        </View>
                      </Pressable>
                    );
                })
              }
          </ScrollView>
        </View>
        
      </View>
    </View>
  );
}

const boxWidth = '80%';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    justifyContent: 'space-between'
  },
  creditsBox: {
    width: boxWidth,
    backgroundColor: '#212832',
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: 22
  },
  button: {
    width: '100%',
    margin: 'auto',
    backgroundColor: '#fff',
    marginTop: 20
  },
  walletIcon: {
    width: '100%',
    height: '100%'
  },
  creditsTitle: {
    //transform: 'scale(0.1)',
  },
  paymentMethod: {
    flex: 1,
    width: boxWidth,
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 30
  },
  textField: {
    justifyContent: 'center',
    margin: 15,
    marginLeft: 30,
    fontSize: 15,
    color: '#5e6875'
  },
  paymentButton: {
    borderColor: '#a5a5a5',
    borderWidth: 1,
    borderRadius: 5,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  paymentOption: {
    marginTop: 25,
    borderColor: '#2e2e2e',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center'
  },
  paymentOptionText: {
    marginLeft: 10,
    color: '#2e2e2e'
  },
  paymentChoose: {
    justifyContent: 'center',
    height: '100%',
    width: '90%'
  },
  paymentOptionRemove: {
    position: 'absolute',
    right: 10,
  }
});