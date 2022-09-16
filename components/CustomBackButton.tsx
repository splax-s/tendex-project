import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import Back from '../assets/svg/back'

const CustomBackButton = ({_onPress}) => {
  return (
    <TouchableOpacity  onPress={_onPress} style={styles.container}>
      <Back/>
    </TouchableOpacity>
  )
}

export default CustomBackButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.buttonOutline,
        borderRadius: 40,
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
      },
})
