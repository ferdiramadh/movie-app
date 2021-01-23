import React, {useEffect, useState, useLayoutEffect, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView,StatusBar, SafeAreaView,Image, PixelRatio,Alert,TouchableHighlight} from 'react-native';
import MyMovieList from './MyMovieList'
import LogoTitle from '../navigation/LogoTitle'
import {MyTestContext} from '../context/contextProvider'
import { MaterialIcons } from '@expo/vector-icons';


const Home = ({navigation}) => {
    const {movies,clearData} = useContext(MyTestContext);
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const { width, height } = Dimensions.get('window');

    const setSliderPage = (event) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        
        const indexOfNextScreen = Math.floor(x / width);
        console.log(indexOfNextScreen)
        if (indexOfNextScreen !== currentPage) {
          setSliderState({
            ...sliderState,
            currentPage: indexOfNextScreen,
          });
        }
      };

    const { currentPage: pageIndex } = sliderState;

    useLayoutEffect(() => {
        if(movies.length !== 0){
        navigation.setOptions({
          headerRight: () => (
            <TouchableHighlight onPress={() => {
                
              Alert.alert(
                'Warning!',
                'Are You Sure to Remove All from Your List?',
                [
                  {
                    text:'Yes, Sure.',
                    onPress:() => {
                      clearData()
                      navigation.setOptions({
                        headerRight:''
                      })
                      Alert.alert('Attention!','All Your Data Have Been Deleted!')
                    }
                  },
                  {
                    text:'No, I\'m not sure',
                    onPress:null
                  }
                ]
              )
            }} style={styles.clearAllBtn} >
              <View style={{justifyContent:'center',alignItems:'center'}}>
              <MaterialIcons name="clear-all" size={30} color="white" />
              <Text style={{fontSize:12, marginTop:-5, color:'white'}}>Clear All</Text>
              </View>
          </TouchableHighlight>
          ),
        });
      }}, [navigation,movies]);
    return (
      <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
        >
          <View style={{ width, height }}>
            <Image source={{uri:'https://images.unsplash.com/photo-1518933279022-0ef0f60d3583?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=660&q=80'}} style={styles.imageStyle} />
            <View style={styles.wrapper}>
              <Text style={styles.header}>Nature Imitates Art</Text>
              <Text style={styles.paragraph}>....something like that</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <Image
              source={require('../assets/photo_test.png')}
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>High quality Art work</Text>
              <Text style={styles.paragraph}>... for a fraction of the price</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            {/* <Image
              source={require('../assets/photo_test.jfif')}
              style={styles.imageStyle}
            /> */}
            {/* <View style={styles.wrapper}>
              <Text style={styles.header}>Top Notch Artists</Text>
              <Text style={styles.paragraph}>... all in one place</Text>
            </View> */}
            <MyMovieList />
          </View>
          <View style={{ width, height }}>
            {/* <Image
              source={require('../assets/photo_test.jfif')}
              style={styles.imageStyle}
            /> */}
            <View style={styles.wrapper}>
              <Text style={styles.header}>Best deal on the market</Text>
              <Text style={styles.paragraph}>... let's find your next art</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            {/* <Image
              source={require('../assets/photo_test.jfif')}
              style={styles.imageStyle}
            /> */}
            <View style={styles.wrapper}>
              <Text style={styles.header}>It's all about art</Text>
              <Text style={styles.paragraph}>... seriously, it is</Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(5).keys()).map((key, index) => (
            <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
          ))}
        </View>
      </SafeAreaView>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    imageStyle: {
      height: PixelRatio.getPixelSizeForLayoutSize(135),
      width: '100%',
    },
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    paragraph: {
      fontSize: 17,
    },
    paginationWrapper: {
      position: 'absolute',
      bottom: 100,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    paginationDots: {
      height: 10,
      width: 10,
      borderRadius: 10 / 2,
      backgroundColor: '#0898A0',
      marginLeft: 10,
    },
  });

export default Home
