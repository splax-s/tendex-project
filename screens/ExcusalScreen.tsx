import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableOpacity, ImageBackground, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Colors from '../constants/Colors'
import CustomButton from '../components/CustomButton'
import CustomBackButton from '../components/CustomBackButton'
import Bell from '../assets/svg/bell'
import SimplePicker from 'react-native-simple-picker';
import CustomTextInput from '../components/CustomTextInput'
import CustomTextInput1 from '../components/CustomTextInput1'
import Toast from 'react-native-toast-message';


const ExcusalScreen = ({navigation, route}) => {
    const [loading, setLoading] = useState(false)
    const code = route.params.code;
    const lecturer = route.params.lecturer
    const student = route.params.student
    const message = route.params.message;
    const image = route.params.image
    const options = ['Sickness', 'Emergency', 'Not in School', 'Official Reasons']
    const labels = ['Sickness', 'Emergency', 'Not in School', 'Official Reasons']
    const [reason, setReason] = useState('');
    const reasonRef = useRef();
    const reason1Ref = useRef();
    const messageRef = useRef();
    const [isempty, setIsEmpty] = useState(true);
    const [message1, setMessage1] = useState('')


    useEffect(() => {
        if(typeof reason === 'string' && reason.trim().length === 0 || typeof message1 === 'string' && message1.trim().length === 0){
            setIsEmpty(true)
          } else {
            setIsEmpty(false)
          }
    })

    const splax = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            Toast.show({
                type: 'success',
                text1: 'Excusal sent successfully',
                visibilityTime: 6000
              });
              setTimeout(() => {
                navigation.goBack();
              }, 6000)

        }, 3000)

    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
            flexDirection: "row",
            paddingBottom: 20,
            alignItems: "center",
            justifyContent: "space-between"
          }}>
      <CustomBackButton  _onPress={() => {
              navigation.goBack();
            }}/>
            <Text style={styles.head}>Excusal Report</Text>
            <TouchableOpacity onPress={()=> {
                navigation.navigate('Announcements', {code: code, student: student, lecturer: lecturer, message: message, image: image})
            }
            }
                style={{height:32, width: 32, borderRadius: 50,backgroundColor: 'rgba(255, 242, 242, 1)', alignItems: "center", justifyContent: "center"}}>
                <Bell/>
                <View style={{position: 'absolute', right: 0, top: 0, height: 15, width: 15, borderRadius: 50, backgroundColor: 'rgba(240, 206, 160, 1)', justifyContent: "center", alignItems: "center"}}>
                <Text style={styles.brain}>{message}</Text>
                </View>
            </TouchableOpacity>
      </View>
      <View style={styles.header}>
      <ImageBackground style={styles.background} source={image} imageStyle={{ borderRadius: 10}}>
                <View style={{padding: 20, marginTop: 20}}>
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
      <CustomTextInput
                      value={reason}
                      style={{ marginBottom: 20, width: "100%" }}
                      label="Reason"
                      placeholder={reason}
                      onSubmitEditing={() => {
                        // confirmPasswordRef.current.focus();
                      }}
                      // onLayout= {onLayout}
                      editable={false}
                      dropdown={true}
                      returnKeyType="next"
                      ref={reason1Ref}
                      tapFunction={() => {
                        reasonRef.current.show()
                        // modalAccountToBill.current.open();
                      }}
                    />
                    <CustomTextInput1
                    value={message1}
                    label="Message"
                    onChangeText={setMessage1}
                    placeholder=""
                    onSubmitEditing={Keyboard.dismiss}
                    returnKeyType="next"
                    ref={messageRef}
                    style={{ marginBottom: 20, width: "100%"}}

                  />
      <CustomButton
                    _onPress={splax}
                    title="Submit"
                    marginTop={30}
                    loading={loading}
                    textStyle={{color: 'white'}}
                    disabled={isempty||loading}
                    containerStyle={{marginRight: 17}}
                  />
                  <SimplePicker
          ref={reasonRef}
          options={options}
          labels={labels}
          initialOptionIndex={0}
          onSubmit={(option) => {
              setReason(option)
          }}
          itemStyle={{
            fontSize: 25,
            fontFamily: 'quicksand-medium'
          }}
        />
        <Toast
        position='bottom'
        bottomOffset={60}
      />
        </View>
        </TouchableWithoutFeedback>
      </ScrollView>

    </SafeAreaView>
  )
}

export default ExcusalScreen

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
      is:{
        fontSize: 22.1765,
        fontFamily: 'quicksand-medium',
        color: 'white'
      },
      is1:{
        fontSize: 17.06,
        fontFamily: 'quicksand-medium',
        color: 'white'
      },
      header: {
        paddingTop: 10,
        paddingBottom: 24,
      },
      background:{
        width: '100%',
        height: 101,
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
})
