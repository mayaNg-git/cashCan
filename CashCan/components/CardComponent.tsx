import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from '../firebase-config';
import historyData from './historyData';


export function CardComponent() {

    const [returns, setReturns] = useState<any[]>([]);
    const [username, setUsername] = useState<string | null>("");

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
                if (!dataValue.isActive) {
                    resArray.push({
                        // key: data.key,
                        // province: dataValue.province,
                        city: dataValue.city,
                        street: dataValue.street,
                        // postalCode: dataValue.postalCode,
                        startDate: dataValue.startDate,
                        // endDate: dataValue.endDate,
                        // startTime: dataValue.startTime,
                        // endTime: dataValue.endTime,
                        // can: dataValue.can,
                        // beerBottle: dataValue.beerBottle,
                        // liquorBottle: dataValue.liquorBottle,
                        creditAmount: dataValue.creditAmount,
                    });
                }
            })
            
            setReturns(resArray);
        });
    }
   

    // let [history, setHistory] = React.useState(historyData);
    return (
        returns.map((a, i) => {
            if (i % 2 == 0) {
                return (
                    <View>
                        <Text style={styles.gap}> </Text>
                        <View style={styles.oddContainer}>
                            <View style={styles.left}>
                                <Text style={styles.oddDate}>{returns[i].startDate.toString().slice(0,10)}</Text>
                                <Text style={styles.oddBodyText}>{returns[i].city}</Text>
                                <Text style={styles.oddBodyText}>{returns[i].street}</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.oddPrice}>${returns[i].creditAmount}</Text>
                            </View>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View>
                        <Text style={styles.gap}> </Text>
                        <View style={styles.evenContainer}>
                            <View style={styles.left}>
                                <Text style={styles.evenDate}>{returns[i].startDate.toString().slice(0,10)}</Text>
                                <Text style={styles.evenBodyText}>{returns[i].city}</Text>
                                <Text style={styles.evenBodyText}>{returns[i].street}</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.evenPrice}>${returns[i].creditAmount}</Text>
                            </View>
                        </View>
                    </View>
                )
            }


        })
    )

}
export default CardComponent;
const styles = StyleSheet.create({

    oddContainer: {
        backgroundColor: '#F1F2F2',
        flexDirection: 'row',
    },
    evenContainer: {
        backgroundColor: '#212832',
        flexDirection: 'row',
    },
    oddDate: {
        fontWeight: 'bold',
        fontFamily: 'BebasKai',
        fontSize: 18
    },
    evenDate: {
        color: '#F1F2F2',
        fontWeight: 'bold',
        fontFamily: 'BebasKai',
        fontSize: 18
    },
    oddPrice: {
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'BebasKai',
    },
    evenPrice: {
        color: '#F1F2F2',
        fontWeight: 'bold',
        fontSize: 30,
        fontFamily: 'BebasKai',
    },
    left: {
        flex: 1,
        paddingLeft: 40,
        paddingTop: 15,
        paddingBottom: 15,
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 40,
        paddingTop: 33,

    },
    oddBodyText: {

    },
    evenBodyText: {
        color: '#F1F2F2',
    },
    gap: {
        fontSize: 5
    }


})