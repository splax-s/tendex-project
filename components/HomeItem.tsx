import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React, {useState, useEffect,} from 'react'

const HomeItem = ({item, navigation}) => {
    const [onGoing, setOnGoing] = useState(item.onGoing)
  return (
    <View style={{flex: 1}}>
    <TouchableOpacity style={styles.container} onPress={()=>{
        navigation.navigate('ClockIn', {name: item.courseCode, message: item.announcements, image: item.image, lecturer: item.lecturerName, title: item.courseName, hall: item.hall, time: item.time, student: item.studentCount})}}>
        <ImageBackground source={item.image} style={styles.image} imageStyle={{ borderRadius: 10}}>
        <View style={{padding: 10}}>
            {onGoing == true ? (
                <View style={styles.ongoingContainer}>
                    <View style={{height: 8, width: 8, backgroundColor: "rgba(219, 43, 57, 0.13)", borderRadius: 50, alignItems: "center", justifyContent: "center"}}><View style={{height: 6, width: 6, backgroundColor: '#DB2B39', borderRadius: 50}}/></View>
                    <Text style={styles.ongoing}>ongoing</Text>
                </View>
            ) : null}

            <Text style={styles.text}>{item.courseCode}</Text>
            <Text style={styles.text1}>{item.studentCount} Students</Text>
        </View>
        </ImageBackground>
    </TouchableOpacity>
    </View>
  )
}

export default HomeItem

const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'column',
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center',

    },
    image: {
    height: 138,
    width: "100%",
    borderRadius: 10,
    },
    text: {
        fontSize: 13,
    fontFamily: 'quicksand-medium',
    color: 'white'
    },
    text1: {
        fontSize: 10,
    fontFamily: 'quicksand-regular',
    color: 'white'
    },
    ongoing:{
        fontSize: 8,
        fontFamily: 'quicksand-medium',
        color: 'rgba(219, 43, 57, 1)',
        marginLeft: 4,
        marginBottom: 2
    },
    ongoingContainer:{
        backgroundColor: 'rgba(255, 242, 242, 1)',
        height:13,
        width:57,
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    }
})
