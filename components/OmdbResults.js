import React from 'react'
import {View, Text, TextInput, StyleSheet,TouchableOpacity, Image} from 'react-native'
import {windowWidth, windowHeight} from '../Utils/Dimensions'

const OmdbResults = ({item, openPopup}) => {

    
    
    return (
        <TouchableOpacity style={styles.listWrapper} onPress={() => openPopup(item.imdbID)}>
            <View style={styles.listContainer}>
                <View style={styles.imgContainer}>
                    { item.Poster == 'N/A' ? <View style={[styles.imgPoster,{backgroundColor:'#000', justifyContent:'center', }]}>
                        <Text style={{fontSize: 16, color: '#fff', marginHorizontal:'20%',textAlign:'center'}}>No Movie Poster</Text>
                    </View> : 
                    <Image style={styles.imgPoster} source={{uri:item.Poster}}/>}
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.titleText}>{item.Title}</Text>
                    <View style={{width:'100%', height:'50%',padding: 10, justifyContent:'flex-end', borderTopWidth:2, borderTopColor:'grey', marginTop: 5}}>
                        <Text style={{fontSize: 20, fontStyle:'italic',textAlign:'right'}}>Release Year: {item.Year}</Text>
                    </View>
                </View>
            </View>     
        </TouchableOpacity>
    )
}

export default OmdbResults

const styles = StyleSheet.create({
    listWrapper: {
        width: windowWidth - 20,
        height: 180,
        margin: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        
        
    },
    listContainer: {
        width: '100%',
        height: '100%',
        backgroundColor:'white',
        flexDirection:'row',
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20,
        borderBottomRightRadius:20
        
    },
    imgContainer:{
        width:'30%',
        height: '100%',
        
    },
    imgPoster: {
        width:'100%',
        height: '100%',
        borderRadius: 10,
        resizeMode:'cover'
        
    },
    textWrapper: {
        width:'70%',
        height: '100%',
        padding: 10,
       
    },
    titleText: {
        fontSize: 20,
        fontWeight:'bold'
    }
  
  });