/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import Onboardingscreen from '../screens/OnBoardingScreen'
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigator from './BottomTabNavigation';
import AuthOptionsScreen from '../screens/AuthOptionsScreen'
import SignupScreen from '../screens/SignupScreen'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import OtpScreen from '../screens/OtpScreen'
import SignupSecondScreen from '../screens/SignupSecondScreen'
import SignupThirdScreen from '../screens/SignupThirdScreen'
import LoadingScreen from '../screens/LoadingScreen';
import SettingsScreen from '../screens/SettingsScreen'


export default function Navigation({ colorScheme, viewedOnboarding }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootNavigator viewedOnboarding={viewedOnboarding}/>


    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator({ viewedOnboarding }) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <Stack.Navigator>
      {viewedOnboarding ? null : (
        <Stack.Screen
          name="onboarding"
          component={Onboardingscreen}
          options={{ headerShown: false }}
        />
      )}
      {loggedIn ? null : (
        <>
        <Stack.Screen
      name="AuthOptions"
      component={AuthOptionsScreen}
      options={{ headerShown: false }}
      />
      <Stack.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={{ headerShown: false }}
      />
      <Stack.Screen
      name="SignupSecondScreen"
      component={SignupSecondScreen}
      options={{ headerShown: false }}
      />
      <Stack.Screen
      name="SignupThirdScreen"
      component={SignupThirdScreen}
      options={{ headerShown: false }}
      />
      <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
      />
      <Stack.Screen
      name="OtpScreen"
      component={OtpScreen}
      options={{headerShown: false}}
      />
      <Stack.Screen
      name="LoadingScreen"
      component={LoadingScreen}
      options={{headerShown: false}}
      />
        </>
      )}

      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
