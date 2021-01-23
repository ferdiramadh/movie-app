import React, {useEffect, useState,useLayoutEffect, useContext, useMemo} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView,TouchableOpacity,FlatList,Alert, ImageBackground, Button,TouchableHighlight} from 'react-native';
import {windowHeight, windowWidth} from '../Utils/Dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieForm from '../components/MovieForm'
import Movies from '../components/Movies';
import AddMoviePopup from '../components/AddMoviePopup'
import { MaterialIcons } from '@expo/vector-icons';
import {MyTestContext} from '../context/contextProvider'
import LogoTitle from '../navigation/LogoTitle'



const MyMovieList = ({navigation}) => {

    const {movies, setMovies,addMovie,addModalVisible,setAddModalVisible,removeMovie,clearData} = useContext(MyTestContext)
    

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
        <ImageBackground style={styles.container} source={require('../assets/images/alan-diaz-noCHrfxYic0-unsplash.jpg')}>
          {/* <LogoTitle title='WatchList' data={movies}/> */}
            <AddMoviePopup addMovie={addMovie} addModalVisible={addModalVisible} setAddModalVisible={setAddModalVisible} navigation={navigation} />
            <FlatList 
              data={movies}
              renderItem={({item}) => {
                return(
                    <Movies key={item.id} item={item} deleteData={removeMovie} />
                )
              }}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity style={styles.addbtn} onPress={() => setAddModalVisible(!addModalVisible)}>
              <Text style={{fontSize:26,color:'black',textAlign:'center', elevation:4}}>+</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}


export default MyMovieList



const styles = StyleSheet.create({
    container:{
        width:windowWidth,
        backgroundColor:'white',
        alignItems:'center',
        flex:1,
        justifyContent: 'center',
        height:'100%',
    },
    input: {
        width:'60%',
        height: 50,
        backgroundColor:'#fff',
        padding: 5,
        justifyContent:'center',
        borderRadius: 5,
        marginBottom:10
    },
    button: {
        width: 100,
        height: 30,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
        marginTop: 20,
        marginBottom:20
    },
    addbtn: {
      width: 50,
      height: 50,
      borderRadius: 50,
      backgroundColor:'lightgrey',
      position:'absolute',
      bottom:10,
      right:'44%',
      justifyContent:'center',
      elevation: 4
    },
    clearAllBtn: {
      width:'150%',
      height:60,
      justifyContent:'center',
      alignItems:'center',
      // position:'absolute',
      
    }
})