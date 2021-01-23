import React from 'react'
import {View, Text, TextInput, StyleSheet,TouchableOpacity, Image} from 'react-native'
import {windowWidth, windowHeight} from '../Utils/Dimensions'

const Results = ({item, openPopup}) => {

    const moviePath = 'https://image.tmdb.org/t/p/original';
    
    
    return (
        <TouchableOpacity style={styles.listWrapper} onPress={() => openPopup(item.id)}>
            <View style={styles.listContainer}>
                <View style={styles.imgContainer}>
                { item.poster_path == null ? <View style={[styles.imgPoster,{backgroundColor:'#000', justifyContent:'center', }]}>
                    <Text style={{fontSize: 16, color: '#fff', marginHorizontal:'20%',textAlign:'center'}}>No Movie Poster</Text>
                </View> : 
                <Image style={styles.imgPoster} source={{uri:`${moviePath}${item.poster_path}`}}/>}</View>
                <View style={styles.textWrapper}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <View style={{width:'100%', height:'50%',padding: 10, justifyContent:'flex-end', borderTopWidth:2, borderTopColor:'grey', marginTop: 5}}>
                        <Text style={{fontSize: 20, fontStyle:'italic',textAlign:'right'}}>Release Date: {item.release_date}</Text>
                        <Text style={{textAlign:'right',fontStyle:'italic',}}>Popularity by TMDB: {item.popularity}</Text>
                    </View>
                </View>
            </View>     
        </TouchableOpacity>
    )
}

export default Results

const styles = StyleSheet.create({
    listWrapper: {
        width: windowWidth - 20,
        height: 150,
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
        borderRadius: 10,
        marginTop:10
    },
    imgContainer:{
        width:'30%',
        height: '100%',
        backgroundColor:'grey',
    },
    imgPoster: {
        width:'100%',
        height: '100%',
        borderRadius: 10,
        resizeMode:'center'
        
    },
    textWrapper: {
        width:'70%',
        height: '100%',
        padding: 10
    },
    titleText: {
        fontSize: 20,
        fontWeight:'bold'
    }
  
  });