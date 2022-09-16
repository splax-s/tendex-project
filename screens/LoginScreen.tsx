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


const LoginScreen = ({navigation}) => {
  const passwordRef = useRef();
  const emailRef = useRef();
  const [error, setError] = React.useState(" ");
  const [loading, setLoading] = useState(false);
  const [hasTouchedPassword, sethasTouchedPassword] = useState(false);
  const [hasTouchedEmail, sethasTouchedEmail] = useState(false);
  const [matNo, setMatNo] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
            flexDirection: "row",
            paddingBottom: 20,
          }}>
      <CustomBackButton  _onPress={() => {
              navigation.goBack();
            }}/>
      </View>
      <View style={styles.header}>
        <Text style={styles.text1}>Welcome back</Text>
        <Text style={styles.text2}>Don’t miss out on any lecture</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.h}>
              <Formik
              initialValues={{ matNo: matNo, password: "" }}
              onSubmit={async (values) => {
                Keyboard.dismiss();

                const requestData = {
                  username: values.matNo.toLowerCase(),
                  password: values.password,
                };
                setLoading(true);

                setTimeout(() => {
                  setLoading(false);
                  navigation.navigate('Root')

                }, 3000);

              }}
              validationSchema={Yup.object({
                password: Yup.string().required("Password is required"),
                matNo: Yup.string()
                  .trim()
                  .required("Matric Number is required"),
              })}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={{ flex: 1 }}>
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
                    onBlur={handleBlur("matNo")}
                    onChangeText={handleChange("matNo")}
                    value={values.matNo}
                    label="Matric"
                    placeholder="09/1234"
                    onSubmitEditing={() => {
                      passwordRef.current.focus();
                    }}
                    returnKeyType="next"
                    error={errors.matNo && hasTouchedEmail ? true : undefined}
                    password={false}
                    ref={emailRef}

                  />
                  {errors.matNo && hasTouchedEmail ? (
                    <ErrorText>{errors.matNo}</ErrorText>
                  ) : (
                    <ErrorText> </ErrorText>
                  )}

                  <CustomTextInput
                    onFocus={() => {
                      setError("");
                      sethasTouchedPassword(true);
                    }}
                    onBlur={handleBlur("password")}
                    onChangeText={handleChange("password")}
                    value={values.password}
                    label="Password"
                    placeholder="********"
                    error={
                      errors.password && hasTouchedPassword ? true : undefined
                    }
                    password={true}
                    ref={passwordRef}
                    onSubmitEditing={Keyboard.dismiss}
                  />

                  {errors.password && hasTouchedPassword ? (
                    <ErrorText>{errors.password}</ErrorText>
                  ) : (
                    <ErrorText> </ErrorText>
                  )}
{/*
                  <Text style={styles.info}>
                    <Text
                      onPress={() => {
                        modalForgotPasswordRef.current.open();
                      }}
                      style={styles.highlighted}
                    >
                      I forgot my password
                    </Text>
                  </Text> */}

                    <CustomButton
                    _onPress={() => {
                      sethasTouchedEmail(true);
                      sethasTouchedPassword(true);
                      handleSubmit();
                    }}
                    title="Sign in"
                    marginTop={40}
                    loading={loading}
                    textStyle={{color: 'white'}}
                    disabled={errors.matNo || errors.password || loading}
                  />
                  <KeyboardAvoidingView style={{ marginTop: 20 }}>
                    <Text style={styles.info_login}>
                      Not yet registered?{" "}
                      <Text
                        style={styles.highlighted}
                        onPress={() => navigation.replace("SignupScreen")}
                      >
                        Create account
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

export default LoginScreen

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
    paddingTop: 40,
  }
})
