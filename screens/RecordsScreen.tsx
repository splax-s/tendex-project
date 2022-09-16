import { StyleSheet, Text, View, Dimensions, FlatList, Image } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import records from '../data/records'
import Colors from '../constants/Colors'
import RecordsItem from '../components/RecordsItem'
const {width, height} = Dimensions.get('window')

const RecordsScreen = () => {
    //console.log(records[0].absent)

  return (
    <View style={styles.container}>
        <FlatList
      data={records}
      showsHorizontalScrollIndicator= {false}
    showsVerticalScrollIndicator= {false}
    directionalLockEnabled
    refreshing={false}
    onRefresh={()=>{}}
    keyExtractor={item => item.id}
    renderItem={({item}) => (
        <RecordsItem item={item}/>
      )}
      />

    </View>
  )
}

export default RecordsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

      },

})
