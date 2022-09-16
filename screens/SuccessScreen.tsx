import { KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View, Image } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import Logo from '../assets/svg/logo'

const SuccessScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.cont}>
            <Text style={styles.text}>Attendace Recorded</Text>
        </View>
        <View style={{alignItems: 'center', paddingVertical: "60%"}}>
        <Logo/>
      <CustomButton
                    _onPress={() => {
                        navigation.replace('Root');
                    }}
                    title="Return Home"
                    marginTop={130}
                    loading={false}
                    textStyle={{color: 'white'}}
                    disabled={false}
                    color="rgba(41, 51, 92, 1)"
                    containerStyle={{}}
                  />
                  </View>
    </SafeAreaView>
  )
}

export default SuccessScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
        paddingHorizontal: 20,

      },
      cont: {
        alignItems: 'center',
      },
      text:{
        color: 'rgba(41, 51, 92, 1)',
        fontSize: 24,
        fontFamily: 'quicksand-medium'
      }

})
