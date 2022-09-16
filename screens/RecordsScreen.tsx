import { StyleSheet, Text, View } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'

const RecordsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>RecordsScreen</Text>
    </SafeAreaView>
  )
}

export default RecordsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
