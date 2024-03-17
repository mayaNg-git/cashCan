import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View, Animated, Image } from 'react-native';

import { Heading1Text } from '../common/Heading1Text';

export default function FlashingPage() {
  const [progressStatus, setProgressStatus] = useState(0);
  const navigation = useNavigation();
  let anim = new Animated.Value(0);
  useEffect(() => {
    anim.addListener(({ value }) => {
      setProgressStatus(parseInt(value.toString(), 10))
    });
  });
  Animated.timing(anim, { toValue: 100, duration: 1000, useNativeDriver: false }).start((finished) => {
    navigation.navigate("Login")
  });

  return (
    <View style={styles.container}>
      <View style={styles.nameView}>
        
          <Text style={{ color: "#FFB202", fontFamily: 'BebasKai', fontSize: 45, alignSelf: 'center' }}>CASHCAN</Text>

      </View>

      <View style={styles.parent}>
        <Image source={require('../assets/images/bottle.png')} style={styles.image} />
        <View style={styles.bar}>
          <Animated.View
            style={[
              styles.inner, { width: progressStatus + "%" },
            ]}
          />
        </View>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#212832",
   
    justifyContent: "center",
  },

  nameView: {
    
    display: "flex",
    justifyContent: 'center'
  },

  parent: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    bottom: 100,
  },

  image: {
    width: 40,
    height: 25,
    marginLeft: 45,
    marginTop: -8,
  },

  bar: {
    width: "70%",
    height: 10,
    borderRadius: 15,
    backgroundColor: "olive",
  },

  inner: {
    width: "100%",
    height: 10,
    borderRadius: 15,
    backgroundColor: "#FFB202",
  },
});
