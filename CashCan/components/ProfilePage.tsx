
import { ScrollView, SafeAreaView, StyleSheet, Image, View, Text, Pressable } from 'react-native';
import { Snackbar, TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import { BodyText } from '../common/BodyText';
import { DatePicker } from 'react-native-woodpicker';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase-config';
import { getDatabase, ref, onValue, update, set } from "firebase/database";
import { getAuth, updateEmail, updateProfile, User } from '@firebase/auth';

export function ProfilePage() {
    const { navigate } = useNavigation();
    const [fullName, setFullName] = useState<string | null>("");
    const [email, setEmail] = useState<string | null>("");
    const [oldFullName, setOldFullName] = useState<string | null>("");
    const [oldEmail, setOldEmail] = useState<string | null>("");
    const [phone, setPhone] = useState<string | null>("");
    const [province, setProvince] = useState<string | null>("");
    const [city, setCity] = useState<string | null>("");
    const [street, setStreet] = useState<string | null>("");
    const [country, setCountry] = useState<string | null>("");
    const [pickedFromDate, setPickedFromDate] = React.useState<Date | null>(null);
    const handleFromDateChange = (date: Date | null) => setPickedFromDate(date);
    const handleFromText = () => pickedFromDate?.toDateString?.() ?? ' ';
    const [visible, setVisible] = React.useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const [userCredential, setUser] = React.useState<User>(null);
    let getUserInfoFromDatabase = () => {
        const db = getDatabase();
        const userRef = ref(db, 'users/' + auth.currentUser?.uid);
        onValue(userRef, (snapshot) => {
            const dataVal = snapshot.val()
            setPhone(dataVal?.phoneNumber);
            setProvince(dataVal?.province);
            setCity(dataVal?.city);
            setCountry(dataVal?.country);
            setStreet(dataVal?.street);
            setPickedFromDate(dataVal?.dob)
         
        });
    }
    let saveData = () => {
        if (fullName !== oldFullName) {
            updateProfile(userCredential, {displayName: fullName})
        }
        if (email !== oldEmail) {
            updateEmail(userCredential, email)
        }
        const db = getDatabase();
        set(ref(db, 'users/' +
            auth.currentUser?.uid),
            {
                dob: pickedFromDate,
                country: country,
                province: province,
                city: city,
                street: street,
                imageUrl: null,
                phoneNumber: phone
            }).then(() => setVisible(!visible));
    }
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setOldFullName(user.displayName);
                setOldEmail(user.email)
                setFullName(user.displayName);
                setEmail(user.email)
            };
            getUserInfoFromDatabase()
        });
        
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#212832' }}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.userContainer}>
                    <Image
                        style={styles.userImg}
                        source={require('../assets/images/avatar-placeholder.png')}
                    />
                    <View style={{ display: 'flex' }}>
                        <BodyText
                            size={25}
                            color={'#F1F2F2'}
                        >
                            <Text style={styles.userName}>
                                {fullName}
                            </Text>
                        </BodyText>
                        {/* TODO: add rating */}
                    </View>
                </View>
                <View style={{ display: 'flex', marginTop: 10, paddingHorizontal: 30 }}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}> Full Name </Text>
                        <TextInput
                            style={{ height: 40 }}
                            mode={'outlined'}
                            value={fullName}
                            onChangeText={fullName => setFullName(fullName)}
                         
                        >
                        </TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}> Email  </Text>
                        <TextInput
                            style={{ height: 40 }}
                            value={email}
                            mode={'outlined'}
                            onChangeText={email => setEmail(email)}
                          
                        >
                        </TextInput>
                    </View>
                    {/* TODO: comment out for now, currently can't retrieve password from firebase because of security reasons. 
                    needs to implement a better way to change password in the future */}
                    {/* <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}> Password </Text>
                        <TextInput
                            style={{ height: 40 }}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon name="eye" onPressIn={() => setShowPassword(!showPassword)} />}
                            value={password}
                            mode={'outlined'}
                            onChangeText={password => setPassword(password)}
                           
                        />
                    </View> */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}> Phone </Text>
                        <TextInput
                            style={{ height: 40 }}
                            value={phone}
                            mode={'outlined'}
                            onChangeText={phone => setPhone(phone.replace(/[^0-9]/g, ''))}
                        >
                        </TextInput>
                    </View>
                </View>
                <View style={{ display: 'flex', alignItems: 'center' }}>
                    <Text style={{
                        fontWeight: '500', fontFamily: 'BebasKai',
                        fontSize: 25,
                        color: '#fff',
                        margin: 30
                    }}>
                        Personal Information
                </Text>
                </View>

                <View style={{ display: 'flex', marginTop: 10, paddingHorizontal: 30 }}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}> Date of Birth </Text>
                        <View>
                            <DatePicker
                                value={pickedFromDate}
                                onDateChange={handleFromDateChange}
                                title="Date Picker"
                                text={handleFromText()}
                                isNullable
                                iosDisplay="compact"
                                style={styles.pickerStyle} />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}> Country/Region </Text>
                        <TextInput
                            style={{ height: 40 }}
                            value={country}
                            mode={'outlined'}
                            editable={false}
                          
                        >
                        </TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}> Province </Text>
                        <TextInput
                            style={{ height: 40 }}
                            value={province}
                            mode={'outlined'}
                            onChangeText={province => setProvince(province)}
                          
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}> City </Text>
                        <TextInput
                            style={{ height: 40 }}
                            value={city}
                            mode={'outlined'}
                            onChangeText={city => setCity(city)}
                           
                        >
                        </TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}> Street </Text>
                        <TextInput
                            style={{ height: 40 }}
                            value={street}
                            mode={'outlined'}
                            onChangeText={street => setStreet(street)}
                         
                        >
                        </TextInput>
                    </View>
                </View>
                <View style={{ display: 'flex', marginTop: 10, marginBottom: 10, paddingHorizontal: 30 }}>
                    <Pressable style={styles.saveButton} onPress={() => saveData()}>
                        <BodyText>
                            <Text style={{ fontWeight: 'bold' }}> SAVE</Text>
                        </BodyText>
                    </Pressable>
                </View>
                <Snackbar
                    visible={visible}
                    onDismiss={onDismissSnackBar}   
                >
                    User Profile Saved Successfully
                </Snackbar>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212832',
    },
    userImg: {
        height: 65,
        width: 65,
        borderRadius: 75,
        marginRight: 30
    },
    userContainer: {
        display: 'flex',
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center'
    },
    userName: {
        fontWeight: '500'
    },
    inputLabel: {
        fontFamily: 'PTSans-Regular',
        color: '#F1F2F2',
        fontSize: 15
    },
    inputContainer: {
        display: 'flex',
        marginBottom: 10,

    },
    pickerStyle: {
        borderWidth: 1,
        borderColor: '#F1F2F2',
        backgroundColor: 'white',
        borderRadius: 2,
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        marginTop: 5,
        height: 40,
    },
    titleBox: {
        backgroundColor: '#212832',
        textAlign: 'center',
        height: 50,
        flexDirection: 'row'
    },
    titleLayout: {
        width: '80%',
        alignItems: 'center',
        marginRight: '10%',

    },
    image: {
        width: 40,
        height: 25,
    },
    imageLayout: {
        width: '10%',
        alignItems: 'center',
        marginTop: 14
    },
    title: {
        color: '#FFB200',
        fontFamily: 'BebasKai',
        fontSize: 25,
        marginTop: 10
    },
    saveButton: {
        height: 35,
        backgroundColor: '#FFB202',
        color: '#212832',
        borderRadius: 5,
        paddingTop: 8,
        alignItems: 'center',
    }
});

