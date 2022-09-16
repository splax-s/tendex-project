import { KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View, Image } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomButton2 from '../components/CustomButton2'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.second}>
        <Image source={require('../assets/images/searchIcon.png')} style={styles.icon}/>
        <Text style={styles.text}>No course is added yet</Text>
      </View>
      <CustomButton2
                    _onPress={() => {
                    }}
                    title="+     Add Course"
                    marginTop={0}
                    loading={false}
                    textStyle={{color: 'white'}}
                    disabled={false}
                    containerStyle={{}}
                  />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{

  },
  text:{
    fontSize: 16,
    fontFamily: 'quicksand-medium'
  },
  second:{
    marginBottom: "40%",
    alignItems: 'center',
    justifyContent: 'center',
  }
})
