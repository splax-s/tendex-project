import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Colors from '../constants/Colors'
import CustomButton from '../components/CustomButton'
import CustomBackButton from '../components/CustomBackButton'
import ErrorText from '../components/ErrorText';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

const OtpScreen = ({navigation, route}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: 5 });
  const modalNoInternet = useRef();
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
  }, [value]);

  const email = route.params.email;

  const handleSubmit = async () => {
    setLoading(true);

    const requestData = {
      otp: value,
      email: email,
    };

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('SignupSecondScreen')

    }, 3000);
  }
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
        <Text style={styles.text1}>Enter code</Text>
        <Text style={styles.text2}>5 digit code was sent to {email}</Text>
      </View>
      <View style={styles.body}>
        <ErrorText>{error}</ErrorText>
        <CodeField
          ref={ref}
          value={value}
          onChangeText={setValue}
          rootStyle={styles.codeFieldRoot}
          cellCount={5}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={`value-${index}`}
              style={styles.cell}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>

            // <View style={{borderRadius: 50}}>

            //   </View>
          )}
        />
        <CustomButton
          _onPress={handleSubmit}
          title="Confirm"
          marginTop={140}
          loading={loading}
          textStyle={{color: 'white'}}
          disabled={loading}
          containerStyle={{}}
        />
         <KeyboardAvoidingView style={{ marginTop: 20 }}>
                    <Text style={styles.info_login}>
                      Not received?{" "}
                      <Text
                        style={styles.highlighted}
                        onPress={() => {}}
                      >
                        Resend code
                      </Text>
                    </Text>
                  </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

export default OtpScreen

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
  highlighted: {
    color: Colors.primary,
  },
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: {},

  cell: {
    width: 59,
    height: 59.21,
    lineHeight: 60,
    alignText: 'center',
    fontSize: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",

    borderColor: "#29335C",
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 5,
    color: "#000",
  },
  focusCell: {
    borderColor: "#000",
  },
  body:{
    paddingTop: 20
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
})
