import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import records from '../data/records'
import Colors from '../constants/Colors'
import CircularProgress from 'react-native-circular-progress-indicator';

const RecordsItem = ({item}) => {
    const details = item
  return (
    <View style={styles.inner}>
        <View style={styles.separator}>
        <View style={styles.leftSide}>
            <Text style={styles.textCourse}>{details.courseCode}</Text>
            <Text style={styles.textCourse1}>{details.courseName}</Text>
            <View style={styles.lect}>
                <Image style={styles.img} source={details.image}/>
                <Text style={styles.text}>{details.lecturerName}</Text>
            </View>
        </View>
        <View style={styles.rightSide}>
            <Text style={styles.session}>{details.present + details.absent} / <Text style={styles.session2}>{details.totalSessions} Session</Text></Text>
            <View style={{marginLeft: 'auto', padding: 10, marginRight: -12}}>
            <CircularProgress
                value={details.progress}
                radius={30}
                activeStrokeWidth={7}
                inActiveStrokeWidth={7}
                valueSuffix={'%'}
                progressValueColor={'#F3A712'}
                inActiveStrokeColor={'rgba(240, 236, 236, 1)'}
                progressValueStyle={{ fontFamily: 'quicksand-medium' }}
                strokeColorConfig={[
                    { color: 'red', value: 0 },
                    { color: 'red', value: 20 },
                    {color: '#F3A712', value: 30 },
                    { color: 'rgba(83, 77, 65, 1)', value: 50 },
                    {color: 'rgba(41, 51, 92, 1)', value: 70},
                    { color: 'rgba(74, 175, 5, 1)', value: 100 },
                  ]}
                  clockwise={false}
                />
            </View>

            <View style={styles.info}>
                <View style={styles.row}>
                    <View style={{flexDirection: 'row',  alignItems: 'center'}}>
                    <View style={{height: 10, width: 10, backgroundColor: 'rgba(74, 175, 5, 1)', borderRadius: 50, marginRight: 5}}/>
                    <Text style={styles.present}>{details.present} Present</Text>
                    </View>
                    <View style={{flexDirection: 'row',alignItems: 'center',marginLeft: 10}}>
                    <View style={{height: 10, width: 10, backgroundColor: 'rgba(219, 54, 43, 1)', borderRadius: 50, marginRight: 5}}/>
                    <Text style={styles.present}>{details.absent} Absent</Text>
                    </View>

                </View>
            </View>
        </View>
      </View>
      </View>
  )
}

export default RecordsItem

const styles = StyleSheet.create({
    inner:{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(41, 51, 92, 0.12)',
        height: 140,
        width: '100%',
        paddingHorizontal: 27,
        paddingVertical: 15,
        marginTop: 10,
      },
      separator:{
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      leftSide:{

      },
      rightSide:{
        marginLeft: 'auto',
      },
      textCourse:{
        fontSize: 20,
        fontFamily: 'quicksand-medium',
        color: '#444549',

      },
      textCourse1:{
        fontSize: 10,
        fontFamily: 'quicksand-regular',
        color: '#444549',

      },
      text:{
        fontSize: 12,
        fontFamily: 'quicksand-medium',
        color: Colors.primary,
        lineHeight: 15,
        marginLeft: 7
      },
      lect:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
      },
      img:{
        height:40,
        width:40
      },
      session:{
        fontSize: 11,
        fontFamily: 'quicksand-medium',
        color: 'rgba(41, 51, 92, 1)',
        marginLeft: 'auto'
      },
      session2: {
        color: 'rgba(41, 51, 92, 0.37)'
      },
      info:{

      },
      row:{
        flexDirection: 'row',
      },
      present: {
        fontSize: 11,
        fontFamily: 'quicksand-medium',
        color: 'rgba(41, 51, 92, 1)'
      }
})
