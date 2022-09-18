import { KeyboardAvoidingView, StyleSheet, Dimensions, Text, TouchableWithoutFeedback, View, Image } from 'react-native'
import React,{useState, useEffect, useRef} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import CustomButton2 from '../components/CustomButton2'
import home from '../data/home'
import HomeItem from '../components/HomeItem'
import {FlatList} from 'react-native'

const HomeScreen = ({navigation}) => {
  const[isVisible, setIsVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      {/* <View style={styles.second}>
        <Image source={require('../assets/images/searchIcon.png')} style={styles.icon}/>
        <Text style={styles.text}>No course is added yet</Text>
      </View>
      <CustomButton2
                    _onPress={() => {
                    }}
                    title="+     Add Course"
                    marginTop={0}
                    loading={false}
                    textStyle={{color: 'white'}}
                    disabled={false}
                    containerStyle={{}}
                  /> */}
                  <FlatList
                    data={home}
                    pagingEnabled={false}
                    showsHorizontalScrollIndicator= {false}
                    showsVerticalScrollIndicator= {false}
                    directionalLockEnabled
                    refreshing={false}
                    onRefresh={()=>{}}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    renderItem={({item}) => (
                        <HomeItem item={item} navigation={navigation}/>
                      )}
                    />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon:{

  },
  text:{
    fontSize: 16,
    fontFamily: 'quicksand-medium'
  },
  second:{
    marginBottom: "40%",
    alignItems: 'center',
    justifyContent: 'center',
  }
})
