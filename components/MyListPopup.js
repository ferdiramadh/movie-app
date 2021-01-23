import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,  Dimensions, Modal, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MyListPopup = ({item,myListDetailPopup,setMyListDetailPopup}) => {
    return (
        <Modal 
        animationType="slide"
        transparent={true}
        visible={myListDetailPopup}
        onRequestClose={() => {
        
            setMyListDetailPopup(!myListDetailPopup);
        
        }}
        >
            <TouchableWithoutFeedback onPress={() => setMyListDetailPopup(!myListDetailPopup)}>
            <View style={styles.container}>
                <LinearGradient style={[styles.content, styles.linearGradient]} colors={['#041738', '#0e2857', '#2c5399']} start={{x: 0.1, y: 0.1}}>
                    <View style={{margin:10,width:'100%', padding: 5, borderBottomWidth:2, borderBottomColor:'white'}}>
                    <Text style={{fontSize: 20, color:'white', fontWeight:'bold'}}>Detail</Text>
                    </View>
                    <View style={styles.mainContent}>
                        <Text style={styles.text}>{item.title}</Text>
                    </View>
                </LinearGradient>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default MyListPopup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.3)'
    },
    content:{
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10
    },
    text: {
        color:'white',
        fontSize: 30,
        fontFamily:'Roboto'
    },
    mainContent:{
        width:'100%',
        alignItems:'center',
        padding:5
       
    },
    linearGradient: {
        
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15

      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Roboto',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
})
