import React, {useEffect, useState, useContext, useCallback} from 'react';
import { StyleSheet, Text, View,  Dimensions, Modal, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { MyTestContext } from '../context/contextProvider';
import MyTabs from './TabContent'



const OmdbMovieDetailPopup = ({modalVisible,selected,setModalVisible, setState}) => {
  const {movies, setMovies, addMovie} = useContext(MyTestContext)


  const addMyMovie =  (movie_data) => {
   

    movie_data.id = Math.random().toString()
    setMyMovies((currentMovies) => {
      return [movie_data, ...currentMovies]
    })

    }

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          
          setModalVisible(!modalVisible);
          
        }}
      >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                setModalVisible(!modalVisible);
                setState(prev => {
                  return {...prev, selected:{}}
                })
              }}
            >
              <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>
          <Text style={styles.modalText}>{selected.Title}</Text>
          <View style={{height: '70%',width:'100%', backgroundColor:'blue',marginTop:5}}>
          <MyTabs selected={selected}/>
          </View>
          
         
            <View style={styles.bottomContent}>
              <TouchableOpacity style={styles.addToList} onPress={() => {
                let values = {
                  title:selected.Title,
                }
                let checkMovie = movies.map(movie => movie.title)

                if(checkMovie.includes(values.title)){
                  Alert.alert('Notification','This movie has already been added to your list.')
                } else {
                addMovie(values)
                Alert.alert('Notification','This movie is successfully added to your list')
                setModalVisible(!modalVisible)
                setState(prev => {
                  return {...prev, selected:{}}
                })
                
                }

                
              }}>
                <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Add to My List Branch 2</Text>
              </TouchableOpacity>
              <View style={styles.subBottomContent}>
                  <Image source={require('../assets/images/imdbrating.png')} style={styles.imdbIcon} />
                  <View style={styles.imdbStarContainer}>
                  <Image source={require('../assets/images/star.png')} style={styles.starIcon} />
                  <Text style={styles.ratingImdb}>{selected.imdbRating}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

    )
}

export default OmdbMovieDetailPopup

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: '100%',
      width:'100%',
      backgroundColor:'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
      position:'relative',
      width:'90%',
      height: '80%',
      marginTop: 10,
      backgroundColor:'#2e3b4f',
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      justifyContent:'center'
    },
    openButton: {
      backgroundColor: "red" ,
      borderRadius: 50,
      padding: 10,
      elevation: 2,
      width: 40,
      height: 40,
      position:'absolute',
      right:10,
      top:'-3%'

    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize:16
    },
    modalText: {
      marginBottom: 5,
      textAlign: "center",
      fontWeight: "700",
      fontSize:24,
      color:'#b6c7e0'
    },
   
    bottomContent: {
      width:'100%',
      flex:1,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      marginTop:10,
      
     
    },
    subBottomContent:{
      width:'50%',
      height:'100%',
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      marginLeft:50,
      flex:1,
    },
    addToList: {
      // flex:1,
      width:'40%',
      height:40,
      backgroundColor:'#2196F3',
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 5,
      elevation: 3,
     
      
    },
    imdbIcon:{
      width:80,
      height:40,
      borderRadius:5
    },
    starIcon:{
      width:50,
      height:50,
      elevation: 3,
    },
    ratingImdb:{
      fontSize:20, 
      fontWeight:'bold',
      color:'black', 
      position:'absolute', 
      right:'22%',
      fontWeight:'bold',
      elevation: 4,
    },
    imdbStarContainer:{
      marginLeft:5,
      justifyContent:'center',
      alignItems:'center',
      
    }
  });
  