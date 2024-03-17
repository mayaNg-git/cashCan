import React from 'react';
import { StyleSheet,  View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CardComponent } from './CardComponent';
import { ScrollView } from 'react-native-gesture-handler';

export function ReturnHistoryPage() {
    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <ScrollView>
                <CardComponent />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'

    },
    titleBox: {
        backgroundColor: '#212832',
        textAlign: 'center',
        height: 50,
        flexDirection: 'row'
    },
    titleLayout:{
        width: '80%', 
        alignItems: 'center', 
        marginRight:'10%',

    },
    title: {
        color: '#FFB200',
        fontFamily: 'BebasKai',
        fontSize: 25,
        marginTop:10
    },
    image: {
        width: 40,
        height: 25,
    },
    imageLayout: {
        width: '10%', 
        alignItems: 'center',
        marginTop:14
    },
    buttonStyle: {
        height: 40,
        marginLeft: 80,
        marginRight: 80,
        marginTop: 30,
        backgroundColor: '#212832',
        borderRadius: 5,
        alignItems: 'center',
    },
    nameStyle: {
        color: '#FFB200',
        fontSize: 25,
        marginTop: 6,
        fontFamily: 'BebasKai',
    }
})