import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button, ImageBackground } from 'react-native';
import { BodyText } from '../common/BodyText';
import { Heading2Text } from '../common/Heading2Text';
import { Heading3Text } from '../common/Heading3Text';
import { ReturnModel } from '../model/return-model';



export default function InputAmountForm({ navigation }) {
    const { navigate } = useNavigation();
    const [canCountPressed, setCanCountPressed] = useState<number>(0);
    const [beerBottleCountPressed, setBeerBottleCanCountPressed] = useState<number>(0);
    const [liquorBottleCountPressed, setLiquorBottleCountPressed] = useState<number>(0);
    const [credit] = useState<number>(30);

    const [balance, setBalance] = useState<number>(0);

    let canCount = '';
    if (canCountPressed > 0) {
        canCount = canCountPressed + '';
    } else {
        canCount = '0';
    }

    let beerBottleCount = '';
    if (beerBottleCountPressed > 0) {
        beerBottleCount = beerBottleCountPressed + '';
    } else {
        beerBottleCount = '0';
    }

    let liquorBottleCount = '';
    if (liquorBottleCountPressed > 0) {
        liquorBottleCount = liquorBottleCountPressed + '';
    } else {
        liquorBottleCount = '0';
    }

    let canPrice = 0.5;
    let beerBottlePrice = 1;
    let LiquorBottlePrice = 1;

    let creditAmount = canPrice * parseInt(canCount) + beerBottlePrice * parseInt(beerBottleCount) + LiquorBottlePrice * parseInt(liquorBottleCount);

    let returnData: ReturnModel = {
        can: canCountPressed,
        beerBottle: beerBottleCountPressed,
        liquorBottle: liquorBottleCountPressed,
        creditAmount: creditAmount,
    };

    const [amountZero, setAmountZero] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const handleButton = () => {
        const creditA = creditAmount
        setAmountZero(Boolean(creditA == 0 || creditA === null))
        if (!amountZero) {
            moveToPickupWindow();
        } else if (amountZero == true && creditAmount == 0) {
            setErrorMsg('Must return at least 1 item');
        }
    }

    const moveToPickupWindow = () => {
        navigation.navigate("SelectPickupWindow", returnData);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/images/image0.png')} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
                <View style={styles.amountContainer}>
                    <View style={styles.balanceBox}>
                        <View style={styles.balanceTextContainer}>
                            <BodyText size={14} color='#fff'>
                                YOUR BALANCE
                            </BodyText>
                            <Heading3Text color='#fff'>
                                ${balance.toFixed(2)}
                            </Heading3Text>
                        </View>
                        <View style={styles.horizontalDivider} />
                        <Pressable style={styles.walletContainer} onPress={() => navigate('Wallet')}>
                            <Image style={styles.walletIcon} source={require('../assets/images/wallet.jpg')} />
                        </Pressable>
                    </View>
                    <View style={styles.formContainer}>
                        <View style={styles.line} />
                        <BodyText size={20}>
                            <Text style={{ fontWeight: 'bold' }}>INPUT AMOUNT</Text>
                        </BodyText>
                        <Heading3Text>  </Heading3Text>
                        <View style={styles.itemRow}>
                            <View style={styles.leftColumn}>
                                <BodyText>
                                    Cans
                                </BodyText>
                            </View>
                            <View style={styles.rightColumn}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Pressable style={styles.buttonStyle1} onPress={() => { setCanCountPressed((current) => current - 1); }}>
                                        <Heading2Text> - </Heading2Text>
                                    </Pressable>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Heading3Text>
                                        <Text style={styles.numberStyle}>{canCount}</Text>
                                    </Heading3Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Pressable style={styles.buttonStyle1} onPress={() => { setCanCountPressed((current) => current + 1); }}>
                                        <Heading2Text> + </Heading2Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <Heading3Text>  </Heading3Text>
                        <View style={styles.itemRow}>
                            <View style={styles.leftColumn}>
                                <BodyText>
                                    Beer Bottles
                                </BodyText>
                            </View>
                            <View style={styles.rightColumn}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Pressable style={styles.buttonStyle1} onPress={() => { setBeerBottleCanCountPressed((current) => current - 1); }}>
                                        <Heading2Text> - </Heading2Text>
                                    </Pressable>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Heading3Text>
                                        <Text style={styles.numberStyle}>{beerBottleCount}</Text>
                                    </Heading3Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Pressable style={styles.buttonStyle1} onPress={() => { setBeerBottleCanCountPressed((current) => current + 1); }}>
                                        <Heading2Text> + </Heading2Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <Heading3Text>  </Heading3Text>
                        <View style={styles.itemRow}>
                            <View style={styles.leftColumn}>
                                <BodyText>
                                    Liquor Bottles
                                </BodyText>
                            </View>
                            <View style={styles.rightColumn}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Pressable style={styles.buttonStyle1} onPress={() => { setLiquorBottleCountPressed((current) => current - 1); }}>
                                        <Heading2Text> - </Heading2Text>
                                    </Pressable>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Heading3Text>
                                        <Text style={styles.numberStyle}>{liquorBottleCount}</Text>
                                    </Heading3Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Pressable style={styles.buttonStyle1} onPress={() => { setLiquorBottleCountPressed((current) => current + 1); }}>
                                        <Heading2Text> + </Heading2Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <Heading3Text>  </Heading3Text>
                        <View style={styles.itemRow}>
                            <View style={{ flex: 4 }}>
                                <BodyText size={20}>
                                    <Text style={{ fontWeight: 'bold' }}>CREDIT AMOUNT</Text>
                                </BodyText>
                            </View>
                            <View style={{ flex: 2 }}>
                                <BodyText>
                                    <Text style={{ fontWeight: 'bold' }}> $ {creditAmount}</Text>
                                </BodyText>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.errorMsg}>{errorMsg}</Text>
                        </View>
                        <Heading3Text>  </Heading3Text>
                        <Pressable style={styles.buttonStyle2} onPress={handleButton}>
                            <BodyText>
                                <Text style={{ fontWeight: 'bold' }}>SCHEDULE TIME</Text>
                            </BodyText>
                        </Pressable>
                        <Heading3Text>  </Heading3Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const boxWidth = '70%';

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
    amountContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 20
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

    itemRow: {
        flexDirection: "row"
    },

    leftColumn: {
        flex: 1,
    },

    rightColumn: {
        flex: 1,
        flexDirection: "row"
    },

    buttonStyle1: {
        height: 35,
        width: 35,
        backgroundColor: '#FFB202',
        color: '#212832',
        borderRadius: 5,
        alignItems: 'center',
    },

    buttonStyle2: {
        height: 35,
        backgroundColor: '#FFB202',
        color: '#212832',
        borderRadius: 5,
        paddingTop: 8,
        alignItems: 'center',
    },

    numberStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    errorMsg: {
        color: 'red',
        textAlign: 'right'
    }

});