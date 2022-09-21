import { StyleSheet, Text, View, Animated, Image, FlatList, Dimensions, TouchableOpacity } from "react-native";
import React,{useState, useEffect} from "react";
import { ProgressButton } from "react-native-progress-button";
import { Provider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import slides from '../data/slides'
const {height, width} = Dimensions.get('window')

const Slide = ({item}) => {
  return(
    <View style={{alignItems: 'center'}}>
      <Image source={item.image} style={{height: "75%", width}}/>
      <Text style={styles.textTitle}>{item.title}</Text>
      <Text style={styles.textDescription}>{item.description}</Text>
    </View>
  )
}

const OnBoardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = React.useRef(null);
  useEffect(() => {
    if (currentSlideIndex == 1 ){
      setIncreaseProgress(50)
    }else if(currentSlideIndex == 2){
      setIncreaseProgress(100)
    }else{
      setIncreaseProgress(0)
    }
  })
  const Paginator = () => {
    return (
        <View style={{
             height: height * 0.30 ,
             justifyContent : 'space-between' ,
             paddingHorizontal : 20 ,
            }}>
            <View
             style = { {
               flexDirection : 'row' ,
               justifyContent : 'center' ,
               marginTop : 20 ,
             } } >
             {slides.map(( _ , index ) =>(
              <View key = { index} style = { [ styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor : "#29335C"
                }
               ] } />
            ))}
          </View>
          <View>
            <View style={styles.button}>
            <ProgressButton
          buttonState = 'progress'
          style={styles.progress}
          smoothly={true}
          timingConfig={{duration: 90, useNativeDriver: true }}
          progressColor='rgba(219, 43, 57, 0.19);'
          unfilledColor='#FEF5F6'
          progress={increaseProgress}
          text={increaseProgress === 100 ? "Continue" : 'Next'}
          textStyle={styles.text1}
          onPress={forward}
          onProgressAnimatedFinished={fin}
          />
            </View>

          </View>
        </View>
        )
  }

  const [ continueProgressButton, setContinueProgressButton] = useState('Tap Me')
  const [increaseProgress, setIncreaseProgress] = useState(0)
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const forward = (event: any, buttonState: any, progress: any) => {
    const nextSlideIndex= currentSlideIndex + 1;
    const offset = nextSlideIndex*width
    ref?.current?.scrollToOffset({offset})
    setIncreaseProgress(increaseProgress + 50)
    if (increaseProgress == 100){
      navigation.replace('AuthOptions')
    }
  }
  const fin = ()=>{
    //navigation.navigate('AuthOptions')
  }
  const updateScrollX = (e: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
    const scrollX = e.nativeEvent.contentOffset.x;
    const currentScrollX =Math.round(scrollX/width);
    setCurrentSlideIndex(currentScrollX);
  }

  const skip2 = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({offset});
    setCurrentSlideIndex(lastSlideIndex);
    setIncreaseProgress(100)
  }

  return (
    <Provider>
      <View style={styles.container}>
        <FlatList
        data={slides}
        ref={ref}
        contentContainerStyle={{height: height * 0.70}}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={updateScrollX}
        showsHorizontalScrollIndicator= {false}
        showsVerticalScrollIndicator= {false}
        bounces={false}
        directionalLockEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],{
          useNativeDriver: false,
        })}
        renderItem={({item}) => (
          <Slide item={item}/>
        )}
        />
        <TouchableOpacity style={{position: 'absolute', top: 55,left: '85%'}} onPress={skip2}>
        <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>


        <Paginator/>


      </View>
    </Provider>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  progress: {
    width:300,
    height:51,
  borderWidth:0,
borderRadius:5,
backgroundColor:'#FEF5F6',
padding:0,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  text1: {

    fontFamily: 'quicksand-medium',
    fontSize: 16,
    fontWeight: '500',
    color: '#DB2B39',
  },
  textTitle:{
    fontFamily: 'quicksand-bold',
    fontSize: 25,
    color: '#000000',
    textAlign: 'center',
    marginTop: 20
  },
  textDescription:{
    color: '#7D8A8A;',
    fontFamily: 'quicksand-light',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    // width: 272,
    // height: 36,
    maxWidth: '55%',
    lineHeight: 18
  },
  indicator: {
    height : 6 ,
    width : 6 ,
    backgroundColor : '#D4D9EE' ,
    marginHorizontal : 8 ,
    borderRadius : 5 ,
  },
  skip:{
    fontFamily: 'quicksand-medium',
    fontSize: 18,
    color: ' #271A1A'
  }
});
