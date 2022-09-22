import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "./hooks/provider";
import { LogBox, Alert } from 'react-native';
import LoaderScreen from './screens/LoaderScreen'
import _ from 'lodash';
import * as Location from "expo-location"
import * as TaskManager from "expo-task-manager"
import * as Permissions from 'expo-permissions';

const LOCATION_TASK_NAME = 'LOCATION_TASK_NAME';

let foregroundSubscription = null


TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error)
    return
  }
  if (data) {
    // Extract location coordinates from data
    console.log(data)
    const { locations } = data
    console.log(locations)
    const location = locations[0]
    if (location) {
      console.log("Location in background", location.coords)
    }
  }
})








  LogBox.ignoreLogs(['Animated: `useNativeDriver`','componentWillReceiveProps', 'Sending']);
  const _console = _.clone(console);
  console.warn = message => {
  if (message.indexOf('componentWillReceiveProps') <= -2) {
    _console.warn(message);
  }
  };
export default function App() {
  const [position, setPosition] = useState(null)
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [viewedOnboarding, setViewedOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);




  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("@viewedOnboarding");

      if (value !== null) {
        setViewedOnboarding(false);
      }
    } catch (error) {
      console.log("Error @checkOnboarding : ", error);
    } finally {
    }
  };
  useEffect(() =>{
    const setUp = async () => {
      try {
        checkOnboarding();
        setLoading(true);
      } catch (error) {
      } finally {
      }
    };
    setUp();
  })

  useEffect(() => {
    const requestPermissions = async () => {
      //let { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND, Permissions.LOCATION_BACKGROUND);
      const { status } = await Location.requestBackgroundPermissionsAsync();

      if (status !== 'granted') {
        /* If user hasn't granted permission to geolocate himself herself */
        Alert.alert(
          "User location not detected",
          "You haven't granted permission to detect your location.",
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
        );
      }
      if (status === 'granted') {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.Highest,
        });
      }
    };
    requestPermissions()
  }, [])




  const userContext={}


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>

        <Context.Provider value={userContext}>
        <Navigation colorScheme={colorScheme} viewedOnboarding={viewedOnboarding}/>
        <StatusBar />
        </Context.Provider>
      </SafeAreaProvider>
    );
  }
}
