import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "./hooks/provider";
import { LogBox } from 'react-native';
import LoaderScreen from './screens/LoaderScreen'
    import _ from 'lodash';

    LogBox.ignoreLogs(['Animated: `useNativeDriver`','componentWillReceiveProps']);
    const _console = _.clone(console);
    console.warn = message => {
    if (message.indexOf('componentWillReceiveProps') <= -1) {
     _console.warn(message);
    }
   };
export default function App() {
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




  const userContext={}


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
         {loading ? (
            <LoaderScreen />
          ) : (
        <Context.Provider value={userContext}>
        <Navigation colorScheme={colorScheme} viewedOnboarding={viewedOnboarding}/>
        <StatusBar />
        </Context.Provider>)}
      </SafeAreaProvider>
    );
  }
}
