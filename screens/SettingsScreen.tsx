import { KeyboardAvoidingView, TextInput, StyleSheet, Image, Text, TouchableWithoutFeedback, View, ScrollView, Keyboard, TouchableOpacity } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomBackButton from '../components/CustomBackButton'
import CustomButton from '../components/CustomButton'
import Colors from '../constants/Colors'
import ErrorText from '../components/ErrorText'

const SettingsScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const [editable, setEditable] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = React.useState("");
    const [placeholder, setPlaceholder] = useState('Ikhanoba Michael-Shaka')
    const [name, setName] = useState(placeholder)
    const [level, setLevel] = useState("400")
    const [faculty, setFaculty] = useState('Computer Science')
    const [department, setDepartment] = useState('Computer Science')
    const [matNo, setMatNo] = useState('19/1234');
    const [institution, setInstitution]= useState('Babcock University, IL')
    const [pallet, setPallet] = useState(Colors.primary)
    const [ser, setSer] = useState('white')

    const handleEdit = () => {
        setEditable(!editable)
        setDisabled(!disabled)
        setPallet(Colors.primary)
        setSer('white')
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={{
            flexDirection: "row",
            paddingBottom: 0,
          }}>
      <CustomBackButton  _onPress={() => {
              navigation.goBack();
            }}/>
      </View>
      <TouchableOpacity style={[styles.backButton, {backgroundColor: pallet}]} onPress={handleEdit}>
            <Text style={[styles.edit,{color: ser}]}>Edit</Text>
        </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

      <View style={styles.h}>
            <Image style={styles.img} source={require('../assets/images/profile-pic.png')}/>
            <View style={styles.cont}>
                <Text style={styles.text}>Name</Text>
                <TextInput
                value={name}
                style={styles.textInput}
                selectionColor={Colors.primary}
                placeholder={placeholder}
                placeholderTextColor="#29335C"
                editable={editable}
                onChangeText={setName}
                />

            </View>
            <View style={{borderWidth: 1, borderColor:'#F6F2F2', width: "70%", marginTop: 4}} />
            <View style={styles.cont}>
                <Text style={styles.text}>Institution</Text>
                <TextInput
                value={institution}
                style={styles.textInput}
                selectionColor={Colors.primary}
                placeholder={institution}
                placeholderTextColor="#29335C"
                editable={editable}
                onChangeText={setInstitution}
                />
            </View>
            <View style={{borderWidth: 1, borderColor:'#F6F2F2', width: "70%", marginTop: 4}} />
            <View style={styles.cont}>
                <Text style={styles.text}>Matric No.</Text>
                <TextInput
                value={matNo}
                style={styles.textInput}
                selectionColor={Colors.primary}
                placeholder={matNo}
                placeholderTextColor="#29335C"
                editable={editable}
                onChangeText={setMatNo}
                />
            </View>
            <View style={{borderWidth: 1, borderColor:'#F6F2F2', width: "70%", marginTop: 4}} />
            <View style={styles.cont}>
                <Text style={styles.text}>Department</Text>
                <TextInput
                value={department}
                style={styles.textInput}
                selectionColor={Colors.primary}
                placeholder={department}
                placeholderTextColor="#29335C"
                editable={editable}
                onChangeText={setDepartment}
                />
            </View>
            <View style={{borderWidth: 1, borderColor:'#F6F2F2', width: "70%", marginTop: 4}} />
            <View style={styles.cont}>
                <Text style={styles.text}>Faculty</Text>
                <TextInput
                value={faculty}
                style={styles.textInput}
                selectionColor={Colors.primary}
                placeholder={faculty}
                placeholderTextColor="#29335C"
                editable={editable}
                onChangeText={setFaculty}
                />
            </View>
            <View style={{borderWidth: 1, borderColor:'#F6F2F2', width: "70%", marginTop: 4}} />
            <View style={styles.cont}>
                <Text style={styles.text}>Level</Text>
                <TextInput
                value={level}
                style={styles.textInput}
                selectionColor={Colors.primary}
                placeholder={level}
                placeholderTextColor="#29335C"
                editable={editable}
                onChangeText={setLevel}
                keyboardType="number-pad"
                />
            </View>
            <View style={{borderWidth: 0.4, borderColor:'#F6F2F2', width: "65%", marginTop: 4}} />
            {error ? (
                    <ErrorText>{error}</ErrorText>
                  ) : (
                    <ErrorText> </ErrorText>
            )}
            <CustomButton
                    _onPress={() => {
                        setPallet('#F0F0F0')
                        setSer('#8F9BB3')
                        setDisabled(!disabled)
                    }}
                    title="Save Changes"
                    marginTop={20}
                    loading={loading}
                    textStyle={{color: 'white'}}
                    disabled={disabled}
                    containerStyle={{}}
                  />
      </View>
      </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
        paddingHorizontal: 20,
      },
      h: {
        alignItems: 'center',
      },
      img: {
        height: 99,
        width: 99,
      },
      text:{
        fontSize: 10,
        fontFamily: 'quicksand-medium',
        marginBottom: 10,
      },
      cont:{
        marginTop: 30,
        alignItems: 'center',
        alignSelf: 'center'
      },
      edit:{
        fontSize: 14,
        fontFamily: 'quicksand-regular',
      },
      backButton: {
        borderRadius: 10,
        height: 29,
        width: 66,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 20
      },
      textInput:{
        width: '60%',
        height: 25,
        color: '#29335C',
        fontFamily: 'quicksand-medium',
        borderWidth: 0,
  borderRadius: 3,
  fontSize: 20,
      }
})
