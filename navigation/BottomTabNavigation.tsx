import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {  Pressable,Dimensions, View, StyleSheet, Text, TouchableOpacity, Image, Alert } from 'react-native';
import Colors from '../constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecordsScreen from '../screens/RecordsScreen';
import moment from 'moment'
import Calendar from '../assets/svg/Calender'
import Menu from '../assets/svg/Menu'
import { Searchbar } from '../custom-modules/react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Modal from "react-native-modal";
import SideMenu from '../components/SideMenu'
import Circle from '../assets/svg/circle'




const BottomTab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const { width } = Dimensions.get("window");

export default function BottomTabNavigator({navigation}) {
  const[isSideMenuVisible, setIsSideMenuVisible] = React.useState(false);
  const [initialScreen, setInitialScreen] = React.useState('Courses')
  const [searchQuery, setSearchQuery] = React.useState('');
  const [fullData, setFullData] = React.useState([]);
  const onChangeSearch = query => {

    const formattedQuery =query.toLowerCase();
    setSearchQuery(query)
  };
  const splax = moment().format('Do MMMM, YYYY');

  const why = ()=> {setIsSideMenuVisible(false)}
  const showAlert = () =>
  Alert.alert(
    "Log Out",
    "Are you sure you want to log out?",
    [
      {
        text: "Cancel",
        onPress: () => setIsSideMenuVisible(!isSideMenuVisible),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => {setIsSideMenuVisible(!isSideMenuVisible)
          navigation.replace('AuthOptions')},
        style: "destructive",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
      setIsSideMenuVisible(!isSideMenuVisible)
    }
  );




  return (
      <SafeAreaView style={styles.container}>
        <Modal
        isVisible={isSideMenuVisible}
        onBackdropPress={()=> setIsSideMenuVisible(!isSideMenuVisible)} // Android back press
        onSwipeComplete={()=> setIsSideMenuVisible(!isSideMenuVisible)} // Swipe to discard
        animationIn="slideInLeft" // Has others, we want slide in from the left
        animationOut="slideOutLeft" // When discarding the drawer
        swipeDirection="left" // Discard the drawer with swipe to left
        useNativeDriver // Faster animation
        hideModalContentWhileAnimating // Better performance, try with/without
        propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
        style={styles.modal} // Needs to contain the width, 75% of screen width in our case
      >
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.inner}>
          <View style={styles.profile}>
          <Image style={styles.img} source={require('../assets/images/profile-pic.png')}/>
            <Text style={styles.texts1}>Uche ThankGod</Text>
            <Text style={styles.texts2}>19/1904</Text>
            <View style={{borderWidth: 0.5, borderColor:'#D4D9EE', width: "100%", marginTop: 20}} />
          </View>

          </View>

       <TouchableOpacity style={styles.nav1} onPress={()=> {
        setIsSideMenuVisible(!isSideMenuVisible)
        navigation.navigate('Courses')
       }}>
            <Circle/>
            <Text style={styles.texts}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nav}
        onPress={()=>{
          setIsSideMenuVisible(!isSideMenuVisible)
          navigation.navigate('Records')
      }}>
            <Circle/>
            <Text style={styles.texts}>Records</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nav} onPress={()=>{
          setIsSideMenuVisible(!isSideMenuVisible)
          navigation.navigate('Settings')
        }}>
            <Circle/>
            <Text style={styles.texts}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nav} onPress={()=> {
          showAlert()
          }}>
            <Circle/>
            <Text style={styles.texts}>Log Out</Text>
        </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <TouchableOpacity onPress={()=>{setIsSideMenuVisible(true)}}>
          <Menu/>
          </TouchableOpacity>
          <Searchbar
      placeholder="search course"
      onChangeText={onChangeSearch}
      value={searchQuery}
      iconColor= "#49536E"
      inputStyle={styles.texty}
      style={styles.input}
      selectionColor={Colors.primary}
    />
    <View style={{paddingTop: 3}}>
    <TouchableOpacity style={styles.circle} onPress={()=> navigation.navigate('Settings')}>
      <Text style={styles.circleText}>SP</Text>
    </TouchableOpacity>
    </View>


        </View>
      <View style={styles.header}>

        <View style={{
            flexDirection: "row",
          }}>
            <Calendar/>
        <Text style={styles.text2}>{splax}</Text>

        </View>

        <Text style={styles.text1}>Welcome, Ikhanoba Michael-Shaka</Text>

      </View>
      <Tab.Navigator
      initialRouteName={initialScreen}
      screenOptions={{tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: 'black',
      tabBarStyle: {
        shadowColor: "#fff",
      },
      tabBarIndicatorContainerStyle:{
        height: 44,
        backgroundColor: '#FBF7F7',
        borderRadius: 5,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontFamily: 'quicksand-medium'
      },
      tabBarIndicatorStyle:{
        height: 24,
        marginLeft: "11%",
        marginBottom: "1.6%",
        width: "20%",
                backgroundColor: 'white',
                borderRadius:10,
                borderColor: Colors.primary,
                borderWidth: 1,
                justifyContent: 'center',
        alignItems: 'center',
      }
    }}
    >
      <Tab.Screen
        name={"Courses"}
        component={HomeScreen}
        options={{ tabBarLabel: "Courses"}}
      />
      <Tab.Screen
        name={"Records"}
        component={RecordsScreen}
        options={{ tabBarLabel: "Records"}}
      />
    </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    text1:{
      color: '#29335C',
      fontSize: 20,
      fontFamily: 'quicksand-medium',
      marginTop: 11
    },
    text2:{
      color: Colors.primary,
      fontSize: 15,
      fontFamily: 'quicksand-medium',
      marginHorizontal: 11.5
    },
    texts2:{
      fontSize: 12,
      fontFamily: 'quicksand-medium',
      color: 'white',
      marginTop:2,
    },
    header: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      display: 'flex',
      gap: 10,
      paddingTop: 42,
      paddingBottom: 24,
    },
    circle: {
      backgroundColor: Colors.primary,
      borderRadius: 50,
      height: 30,
      width: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleText:{
      color: 'white',
      fontFamily: 'quicksand-bold',
    },
    input: {
      width : '75%',
      height: 35,
      backgroundColor: '#F4F4F4',
      shadowOpacity: 0,
      borderRadius: 5,
      marginTop: 1,
    },
    texty:{
      fontSize: 12,
      fontFamily: 'quicksand-medium',
      color: '#777878'
    },
    modal:{
      margin: 0,
    width: width * 0.50
    },
    nav: {
      flexDirection: 'row',
      marginTop: 60
    },
    nav1: {
      flexDirection: 'row',
      marginTop: 0
    },
    texts: {
      fontSize: 14,
      color: 'white',
      fontFamily: 'quicksand-bold',
      marginLeft: 15,

    },
    texts1: {
      fontSize: 20,
      color: 'white',
      fontFamily: 'quicksand-bold',
      marginLeft: 15,
      marginTop: 6
    },
    safeAreaView: {
      flex: 1,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: '100%'
    },
    img:{
      height: 49,
      width: 49
    },
    profile: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 100,
    },
    inner: {

    }
  })
