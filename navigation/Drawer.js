import React, {useState,useEffect,useContext} from "react";
import { StyleSheet, Text, View, TextInput, ScrollView,TouchableOpacity,FlatList,Alert, Image, Button } from 'react-native';
import { createDrawerNavigator , DrawerContentScrollView,
  DrawerItem, useIsDrawerOpen} from "@react-navigation/drawer";
import {AuthStack} from './AuthStack'
import SearchScreen from '../Screens/SearchScreen'
import Home from '../Screens/Home'
import OnboardingScreen from '../Screens/OnboardingScreen' 
import MyMovieList from '../Screens/MyMovieList' 
import { Feather, AntDesign} from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { useWindowDimensions } from 'react-native';
import {MyTestContext} from '../context/contextProvider'


const Drawer = createDrawerNavigator();


const CustomDrawerContent = ({ navigation, ...props}) => {
const {movies,imageStorge,personalData} = useContext(MyTestContext)
const [active, setActive] = useState(false)
const isDrawerOpen = useIsDrawerOpen()
// useEffect(() => {
//   setActive(false)
// }, [active])
  
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <TouchableOpacity style={{flex:1, margin:10}} onPress={() => navigation.navigate("ImageUploader")}>
          <Image source={{uri:imageStorge}} resizeMode='cover' style={{height:100, width:100, borderRadius: 50, }}/>
          <Text style={{fontSize:20, fontWeight:'700'}}>{personalData.name}</Text>
          <Text>{personalData.bio}</Text>
          <Text>{personalData.location}</Text>
        </TouchableOpacity>
      <DrawerItem 
        label='Search' 
        labelStyle={{marginLeft: -20, fontWeight:'bold',color:'black'}}
        onPress={() => {
          navigation.navigate("Search")
          setActive(!active)

        }}
        icon={() => <AntDesign name="search1" size={24} color='black'/>}
        />
      <DrawerItem 
        label='WatchList' 
        labelStyle={{marginLeft: -20,}}
        onPress={() => navigation.navigate("myMovieList")}
        icon={() =>{ 
               
          return (
           <View style={{width:'100%', height:'100%',flexDirection:'row',}}>
               <Feather name="film" size={24} color="black" />
               <View style={{width:'100%',justifyContent:'center'}}>
               <Text style={{marginLeft:12,fontWeight:'bold',color:'black'}} >WatchList</Text>
                {movies.length == 0? null :  <View style={{width:20, height:20, backgroundColor:'red', position:'absolute', right:20, borderRadius:20,justifyContent:'center',alignItems:'center'}}><Text style={{fontWeight:'bold',color:'white'}}>{movies.length}</Text></View>}
             </View></View>
          )} }
        
      />
      </View>
    </DrawerContentScrollView>

  );
}

export const DrawerNavigator = (props) => {
  console.disableYellowBox = true;
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const dimensions = useWindowDimensions();
  console.log(dimensions)
  
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  // const borderRadius = Animated.interpolate(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 16],
  // });

  const animatedStyle = { transform: [{ scale }] };
  
  const {focused} = props
  const test = focused?'res':'okok'
  console.log('focus', test)
  return (
    <Drawer.Navigator 
        initialRouteName="Home"
        drawerType="slide"
        drawerContentOptions={{
          activeTintColor: '#red',
          activeBackgroundColor:'yellow',
          color:'orange',
        }}
        drawerContent={ props => {
          
          setProgress(props.progress);
          return <CustomDrawerContent {...props} />
        }}
        drawerStyle={{
          backgroundColor: 'transparent',
          width:'60%'
        }}
        sceneContainerStyle={{backgroundColor:'transparent'}}
        contentContainerStyle={{flex: 1}}
        >
      <Drawer.Screen name="Home">
          {props =><AuthStack {...props} style={animatedStyle}/>}
        </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default DrawerNavigator