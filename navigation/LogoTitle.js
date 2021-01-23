import React,{useState, useContext, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView, TouchableHighlight, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {MyTestContext} from '../context/contextProvider'
import { MaterialIcons } from '@expo/vector-icons';

const LogoTitle = ({title, data}) => {

    const {marginRight,clearData,movies} = useContext(MyTestContext)

    // useEffect(() => {
    //     if(movies.length !== 0) {
    //         // setMarginRight(-50)
    //     }
    // }, [movies])
    return (
        <LinearGradient colors={['#041738', '#0e2857', '#2c5399']} start={{x: 0.1, y: 0.1}} style={styles.container}>
            <Text style={[styles.text,{marginRight:marginRight}]}>{title}</Text>
            {movies.length !== 0 ?
            <TouchableHighlight onPress={() => {
              
              Alert.alert(
                'Warning!',
                'Are You Sure to Remove All from Your List?',
                [
                  {
                    text:'Yes, Sure.',
                    onPress:() => {
                      clearData()
                      
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
              <Text style={{fontSize:12, marginTop:-5, color:'red'}}>Clear All</Text>
              </View>
          </TouchableHighlight>: null}
        </LinearGradient>
    )
}

export default LogoTitle

const styles = StyleSheet.create({
    container:{
        width:'80%',
        height: 60,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:100
    },
    text:{
        fontSize: 26,
        color:'white',
        fontWeight:'bold',
    },
    clearAllBtn: {
        right:25,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        backgroundColor:'#041738',
      }
})