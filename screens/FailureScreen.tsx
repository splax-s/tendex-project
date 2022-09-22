import { KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View, Image } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import Logo from '../assets/svg/logo'
import Colors from '../constants/Colors'


const FailureScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.cont}>
            <Text style={styles.text}>Attendance Was Not Successful</Text>
        </View>
        <View style={{alignItems: 'center', paddingVertical: "60%"}}>
        <Image source={require('../assets/images/Cancel1.png')} style={{width: 210, height: 209}}/>
      <CustomButton
                    _onPress={() => {
                        navigation.goBack();
                    }}
                    title="Return"
                    marginTop={170}
                    loading={false}
                    textStyle={{color: 'white'}}
                    disabled={false}

                    containerStyle={{}}
                  />
                  </View>
    </SafeAreaView>
  )
}

export default FailureScreen

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
        color: Colors.primary,
        fontSize: 20,
        fontFamily: 'quicksand-medium'
      }
})
