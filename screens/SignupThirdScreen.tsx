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

const SignupThirdScreen = ({navigation}) => {
    const institutionRef = useRef()
    const facultyRef = useRef()
    const departmentRef = useRef()
    const levelRef = useRef()
    const [loading, setLoading] = useState(false);
    const [institution, setInstitution] = useState('');
    const [department, setDepartment] = useState('')
    const [faculty, setFaculty] = useState('');
    const [level, setLevel] = useState('');
    const [error, setError] = React.useState(" ");
    const options1 = ['Babcock University, Ilishan', 'Nnamdi Azikiwe University, Awka', 'Anambra State University, Igbariam'];
    const labels1 = ['Babcock University, Ilishan', 'Nnamdi Azikiwe University, Awka', 'Anambra State University, Igbariam'];
    const options2 = ['Faculty of Physical Science', 'Faculty of Engineering', 'Faculty of Theatre Arts']
    const labels2 = ['Faculty of Physical Science', 'Faculty of Engineering', 'Faculty of Theatre Arts']
    const options3 = ['Computer Science', 'Computer Engineering', 'Music']
    const labels3 = ['Computer Science', 'Computer Engineering', 'Music']
    const options4 = ['100', '200', '300', '400', '500']
    const labels4 = ['100', '200', '300', '400', '500']
    const picker1Ref = useRef()
    const picker2Ref = useRef()
    const picker3Ref = useRef()
    const picker4Ref = useRef()
    const [isempty, setIsEmpty] = useState(true);

    useEffect(() => {
        if (typeof institution === 'string' && institution.trim().length === 0 || typeof faculty === 'string' && faculty.trim().length === 0 || typeof department === 'string' && department.trim().length === 0 || typeof level === 'string' && level.trim().length === 0) {
            setIsEmpty(true)
          } else {
            setIsEmpty(false)
          }
    })

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
            <SomeOptions find ={{backgroundColor: Colors.buttonOutline,}} splax={{color: Colors.primary}} >{'3'}</SomeOptions>
      </View>
      <View style={styles.header}>
        <Text style={styles.text1}>Weldone..</Text>
        <Text style={styles.text2}>Tell us about your school background</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.h}>
          <Formik
          initialValues={{
            institution: institution,
            faculty: faculty,
            department: department,
            level: level,
        }}
        onSubmit={async (values) => {
            Keyboard.dismiss();
            const requestData = {
                institution: values.institution,
                faculty: values.faculty,
                department: values.department,
                level: values.level,
              };
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                navigation.navigate('LoadingScreen')

              }, 3000);
          }}
          >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={{flex: 1}}>
                {error ? (
                    <ErrorText>{error}</ErrorText>
                  ) : (
                    <ErrorText> </ErrorText>
                  )}
                <CustomTextInput
                      value={institution}
                      style={{ marginBottom: 20, width: "100%" }}
                      label="Institution"
                      placeholder={institution}
                      onSubmitEditing={() => {
                        // confirmPasswordRef.current.focus();
                      }}
                      // onLayout= {onLayout}
                      editable={false}
                      dropdown={true}
                      returnKeyType="next"
                      ref={institutionRef}
                      tapFunction={() => {
                        picker1Ref.current.show()
                        // modalAccountToBill.current.open();
                      }}
                    />
                <CustomTextInput
                      value={faculty}
                      style={{ marginBottom: 20, width: "100%" }}
                      label="Faculty"
                      placeholder={faculty}
                      onSubmitEditing={() => {
                        // confirmPasswordRef.current.focus();
                      }}
                      // onLayout= {onLayout}
                      editable={false}
                      dropdown={true}
                      returnKeyType="next"
                      ref={facultyRef}
                      tapFunction={() => {
                        picker2Ref.current.show()
                        // modalAccountToBill.current.open();
                      }}
                    />
                <CustomTextInput
                      value={department}
                      style={{ marginBottom: 20, width: "100%" }}
                      label="Department"
                      placeholder={department}
                      onSubmitEditing={() => {
                        // confirmPasswordRef.current.focus();
                      }}
                      // onLayout= {onLayout}
                      editable={false}
                      dropdown={true}
                      returnKeyType="next"
                      ref={departmentRef}
                      tapFunction={() => {
                        picker3Ref.current.show()
                        // modalAccountToBill.current.open();
                      }}
                    />
                <CustomTextInput
                      value={level}
                      style={{ marginBottom: 20, width: "100%" }}
                      label="Level"
                      placeholder={level}
                      onSubmitEditing={() => {
                        // confirmPasswordRef.current.focus();
                      }}
                      // onLayout= {onLayout}
                      editable={false}
                      dropdown={true}
                      returnKeyType="next"
                      ref={levelRef}
                      tapFunction={() => {
                        picker4Ref.current.show()
                        // modalAccountToBill.current.open();
                      }}
                    />
                <CustomButton
                    _onPress={() => {
                      handleSubmit();
                    }}
                    title="Submit"
                    marginTop={40}
                    loading={loading}
                    textStyle={{color: 'white'}}
                    disabled={isempty||loading}
                    containerStyle={{}}
                    />
                    <SimplePicker
          ref={picker1Ref}
          options={options1}
          labels={labels1}
          initialOptionIndex={0}
          onSubmit={(option) => {
              setInstitution(option)
          }}
          itemStyle={{
            fontSize: 25,
            fontFamily: 'quicksand-medium'
          }}
        />
                    <SimplePicker
          ref={picker2Ref}
          options={options2}
          labels={labels2}
          initialOptionIndex={0}
          onSubmit={(option) => {
              setFaculty(option)
          }}
          itemStyle={{
            fontSize: 25,
            fontFamily: 'quicksand-medium'
          }}
        />
                    <SimplePicker
          ref={picker3Ref}
          options={options3}
          labels={labels3}
          initialOptionIndex={0}
          onSubmit={(option) => {
              setDepartment(option)
          }}
          itemStyle={{
            fontSize: 25,
            fontFamily: 'quicksand-medium'
          }}
        />
                    <SimplePicker
          ref={picker4Ref}
          options={options4}
          labels={labels4}
          initialOptionIndex={0}
          onSubmit={(option) => {
              setLevel(option)
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

export default SignupThirdScreen

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
