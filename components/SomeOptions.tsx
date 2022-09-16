import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const SomeOptions = (props) => {
  return (
    <View style={[props.find,styles.container]}>
      <Text style={[props.splax,{ fontSize: 24, fontFamily: 'quicksand-medium'}]}>{props.children}</Text>
    </View>
  )
}

export default SomeOptions

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        height: 45,
        width: 45,
        justifyContent: "center",
        alignItems: "center",
      },
})
