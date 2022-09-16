import { StyleSheet, Text, View, Keyboard, KeyboardAvoidingView, TouchableOpacity, ImageBackground, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import Colors from '../constants/Colors'
import CustomButton from '../components/CustomButton'
import CustomBackButton from '../components/CustomBackButton'
import Bell from '../assets/svg/bell'
import SimplePicker from 'react-native-simple-picker';
import CustomTextInput from '../components/CustomTextInput'
import CustomTextInput1 from '../components/CustomTextInput1'
import announcements from '../data/announcement'
import AnnouncementItem from '../components/AnnouncementItem'

const AnnouncementScreen = ({navigation, route}) => {
    const code = route.params.code;
    const lecturer = route.params.lecturer
    const student = route.params.student
    const message = route.params.message;
    const image = route.params.image
  return (
    <SafeAreaView style={styles.container}>
      <View style={{
            flexDirection: "row",
            paddingBottom: 20,
            alignItems: "center",
            justifyContent: "space-between"
          }}>
      <CustomBackButton  _onPress={() => {
              navigation.goBack();
            }}/>
            <Text style={styles.head}>Announcement</Text>
            <TouchableOpacity onPress={()=> {
            }} style={{height:32, width: 32, borderRadius: 50,backgroundColor: 'white', alignItems: "center", justifyContent: "center"}}>
                <Text> </Text>
            </TouchableOpacity>
      </View>
      <View style={styles.header}>
      <ImageBackground style={styles.background} source={image} imageStyle={{ borderRadius: 10}}>
                <View style={{padding: 20, marginTop: 20}}>
                    <Text style={styles.is}>{code}</Text>
                    <Text style={styles.is1}>{student} Students</Text>
                </View>
            </ImageBackground>
            <View style={{marginTop: 12}}>
                <View>
                    <Text style={styles.host}>Host Lecturer: <Text style={styles.host1}>{lecturer}</Text></Text>
                </View>
            </View>
            <View style={{marginTop: 10.5, borderWidth: 0.5, borderColor: 'rgba(212, 217, 238, 0.58)', width: '100%'}}/>
      </View>
      <FlatList
      data={announcements}
      pagingEnabled={false}
      showsHorizontalScrollIndicator= {false}
      showsVerticalScrollIndicator= {false}
      directionalLockEnabled
      scrollEventThrottle={100}
      refreshing={false}
      onRefresh={()=>{}}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
          <AnnouncementItem item={item}/>
        )}
      />
    </SafeAreaView>
  )
}

export default AnnouncementScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
        paddingHorizontal: 20,
      },
      head:{
        fontSize: 16,
        color: 'rgba(41, 51, 92, 1)',
        fontFamily: 'quicksand-bold',
      },
      brain: {
        color: 'black',
        fontFamily: 'quicksand-medium',
        fontSize: 9,
      },
      is:{
        fontSize: 22.1765,
        fontFamily: 'quicksand-medium',
        color: 'white'
      },
      is1:{
        fontSize: 17.06,
        fontFamily: 'quicksand-medium',
        color: 'white'
      },
      header: {
        paddingTop: 10,
        paddingBottom: 24,
      },
      background:{
        width: '100%',
        height: 101,
      },
      host:{
        color: 'rgba(41, 51, 92, 1)',
        fontFamily: 'quicksand-regular',
        fontSize: 11,
      },
      host1:{
        color: 'rgba(41, 51, 92, 1)',
        fontFamily: 'quicksand-medium',
        fontSize: 13,
      },
})
