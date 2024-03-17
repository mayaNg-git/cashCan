
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { RootStackParamList, RootTabParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 * A modal is like a popup — it's not part of your primary navigation flow !!!
 */

const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator>
      {/* TODO: Uncomment Root Screen when BottomTabNavigator is finished */}
      {/* <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
    </Stack.Navigator>
  );
}

// TODO: Add bottom Nativagation here!
 const BottomTab = createBottomTabNavigator<RootTabParamList>();

 function BottomTabNavigator() {
  //  const colorScheme = useColorScheme();
 
   return (
     <BottomTab.Navigator
       initialRouteName="Return"
      >
       {/* <BottomTab.Screen
         name="TabOne"
         component={TabOneScreen}
         options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
           title: 'Tab One',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
           headerRight: () => (
             <Pressable
               onPress={() => navigation.navigate('Modal')}
               style={({ pressed }) => ({
                 opacity: pressed ? 0.5 : 1,
               })}>
               <FontAwesome
                 name="info-circle"
                 size={25}
                 color={Colors[colorScheme].text}
                 style={{ marginRight: 15 }}
               />
             </Pressable>
           ),
         })}
       /> */}
       {/* <BottomTab.Screen
         name="TabTwo"
         component={TabTwoScreen}
         options={{
           title: 'Tab Two',
           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
         }}
       /> */}
     </BottomTab.Navigator>
   );
 }