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

const SignupScreen = ({navigation}) => {
  const passwordRef = useRef();
  const emailRef = useRef();
  const [error, setError] = React.useState(" ");
  const [loading, setLoading] = useState(false);
  const [hasTouchedPassword, sethasTouchedPassword] = useState(false);
  const [hasTouchedEmail, sethasTouchedEmail] = useState(false);
  const [hasTouchedTel, sethasTouchedTel] = useState(false);
  const phonenumberRef = useRef();
  const confirmPasswordRef = useRef();
  const [error_, setError_] = useState(true);
  const [hasTouchedConfirmPassword, sethasTouchedConfirmPassword] =useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
            flexDirection: "row",

            justifyContent: 'center',
            alignItems: 'center',
          }}>

            <SomeOptions find={{backgroundColor: Colors.buttonOutline,}} splax={{color: Colors.primary}}>{'1'}</SomeOptions>
            <View style={{flex: 0.3, height: 2, backgroundColor: '#FFF2F2'}} />
            <SomeOptions find={{backgroundColor: Colors.secoutline}} splax={{}} >{'2'}</SomeOptions>
            <View style={{flex: 0.3, height: 2, backgroundColor: '#FFF2F2'}} />
            <SomeOptions find ={{backgroundColor: Colors.secoutline,}} splax={{}} >{'3'}</SomeOptions>
      </View>
       <View style={styles.header}>
        <Text style={styles.text1}>First things first..</Text>
        <Text style={styles.text2}>Enter a valid email credential</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.h}>
        <Formik
          initialValues={{
            phonenumber: "",
             email: "",
             password: "",
             confirmPassword: ""
        }}
          onSubmit={async (values) => {
          Keyboard.dismiss();

          const requestData = {
            phonenumber: values.phonenumber,
            email: values.email.toLowerCase(),
           password: values.password,
          };
          setLoading(true);

          setTimeout(() => {
            setLoading(false);
            navigation.navigate('OtpScreen', { email: requestData.email })
          }, 3000);

          }}
          validationSchema={Yup.object({
            password: Yup.string()
                .required("Password is required")
                .matches(
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                  "Minimum 8 characters, at least an uppercase letter, a lowercase letter and a number"
                ),
            confirmPassword: Yup.string()
                .required("Confirm password is required")
                .oneOf([Yup.ref("password"), null], "Passwords don't match"),
            phonenumber: Yup.number()
                  .required("Phone number is required")
                  .typeError("Invalid phone number")

                  .positive("A phone number can't start with a minus")
                  .integer("A phone number can't include a decimal point")
                  .moreThan(99999999, "Invalid phone number"),
            email: Yup.string()
              .trim()
              .email("Invalid email address")
              .required("Email address is required"),

          })}
        >
          {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{flex:1}}>
              {error ? (
                    <ErrorText>{error}</ErrorText>
                  ) : (
                    <ErrorText> </ErrorText>
              )}
              <CustomTextInput
                    onFocus={() => {
                      sethasTouchedEmail(true);
                      setError("");
                    }}
                    onBlur={handleBlur("email")}
                    onChangeText={handleChange("email")}
                    value={values.email}
                    label="Email"
                    placeholder="splax@tendex.com"
                    onSubmitEditing={() => {
                      phonenumberRef.current.focus();
                    }}
                    returnKeyType="next"
                    error={errors.email && hasTouchedEmail ? true : undefined}
                    password={false}
                    ref={emailRef}
                  />
                  {errors.email && hasTouchedEmail ? (
                    <ErrorText>{errors.email}</ErrorText>
                  ) : (
                    <ErrorText> </ErrorText>
                  )}
                   <CustomTextInput
                    onFocus={() => {
                      setError("");
                      sethasTouchedTel(true);
                    }}
                    onBlur={handleBlur("phonenumber")}
                    onChangeText={handleChange("phonenumber")}
                    value={values.phonenumber}
                    label="Phone number"
                    returnKeyType="next"
                    placeholder="e.g 08123456789"
                    keypad="phone-pad"
                    onSubmitEditing={() => {
                      passwordRef.current.focus();
                    }}
                    error={
                      errors.phonenumber && hasTouchedTel ? true : undefined
                    }
                    ref={phonenumberRef}
                  />
                   {errors.phonenumber && hasTouchedTel ? (
                    <ErrorText>{errors.phonenumber}</ErrorText>
                  ) : (
                    <ErrorText> </ErrorText>
                  )}
                  <CustomTextInput
                  onFocus={() => {
                    sethasTouchedPassword(true);
                  }}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  label="Password"
                  placeholder="********"
                  onSubmitEditing={() => {
                    confirmPasswordRef.current.focus();
                  }}
                  returnKeyType="next"
                  error={
                    errors.password && hasTouchedPassword ? true : undefined
                  }
                  password={true}
                  ref={passwordRef}
                />

                {errors.password && hasTouchedPassword ? (
                  <ErrorText>{errors.password}</ErrorText>
                ) : (
                  <ErrorText> </ErrorText>
                )}

                <CustomTextInput
                  onFocus={() => {
                    setError_(false);
                    sethasTouchedConfirmPassword(true);
                  }}
                  onBlur={handleBlur("confirmPassword")}
                  onChangeText={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  label="Confirm Password"
                  placeholder="********"
                  error={
                    errors.confirmPassword && hasTouchedConfirmPassword
                      ? true
                      : undefined
                  }
                  password={true}
                  ref={confirmPasswordRef}
                  onSubmitEditing={Keyboard.dismiss}
                />

                {errors.confirmPassword && hasTouchedConfirmPassword ? (
                  <ErrorText>{errors.confirmPassword}</ErrorText>
                ) : (
                  <ErrorText> </ErrorText>
                )}
                  <CustomButton
                    _onPress={() => {
                      sethasTouchedEmail(true);
                      sethasTouchedPassword(true);
                      handleSubmit();
                    }}
                    title="Create Account"
                    marginTop={20}
                    loading={loading}
                    textStyle={{color: 'white'}}
                    disabled={ error_ ||errors.email || errors.password || errors.phonenumber || errors.password ||
                      errors.confirmPassword || loading}
                  />
                  <KeyboardAvoidingView style={{ marginTop: 20 }}>
                    <Text style={styles.info_login}>
                      Already have an account?{" "}
                      <Text
                        style={styles.highlighted}
                        onPress={() => navigation.replace("LoginScreen")}
                      >
                        Log in
                      </Text>
                    </Text>
                  </KeyboardAvoidingView>

            </View>
          )}

        </Formik>
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignupScreen

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
