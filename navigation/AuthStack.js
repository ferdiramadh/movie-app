import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState,useLayoutEffect, useContext, useMemo} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView, TouchableOpacity, Alert,Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import OnboardingScreen from '../Screens/OnboardingScreen'
import SearchScreen from '../Screens/SearchScreen'
import MyMovieList from '../Screens/MyMovieList'
import ImageUploader from '../Screens/ImageUploader'
import {MyTestContext} from '../context/contextProvider'
import LogoTitle from './LogoTitle'
import Home from '../Screens/Home'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import MyTabs from '../components/TabContent'
import Animated from 'react-native-reanimated';



const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


export const AuthStack = ({navigation, style}) => {

    return (
      <Animated.View style={[{flex: 1},style]}>
      <Stack.Navigator 
        screenOptions={{
          // headerTransparent: true,
          headerTitle: null,
          headerLeft: () => (
            <TouchableOpacity style={{ backgroundColor:'transparent', marginHorizontal: 5, padding: 10,}} onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={30} color="red" />
            </TouchableOpacity>
          )
        }}
      initialRouteName='Home'
      >
        <Stack.Screen name='Search' component={SearchScreen} options={{

          headerTransparent:'true'

        }} />  
        <Stack.Screen name='ImageUploader' component={ImageUploader} options={() => ({
          headerTitle: 'My Personal Data',
          headerTitleAlign:'center',
        })}/>
        <Stack.Screen name='myMovieList' component={MyMovieList} options={{
          headerTitle:'WatchList',
          headerTitleAlign:'center',
          headerLeft: () => (
            <TouchableOpacity style={{ backgroundColor:'transparent', marginHorizontal: 5, padding: 10,}} onPress={() => navigation.openDrawer()}>
              <Feather name="menu" size={30} color="white" />
            </TouchableOpacity>
          ),
          headerTintColor:'white',
          headerTitleStyle:{
            fontWeight:'600',
            fontSize:26
          },
          headerStyle: {backgroundColor:'#041738'}


        }}/>
      </Stack.Navigator>
     </Animated.View>
    )
 
}




const BottomDrawer = () => {
    const {movies} = useContext(MyTestContext)
    const movieCount = movies.length;

    return (
    <Tab.Navigator tabBarOptions={{inactiveBackgroundColor:'white', activeTintColor:'#09AB54', tabStyle:{borderWidth:.3, borderColor:'lightgrey'}}}>
      <Tab.Screen name="Home" component={SearchScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="WatchList" component={MyMovieList} options={{
          
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: movieCount,
        }}/>

    </Tab.Navigator>
    )
}
export default BottomDrawer