import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Colors from '../constants/Colors'
import CustomButton from '../components/CustomButton'
import CustomBackButton from '../components/CustomBackButton'
import Bell from '../assets/svg/bell'
import Avatar from '../assets/svg/avatar'
import Location from '../assets/svg/location'
import Time from '../assets/svg/time'
import Up from '../assets/svg/up'
import CustomButton3 from '../components/CustomButton3'

const ClockInScreen = ({navigation, route}) => {
    const [loading, setLoading] = useState(false)
    const code = route.params.name;
    const message = route.params.message;
    const image = route.params.image
    const lecturer = route.params.lecturer
    const title = route.params.title
    const hall = route.params.hall
    const time = route.params.time
    const student = route.params.student

    // console.log(code, message, image)

    const splax = () => {
        setLoading(true);
        setTimeout(() => {

            navigation.navigate('Failure')
            setLoading(false);
        }, 3000)
    }

  return (
    <SafeAreaView style={styles.container}>
       <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
            flexDirection: "row",
            paddingBottom: 20,
            alignItems: "center",
            justifyContent: "space-between"
          }}>
      <CustomBackButton  _onPress={() => {
              navigation.goBack();
            }}/>
            <Text style={styles.head}>Clock In</Text>
            <TouchableOpacity onPress={()=> {
                navigation.navigate('Announcements', {code: code, student: student, lecturer: lecturer, message: message, image: image})
            }} style={{height:32, width: 32, borderRadius: 50,backgroundColor: 'rgba(255, 242, 242, 1)', alignItems: "center", justifyContent: "center"}}>
                <Bell/>
                <View style={{position: 'absolute', right: 0, top: 0, height: 15, width: 15, borderRadius: 50, backgroundColor: 'rgba(240, 206, 160, 1)', justifyContent: "center", alignItems: "center"}}>
                <Text style={styles.brain}>{message}</Text>
                </View>
            </TouchableOpacity>
      </View>
      <View style={styles.header}>
            <ImageBackground style={styles.background} source={image} imageStyle={{ borderRadius: 10}}>
                <View style={{padding: 20, marginTop: 90}}>
                    <Text style={styles.is}>{code}</Text>
                    <Text style={styles.is1}>{student} Students</Text>
                </View>

            </ImageBackground>
            <View style={{marginTop: 12}}>
                <View>
                    <Text style={styles.host}>Host Lecturer: <Text style={styles.host1}>{lecturer}</Text></Text>
                </View>
            </View>
            <View style={{marginTop: 10.5, borderWidth: 0.5, borderColor: 'rgba(212, 217, 238, 0.58)', width: '100%'}}/>
            <View style={{marginTop: 11.5}}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text1}>Course Description</Text>
                <Text style={styles.text2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae in risus tincidunt. Diam in nunc ullamcorper tortor, amet. Non a mauris lobortis condimentum vitae convallis nunc morbi velit. </Text>
            </View>
            <View style={styles.red}>
                <View style={{flexDirection: 'row', }}>
                    <Avatar/>
                    <Text style={styles.student}>{student} Active Students</Text>
                </View>
                <View style={{flexDirection: 'row', }}>
                    <Location/>
                    <Text style={styles.student}>{hall}</Text>
                </View>
                <View style={{flexDirection: 'row', }}>
                    <Time/>
                    <Text style={styles.student}>{time}</Text>
                </View>
            </View>
            <View style={styles.uwu}>
            <CustomButton3
                    _onPress={splax}
                    title="Clock In"
                    marginTop={0}
                    loading={loading}
                    textStyle={{color: 'white'}}
                    disabled={loading}
                    containerStyle={{marginRight: 17}}
                  />
                  <View style={{height: 93,
    width: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.56)',}}/>
                  <CustomButton3
                    _onPress={() => {
                    }}
                    title="Clock Out"
                    marginTop={0}
                    loading={false}
                    textStyle={{color: 'white'}}
                    disabled={true}
                    color="#E9E9E9"
                    containerStyle={{marginLeft: 17}}
                  />
            </View>
            <TouchableOpacity
            style={styles.fix}
            onPress={()=>{
                navigation.navigate('Excusal', {code: code, student: student, lecturer: lecturer, message: message, image: image})
            }}
            >
                <Text style={styles.student1}>Excusal Report</Text>
                <Up/>
            </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ClockInScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
        paddingHorizontal: 20,
      },
      head:{
        fontSize: 16,
        color: 'rgba(41, 51, 92, 1)',
        fontFamily: 'quicksand-bold',
      },
      brain: {
        color: 'black',
        fontFamily: 'quicksand-medium',
        fontSize: 9,
      },
      header: {
        paddingTop: 10,
        paddingBottom: 24,
      },
      background:{
        width: '100%',
        height: 179,

      },
      host:{
        color: 'rgba(41, 51, 92, 1)',
        fontFamily: 'quicksand-regular',
        fontSize: 11,
      },
      host1:{
        color: 'rgba(41, 51, 92, 1)',
        fontFamily: 'quicksand-medium',
        fontSize: 13,
      },
      text:{
        color: 'rgba(41, 51, 92, 1)',
        fontFamily: 'quicksand-medium',
        fontSize: 20,
      },
      text1:{
        color: 'black',
        fontFamily: 'quicksand-medium',
        fontSize: 14,
        marginTop: 11,
      },
      text2:{
        color: 'rgba(0, 0, 0, 0.69)',
        fontFamily: 'quicksand-regular',
        fontSize: 14,
        marginTop: 5,
      },
      red: {
        backgroundColor: 'rgba(255, 242, 242, 1)',
        width: '100%',
        height: 61,
        borderRadius: 5,
        marginTop: 22,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',

      },
      student:{
        color: 'rgba(41, 51, 92, 1)',
        fontFamily: 'quicksand-regular',
        fontSize: 11,
        marginLeft: 5,
      },
      student1: {
        color: Colors.primary,
        fontFamily: 'quicksand-regular',
        fontSize: 11,
        marginRight: 5
      },
      fix:{
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
      },
      uwu:{
        flexDirection: 'row',
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center'
      },
      is:{
        fontSize: 22.1765,
        fontFamily: 'quicksand-medium',
        color: 'white'
      },
      is1:{
        fontSize: 17.06,
        fontFamily: 'quicksand-medium',
        color: 'white'
      }
})
