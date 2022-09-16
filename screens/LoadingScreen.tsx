import { KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View, Animated, Dimensions } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Colors from '../constants/Colors'
const {width, height} = Dimensions.get('window')


const LoadingScreen = ({navigation}) => {

    const countInterval = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    countInterval.current = setInterval(() => setCount((old) => old + 10), 1500);
    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, []);
  const loaderValue = useRef(new Animated.Value(0)).current;
const load = (count) => {
    Animated.timing(loaderValue, {
      toValue: count, //final value
      duration: 1000, //update value in 500 milliseconds
      useNativeDriver: false,
    }).start();
};
useEffect(() => {
    load(count)
    if (count >= 100) {
      setCount(100);
      clearInterval(countInterval);
      navigation.replace('Root')
    }
  }, [count]);

  const width22 = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })





  return (
    <SafeAreaView style={styles.container}>
      <Text>{count}</Text>
  <View style={styles.progressBar}>
  <Animated.View style={{backgroundColor: Colors.primary, width:width22, borderRadius: 20}}/>
  </View>

  <View style={styles.foot}>
    <Text style={styles.text}>Getting you started....</Text>
  </View>
    </SafeAreaView>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30,
        justifyContent: 'center',
   alignItems: 'center',
      },
      progressBar: {
        height: 10,
   flexDirection: "row",
   width: '100%',
   backgroundColor: '#ECECEC',
   borderColor: '#000',
   borderRadius: 20
      },
      text:{
        fontSize: 12,
        fontFamily: 'quicksand-medium',
        alignText: 'center',
      },
      foot: {
        position: 'absolute',
    height: 40,
    left: 0,
    top: height - 60,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
      }
})
