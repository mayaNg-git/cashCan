
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import FlashingPage from './components/FlashingPage';
import useCachedResources from './hooks/useCachedResources';
import { CommonActions, createNavigationContainerRef, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { HomePage } from './components/HomePage';
import { WalletPage } from './components/WalletPage';
import { auth } from './firebase-config';
import { getDatabase } from "firebase/database";
import InputAmountForm from './components/InputAmountForm';
import SelectPickupWindowForm from './components/SelectPickupWindowForm';
import SelectPickupDaysForm from './components/SelectPickupDaysForm';
import { ReturnHistoryPage } from './components/ReturnHistoryPage';
import { ProfilePage } from './components/ProfilePage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PickupLocationForm from './components/PickupLocationForm';
import { LogBox, View, Text, TouchableOpacity, Modal, Pressable, Alert } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Heading1Text } from './common/Heading1Text';
import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { AddPaymentMethod } from './components/AddPaymentMethod';

const headerStyles = {
	header: {
		width: '100%',
		height: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: 30,
		fontFamily: 'BebasKai',
		color: '#FFB200',
		letterSpacing: 1,
		marginRight: 25
	},
	icon: {
		position: 'absolute',
		left: 2,
		color: '#FFB200'
	},
	centeredView: {
		height: '100%',
		width: '100%',
		position: 'absolute',
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
		width: 0,
		height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	headerView: {
		flexDirection: 'row',
		backgroundColor: '#212832',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerTitle: {
		color: '#FFB200',
		fontSize: 22	
	},
	button: {
		position: 'absolute',
		left: 15,
		color: '#FFB200'
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	profileView: {
		width: '100%',
		height: 125,
		backgroundColor: '#212832',
		flexDirection: 'row'
	},
	pfpButton: {
		color: 'white',
		padding: 10
	},
	profileText: {
		color: 'white',
		width: 150,
		paddingTop: 20,
		fontSize: 22
	},
	profileEdit: {
		marginTop: 20,
		marginLeft: 20,
		backgroundColor: '#FFB200',
		height: 50,
		width: 100,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	editText: {
		fontSize: 22
	},
	modalText: {
		marginTop: 30,
		fontSize: 18,
		fontWeight: 'bold'
	},
	menuView: {
		paddingLeft: 35,
		paddingBottom: 20
	},
	outsideMenu: {
		width: '100%', 
		height: '100%', 
		backgroundColor: 'black', 
		opacity: 0,
	}
};

function TopNavBar() {

	const openMenu = () => {
		setModalVisible(true);
	}

	function openProfile() {
		setModalVisible(false);
		navigation.navigate('Profile');
	}

	function openReturnHistory() {
		setModalVisible(false);
		navigation.navigate('ReturnHistoryPage');
	}

	function implementAlert() {
		Alert.alert(
			"Not Implemented",
			"This page is on driver's side of the application or wasn't yet implemented.",
			[
			  { text: "OK", onPress: () => console.log("OK Pressed") }
			]
		);
	}

	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
	const [username, setUsername] = useState<string | null>("");

	auth.onAuthStateChanged((user) => {
		if (user) {
		  setUsername(user.displayName);
		}
	  });

	return (
		<View style={headerStyles.header}>
			<MaterialIcons name='menu' size={36} onPress={openMenu} style={headerStyles.icon}/>
			<View>
			<View>
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
					setModalVisible(!modalVisible);
					}}
				>
					<View style={headerStyles.centeredView}>
						<View style={headerStyles.modalView}>
							<View style={headerStyles.headerView}>
								<MaterialIcons name='arrow-back' size={28} style={headerStyles.button}
								onPress={() => setModalVisible(!modalVisible)} />
								<Heading1Text color={'#FFB200'} size={30} style={headerStyles.headerTitle}>MENU</Heading1Text>
							</View>
							<View style={headerStyles.profileView}>
								<MaterialIcons name='account-circle' size={80} style={headerStyles.pfpButton}/>
								<Text style={headerStyles.profileText}>{username?.toUpperCase()}</Text>
								<Pressable style={headerStyles.profileEdit}
								onPress={() => openProfile()}>
									<Text style={headerStyles.editText}>EDIT</Text>
								</Pressable>
							</View>
							<View style={headerStyles.menuView}>
								<Pressable onPress={() => implementAlert()}>
									<Text style={headerStyles.modalText}>Pickup History</Text>
								</Pressable>
								<Pressable onPress={() => openReturnHistory()}>
									<Text style={headerStyles.modalText}>Return History</Text>
								</Pressable>
								<Pressable onPress={() => implementAlert()}>
									<Text style={headerStyles.modalText}>Policies</Text>
								</Pressable>
								<Pressable onPress={() => auth.signOut()}>
									<Text style={headerStyles.modalText}>Sign Out</Text>
								</Pressable>
							</View>
						</View>
						<Pressable onPress={() => setModalVisible(!modalVisible)} style={headerStyles.outsideMenu}/>
					</View>
				</Modal>
				<Text style={headerStyles.headerText}>HOME</Text>
			</View>
			</View>
		</View>
	)
}

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
	const navigation = useNavigation();
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name="Home Page"
				component={HomePage}
				options = {() => ({
					headerStyle: {
						backgroundColor: '#212832',
					},
					headerTitle: () => <TopNavBar/>,
					headerTitleAlign: 'center',
				})}
				initialParams={{showWelcome: true}}
			/>
			<HomeStack.Screen
				name="Wallet"
				component={WalletPage}
				options={{
					headerStyle: {
						backgroundColor: '#212832',
					},
					headerTitleStyle: {
						fontFamily: 'BebasKai',
						fontSize: 30
					},
					headerTitleAlign: 'center',
					headerTintColor: '#FFB200'
				}}
			/>
			<HomeStack.Screen
				name="AddPaymentMethod"
				component={AddPaymentMethod}
				options={{ 
					headerShown: true	,
					headerStyle: {
						backgroundColor: '#212832',
					},
					headerTitleStyle: {
						fontFamily: 'BebasKai',
						fontSize: 30
					},
					headerTitleAlign: 'center',
					headerTintColor: '#FFB200',
					title: 'PAYMENT DETAILS'
				}}
			/>
			<HomeStack.Screen
				name="InputAmountForm"
				component={InputAmountForm}
				options={{
					title: 'HOME',
					headerStyle: {
						backgroundColor: '#212832',
					},
					headerTitleStyle: {
						fontFamily: 'BebasKai',
						fontSize: 30
					},
					headerTitleAlign: 'center',
					headerTintColor: '#FFB200',
					
				}}
			/>
			<HomeStack.Screen
				name="SelectPickupWindow"
				component={SelectPickupWindowForm}
				options={{
					title: 'HOME',
					headerStyle: {
						backgroundColor: '#212832',
					},
					headerTitleStyle: {
						fontFamily: 'BebasKai',
						fontSize: 30
					},
					headerTitleAlign: 'center',
					headerTintColor: '#FFB200'
				}}
			/>
			<HomeStack.Screen
				name="SelectPickupDays"
				component={SelectPickupDaysForm}
				options={{
					title: 'HOME',
					headerStyle: {
						backgroundColor: '#212832',
					},
					headerTitleStyle: {
						fontFamily: 'BebasKai',
						fontSize: 30
					},
					headerTitleAlign: 'center',
					headerTintColor: '#FFB200'
				}}
			/>
			<HomeStack.Screen
				name="PickupLocation"
				component={PickupLocationForm}
				options={{
					headerStyle: {
						backgroundColor: '#212832',
					},
					headerTitleStyle: {
						fontFamily: 'BebasKai',
						fontSize: 30
					},
					headerTitleAlign: 'center',
					headerTintColor: '#FFB200',
					title: 'HOME'
				}}
			/>
			<HomeStack.Screen
			name="ReturnHistoryPage"
			component={ReturnHistoryPage}
			options={{
				headerStyle: {
					backgroundColor: '#212832',
				},
				headerTitleStyle: {
					fontFamily: 'BebasKai',
					fontSize: 30
				},
				headerTitleAlign: 'center',
				headerTintColor: '#FFB200',
				title: 'RETURN HISTORY'
			}}
			/>

			<HomeStack.Screen
			name="Profile"
			component={ProfilePage}
			options={{
				headerStyle: {
					backgroundColor: '#212832',
				},
				headerTitleStyle: {
					fontFamily: 'BebasKai',
					fontSize: 30
				},
				headerTitleAlign: 'center',
				headerTintColor: '#FFB200',
				title: 'PROFILE'
			}}
			/>
		</HomeStack.Navigator>
	);
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
	return (
		<Tab.Navigator
		screenOptions={{
			tabBarShowLabel: false,
			tabBarStyle: {
				backgroundColor: 'white',
				height: 55
			},
			tabBarItemStyle: {
				borderRightWidth: 1,
				borderLeftWidth: 1
			},
		}}
		>
		<Tab.Screen
			name="Return"
			component={HomeStackScreen}
			options={({ navigation }) => ({
				tabBarIcon: (props) => (
					<TouchableOpacity onPress={() => navigation.navigate('InputAmountForm')}><View>
						<Heading1Text size={20} color="#212832">
							<Text>RETURN</Text>
						</Heading1Text>
					</View></TouchableOpacity>
				),
				headerShown: false
			})}
		/>
		<Tab.Screen
			name="Pick Up"
			component={HomeStackScreen}
			options={{
				tabBarIcon: ({ focused }) => (
					<View>
						<Heading1Text size={20} color="#212832">
							<Text>PICK UP</Text>
						</Heading1Text>
					</View>
				),
				headerShown: false
			}}
		/>
		</Tab.Navigator>
	)
}

export default function App() {
	LogBox.ignoreAllLogs();
	const isLoadingComplete = useCachedResources();
	const Stack = createNativeStackNavigator<RootStackParamList>();
	const [loggedIn, setLoggedIn] = useState(false);
	// run before rendering to check if the user are logged in or not
	useEffect(() => {
		auth.onAuthStateChanged((user: any) => {
			if (!user) {
				setLoggedIn(false);
			} else {
				setLoggedIn(true);
			}
		});
	});
	
	if (isLoadingComplete) {
		if (!loggedIn) {
			return (
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="FlashingPage"
							component={FlashingPage}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Login"
							component={LoginPage}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Register"
							component={RegisterPage}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer >
			);
		} else if (loggedIn) {
			return (
				// TODO: Home page here
				<NavigationContainer>
					<Tab.Navigator
						screenOptions={{
							tabBarShowLabel: false,
							tabBarStyle: {
								backgroundColor: 'white',
								height: 55
							},
							tabBarItemStyle: {
								borderRightWidth: 1,
								borderLeftWidth: 1
							},
						}}
					>
						<Tab.Screen
							name="Return"
							component={HomeStackScreen}
							options={({ navigation }) => ({
								tabBarIcon: (props) => (
									<TouchableOpacity onPress={() => navigation.navigate('InputAmountForm')}><View>
										<Heading1Text size={20} color="#212832">
											<Text>RETURN</Text>
										</Heading1Text>
									</View></TouchableOpacity>
								),
								headerShown: false
							})}
						/>
						<Tab.Screen
							name="Pick Up"
							component={HomeStackScreen}
							options={{
								tabBarIcon: ({ focused }) => (
									<View>
										<Heading1Text size={20} color="#212832">
											<Text>PICK UP</Text>
										</Heading1Text>
									</View>
								),
								headerShown: false
							}}
						/>
					</Tab.Navigator>
				</NavigationContainer>

			);
		}
	} else if (!isLoadingComplete) {
		return null;
	}
}
