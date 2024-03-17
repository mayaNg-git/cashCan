import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Touchable, Modal, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { BodyText } from '../common/BodyText';
import { Heading1Text } from '../common/Heading1Text';
import { Heading3Text } from '../common/Heading3Text';
import { Button, TextInput } from 'react-native-paper';
import { signOut } from '@firebase/auth';
import { auth } from '../firebase-config';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { getDatabase, push, ref } from '@firebase/database';
import { child, onValue, update } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export function AddPaymentMethod({ route }) { 
    const navigation = useNavigation();
    let [cardNumber, onChangeCardNumber] = React.useState("");
    let [cardDate, onChangeCardDate] = React.useState("");
    let [cardCvv, onChangeCardCvv] = React.useState("");
    let [country, onChangeCountry] = React.useState("");
    let [city, onChangeCity] = React.useState("");
    let [street, onChangeStreet] = React.useState("");
    let [addUpdate, onChangeAddUpdate] = React.useState("ADD");

    let updateData = route.params;
    useEffect(() => {
        if (updateData) {
            onChangeCardNumber(updateData.cardNumber);
            onChangeCardDate(updateData.cardDate);
            onChangeCardCvv(updateData.cardCvv);
            onChangeCountry(updateData.country);
            onChangeCity(updateData.city);
            onChangeStreet(updateData.street);
            onChangeAddUpdate('UPDATE');
        };
    }, []);

    // TODO: data validation
    // TODO: numeric input only
    let writeDataToDatabase = () => {
        const data = {
            cardNumber: cardNumber,
            cardDate: cardDate,
            cardCvv: cardCvv,
            country: country,
            city: city,
            street: street,
        };
        const db = getDatabase();
        
        let paymentKey;
        if(updateData) {
            paymentKey = updateData.key;
        } else {
            paymentKey = push(child(ref(db), "paymentMethods")).key;
        }
        update(
            ref(db, "users/" + auth.currentUser?.uid + "/paymentMethods/" + paymentKey),
            data
        );
    }
    
    return (
        <View style={{height: '100%'}}>
            <ScrollView style={{flex: 1}}>
                    
                <Text style={styles.textHeading}>Card Details:</Text>
                <View style={styles.cardInput}>
                    <TextInput
                    style={styles.textField}
                    outlineColor='#a5a5a5'
                    activeOutlineColor='#212832'  
                    mode='outlined'
                    placeholder='4242 4242 4242 4242'
                    maxLength={16}
                    keyboardType="numeric"
                    onChangeText={onChangeCardNumber}
                    value={cardNumber}              
                    />
                    <TextInput
                    style={styles.textField}
                    outlineColor='#a5a5a5'
                    activeOutlineColor='#212832'  
                    mode='outlined'
                    placeholder='MMDD'
                    maxLength={4}
                    keyboardType="numeric"
                    onChangeText={onChangeCardDate}
                    value={cardDate}              
                    />
                    <TextInput
                    style={styles.textField}
                    outlineColor='#a5a5a5'
                    activeOutlineColor='#212832'  
                    mode='outlined'
                    placeholder='CVV'
                    maxLength={3}
                    keyboardType="numeric"
                    onChangeText={onChangeCardCvv}
                    value={cardCvv}              
                    />
                </View>
                <Text style={styles.textHeading}>Billing Address:</Text>
                <Text style={styles.textSubHeading}>Country:</Text>
                <TextInput
                style={styles.textField}
                outlineColor='#a5a5a5'
                activeOutlineColor='#212832'  
                mode='outlined'
                placeholder='Country'
                onChangeText={onChangeCountry}
                value={country}  
                />
                <Text style={styles.textSubHeading}>City:</Text>
                <TextInput
                style={styles.textField}
                outlineColor='#a5a5a5'
                activeOutlineColor='#212832'  
                mode='outlined'
                placeholder='City'
                onChangeText={onChangeCity}
                value={city}              
                />
                <Text style={styles.textSubHeading}>Street:</Text>
                <TextInput
                style={styles.textField}
                outlineColor='#a5a5a5'
                activeOutlineColor='#212832'  
                mode='outlined'
                placeholder='Street'
                onChangeText={onChangeStreet}
                value={street}              
                />
                <View style={styles.buttonsRow}>
                    <Pressable style={styles.paymentCancel} onPress={() => navigation.navigate('Wallet')}>
                        <BodyText size={22}>Cancel</BodyText>
                    </Pressable>
                    <Pressable style={styles.paymentAdd} onPress={() => {
                        writeDataToDatabase();
                        navigation.navigate('Wallet');
                    }}>
                        <BodyText size={22}>{addUpdate}</BodyText>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    scrollContainer: {
        flex: 1
    },
    textField: {
        justifyContent: 'center',
        marginRight: 10,
        marginLeft: 10,
        fontSize: 15,
        color: '#5e6875'
    },
    paymentText: {
        fontSize: 22,
    },
    centeredView: {
		height: '100%',
		width: '100%',
		position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
	},
    cardInput: {
        flexDirection: 'row',
    },
    addPaymentView: {
        backgroundColor: 'white', 
        height: '100%', 
        width: '100%',
        position: 'absolute',
    },
    textHeading: {
        marginLeft: 15,
        marginTop: 10,
        color: '#2e2e2e',
        fontSize: 18
    },
    textSubHeading: {
        color: '#2e2e2e',
        fontSize: 16,
        marginLeft: 25,
        marginTop: 5
    },
    paymentCancel: {
        marginRight: 20,
        bottom: 10,
        backgroundColor:'white', 
        borderColor: '#212832', 
        borderWidth: 2, 
        borderRadius: 10, 
        height: 50, 
        width: '40%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    paymentAdd: {
        marginLeft: 20,
        bottom: 10,
        backgroundColor:'white', 
        borderColor: '#212832', 
        borderWidth: 2, 
        borderRadius: 10, 
        height: 50, 
        width: '40%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    buttonsRow: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    modalButton: {
        color: 'black', 
        fontSize: 20
    }
});