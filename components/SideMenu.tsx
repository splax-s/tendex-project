import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../constants/Colors';
import {SafeAreaView} from 'react-native-safe-area-context'
import Circle from '../assets/svg/circle'

const SideMenu = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>

        <TouchableOpacity style={styles.nav} onPress={()=>{}}>
            <Circle/>
            <Text style={styles.texts}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nav}>
            <Circle/>
            <Text style={styles.texts}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nav}>
            <Circle/>
            <Text style={styles.texts}>Home</Text>
        </TouchableOpacity>

       </SafeAreaView>
  )
}

export default SideMenu

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
      },
      nav: {
        flexDirection: 'row',
        marginTop: 46
      },
      texts: {
        fontSize: 14,
        color: 'white',
        fontFamily: 'quicksand-bold',
        marginLeft: 15,

      },

})
