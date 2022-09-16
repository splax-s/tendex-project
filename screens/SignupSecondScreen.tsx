import { KeyboardAvoidingView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomBackButton from '../components/CustomBackButton'
import CustomTextInput from '../components/CustomTextInput'
import ErrorText from '../components/ErrorText'
import { ScrollView } from 'react-native'
import { Keyboard } from 'react-native'
import { Formik } from 'formik'
import * as Yup from "yup";
import Colors from '../constants/Colors'
import CustomButton from '../components/CustomButton'
import SomeOptions from '../components/SomeOptions'
import SimplePicker from 'react-native-simple-picker';

const SignupSecondScreen = ({navigation}) => {
  const options = ['Male', 'Female', 'Rather not say'];
  const labels = ['Male', 'Female', 'Rather not say'];
    const fullnameRef = useRef();
    const genderRef= useRef()
    const matRef= useRef()
    const pickerRef= useRef()
    const [gender, setGender] = useState('Male');
    const [error, setError] = React.useState(" ");
    const [fullname, setFullname] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState()
    const [hasTouchedFullname, sethasTouchedFullname] = useState(false);
    const [hasTouchedMat, sethasTouchedMat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shouldShow, setShouldShow] = useState(true);
  return (
    <SafeAreaView style={styles.container}>
       <View style={{
            flexDirection: "row",

            justifyContent: 'center',
            alignItems: 'center',
          }}>

            <SomeOptions find={{backgroundColor: Colors.buttonOutline,}} splax={{color: Colors.primary}}>{'1'}</SomeOptions>
            <View style={{flex: 0.3, height: 2, backgroundColor: '#FFF2F2'}} />
            <SomeOptions find={{backgroundColor: Colors.buttonOutline}} splax={{color: Colors.primary}} >{'2'}</SomeOptions>
            <View style={{flex: 0.3, height: 2, backgroundColor: '#FFF2F2'}} />
            <SomeOptions find ={{backgroundColor: Colors.secoutline,}} splax={{}} >{'3'}</SomeOptions>
      </View>
       <View style={styles.header}>
        <Text style={styles.text1}>Almost there..</Text>
        <Text style={styles.text2}>Let’s get to know you</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.h}>
        <Formik
         initialValues={{
            fullname: "",
            matNo: "",
            gender: gender
        }}
        onSubmit={async (values) => {
            Keyboard.dismiss();
            const requestData = {
              fullname: values.fullname,
              email: values.matNo,
              gender: values.gender,
            };
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              navigation.navigate('SignupThirdScreen')

            }, 3000);
        }}
        validationSchema={Yup.object({
            fullname: Yup.string().required("Full name is required"),
            matNo: Yup.string().trim()
            .required("Matric Number is required"),
        })}
        >
             {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={{flex: 1}}>
                    {error ? (
                    <ErrorText>{error}</ErrorText>
                  ) : (
                    <ErrorText> </ErrorText>
                  )}
                  <CustomTextInput
                    onFocus={() => {
                      sethasTouchedFullname(true);
                    }}
                    onBlur={handleBlur("fullname")}
                    onChangeText={handleChange("fullname")}
                    value={values.fullname}
                    label="Full name"
                    returnKeyType="next"
                    placeholder="e.g John snow"
                    onSubmitEditing={() => {
                    //   lastnameRef.current.focus();
                    }}
                    error={
                      errors.fullname && hasTouchedFullname ? true : undefined
                    }
                    ref={fullnameRef}
                  />
                  {errors.fullname && hasTouchedFullname ? (
                    <ErrorText>{errors.fullname}</ErrorText>
                  ) : (
                    <ErrorText> </ErrorText>
                  )}
                 <CustomTextInput
                      value={gender}
                      style={{ marginBottom: 20, width: "100%" }}
                      label="Gender"
                      placeholder={gender}
                      onSubmitEditing={() => {
                        // confirmPasswordRef.current.focus();
                      }}
                      // onLayout= {onLayout}
                      editable={false}
                      dropdown={true}
                      returnKeyType="next"
                      ref={genderRef}
                      tapFunction={() => {
                        pickerRef.current.show()
                        // modalAccountToBill.current.open();
                      }}
                    />
                    <CustomTextInput
                    onFocus={() => {
                      sethasTouchedMat(true);
                      setError("");
                    }}
                    onBlur={handleBlur("matNo")}
                    onChangeText={handleChange("matNo")}
                    value={values.matNo}
                    label="Matric"
                    placeholder="09/1234"
                    onSubmitEditing={() => {
                      Keyboard.dismiss
                    }}
                    returnKeyType="next"
                    error={errors.matNo && hasTouchedMat ? true : undefined}
                    password={false}
                    ref={matRef}

                  />
                  {errors.matNo && hasTouchedMat ? (
                    <ErrorText>{errors.matNo}</ErrorText>
                  ) : (
                    <ErrorText> </ErrorText>
                  )}
                   <CustomButton
                    _onPress={() => {
                      sethasTouchedMat(true);
                      sethasTouchedFullname(true);
                      handleSubmit();
                    }}
                    title="Proceed"
                    marginTop={40}
                    loading={loading}
                    textStyle={{color: 'white'}}
                    disabled={errors.matNo || errors.fullname || loading}
                  />
                  {/* {!shouldShow ?
                  (<Picker
        items={data}
        ref={pickerRef}
        onItemChange={(item)=>{
          setGender(item.label)
        }}
        placeholder="Choose a Gender"
        isNullable={false}
      //backdropAnimation={{ opacity: 0 }}
      mode="dialog"
      //isNullable
      //disable
      itemFontFamily="quicksand-medium"

    />): null} */}
     <SimplePicker
          ref={pickerRef}
          options={options}
          labels={labels}
          initialOptionIndex={0}
          onSubmit={(option) => {
              setGender(option)
          }}
          itemStyle={{
            fontSize: 25,
            fontFamily: 'quicksand-medium'
          }}
        />
                </View>
             )}

        </Formik>
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignupSecondScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
        paddingHorizontal: 20,
      },
      text1:{
        color: '#29335C',
        fontSize: 32,
        fontFamily: 'quicksand-medium'
      },
      text2:{
        color: '#777878',
        fontSize: 15,
        fontFamily: 'quicksand-light',
        marginTop: 10
      },
      header: {
        alignItems: 'flex-start',
        flexDirection: 'column',
        display: 'flex',
        gap: 10,
        marginTop: 40
      },
      info_login: {
        textAlign: "center",
        fontFamily: "quicksand-medium",
        fontSize: 16,
        marginTop: "auto",
        justifyContent: "center",
        alignSelf: "center",
        color: 'rgba(4, 23, 42, 0.7)'
      },

      highlighted: {
        color: Colors.primary,
      },
      h:{
        paddingTop: 20,
      }
})
