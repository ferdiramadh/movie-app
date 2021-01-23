import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {windowHeight, windowWidth} from '../Utils/Dimensions'
import { AntDesign } from '@expo/vector-icons'; 
import MyListPopup from './MyListPopup'
import { LinearGradient } from 'expo-linear-gradient';

const Movies = ({item,deleteData}) => {
    const [myListDetailPopup, setMyListDetailPopup] = useState(false)

    return (
        <TouchableOpacity  onPress={() => setMyListDetailPopup(!myListDetailPopup)}>
            <LinearGradient style={styles.container} colors={['#9ba5b0', '#afb6bd', '#c4c8cc']} >
            <MyListPopup item={item} myListDetailPopup={myListDetailPopup} setMyListDetailPopup={setMyListDetailPopup}/>
            <View style={styles.movieTitle}>
                <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
            </View>
            <TouchableOpacity style={styles.delete} onPress={() => deleteData(item.id)}>
                <AntDesign name="delete" size={24} color="#3f444a" />
            </TouchableOpacity>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Movies


const styles = StyleSheet.create({
    container: {
        height: 50,
        width:windowWidth - 20.0,
        padding: 10,
        backgroundColor:'cyan',
        margin: 10,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:5
        
    },
    text: {
        fontSize: 20,
        color: '#3f444a',
        fontWeight:'bold',
        marginHorizontal:10,
        textAlign:'left'
    },
    movieTitle: {
        width: '90%'
    },
    delete: {
        width:'10%',
        alignItems:'center'
    }
})