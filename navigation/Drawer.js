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
const {movies} = useContext(MyTestContext)
const [active, setActive] = useState(false)
const isDrawerOpen = useIsDrawerOpen()
// useEffect(() => {
//   setActive(false)
// }, [active])
  
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <TouchableOpacity style={{flex:1, margin:20, bottom:10}}>
        <Image source={{uri:"data:image/jpeg;base64,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"}} resizeMode='center' style={{height:100, width:100, borderRadius: 50}}/>
        <Text style={{fontSize:20, fontWeight:'700'}}>My Profile</Text>
        <Text>test@gmail.com</Text>
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
      <DrawerItem 
        label='Onboarding' 
        labelStyle={{marginLeft: -20}}
        onPress={() => navigation.navigate("Onboarding")}
        icon={() => <AntDesign name="dashboard" size={24} color='black'/>}
      />
      <DrawerItem 
        label='Onboarding' 
        labelStyle={{marginLeft: -20}}
        onPress={() => navigation.navigate("Onboarding")}
        icon={() =>{ 
        
          
         return (
          <View style={{width:'100%', height:'100%',flexDirection:'row',}}>
              <AntDesign name="dashboard" size={24} color='black' />
              <View style={{width:'100%',justifyContent:'center'}}>
              <Text style={{marginLeft:12}} >Test</Text>
              <View style={{width:20, height:20, backgroundColor:'red', position:'absolute', right:20, borderRadius:20,justifyContent:'center',alignItems:'center'}}><Text style={{fontWeight:'bold',color:'white'}}>5</Text></View>
            </View></View>
         )}}
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
          color:'orange'
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