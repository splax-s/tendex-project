import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Hyperlink from 'react-native-hyperlink'
import Colors from '../constants/Colors'

const AnnouncementItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Hyperlink linkDefault={ true } linkStyle={ { color: Colors.primary} }>
      <Text style={styles.text}>{item.message}</Text>
      </Hyperlink>
    </View>
  )
}

export default AnnouncementItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(41, 51, 92, 1)',
    padding:10,
    marginLeft: '20%',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginRight: "3%",
    alignSelf: 'flex-end',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  text:{
    fontSize: 15,
        color: 'white',
        fontFamily: 'quicksand-regular',

  }
})
