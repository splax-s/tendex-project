import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
const {height, width} = Dimensions.get('window')

const AuthOptionsScreen = ({navigation}) => {
  return (
    // <View style={styles.container}>
    //   <Image source={require('../assets/images/picturePro.png')} style={styles.image}/>
    // </View>
    <ImageBackground source={require('../assets/images/picturePro.png')} style={styles.image} resizeMode='cover'>
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Welcome,
            Let’s get you
            started</Text>
            <View>
                <CustomButton
                title="Sign in"
                marginTop={30}
                loading={false}
                disabled={false}
                _onPress={()=>{navigation.navigate('LoginScreen')}}
                containerStyle={{}}
                textStyle={{color: 'white'}}
                />
                <CustomButton
                title="Sign up"
                marginTop={30}
                loading={false}
                disabled={false}
                _onPress={()=>{navigation.navigate('SignupScreen')}}
                containerStyle={{backgroundColor: 'white'}}
                color={'rgba(219, 43, 57, 0.19)'}
                textStyle={{color: '#DB2B39'}}
                />
            </View>
        </SafeAreaView>
    </ImageBackground>
  )
}

export default AuthOptionsScreen

const styles = StyleSheet.create({
    container: {
        padding: 10
      },
      image: {
        width: null,
        backgroundColor: "#fff",
        height: null,
        flex: 1,
        justifyContent: "center",
        padding: 20
      },
      text: {
        color: "#FFFFFF",
        fontSize: 36.2667,
        fontFamily: 'quicksand-bold',
        lineHeight: 45,
        width: 253.87,
        height: 135,
        marginTop: 90
      }
})
