import React, {useEffect, useState, useContext, useCallback} from 'react';
import { StyleSheet, Text, View,  Dimensions, Modal, Image, ScrollView, TouchableOpacity, Alert} from 'react-native';
import { MyTestContext } from '../context/contextProvider';
import MyTabs from './TabContent'

const MovieDetailPopup = ({modalVisible,selected,setModalVisible, setState}) => {

  const {movies, setMovies, addMovie} = useContext(MyTestContext)
  



  // const [myMovies, setMyMovies] = useState([
  //   // {id:'1', title:'hola', rating:'5'},
  //   // {id:'2', title:'bakwan', rating:'6'},
  // ])

  const addMyMovie =  (movie_data) => {
   

    movie_data.id = Math.random().toString()
    setMyMovies((currentMovies) => {
      return [movie_data, ...currentMovies]
    })

    }


  const moviePath = 'https://image.tmdb.org/t/p/original';
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
              style={{ ...styles.openButton}}
              onPress={() => {
                setModalVisible(!modalVisible);
                setState(prev => {
                  return {...prev, selected:{}}
                })
              }}
            >
              <Text style={styles.textStyle}>X</Text>
            </TouchableOpacity>
          <Text style={styles.modalText}>{selected.original_title}</Text>
          {selected.poster_path == null? null : <Image 
              style={styles.imagePoster}
              source={{uri:`${moviePath}${selected.poster_path}`}}
            /> }
            <View style={styles.bottomContent}>
            <View style={{height: '70%',width:'100%', backgroundColor:'red',}}>
              <MyTabs overview={selected.overview}/>
              </View>
              {/* <Text style={{fontSize: 18, fontWeight:'700', marginBottom:5, textAlign:'left'}}>Overview</Text>
              <ScrollView style={{borderTopWidth:2, paddingHorizontal:5, borderTopColor:'grey'}}>
                <Text style={{fontSize: 14}}>{selected.overview}</Text>
              </ScrollView> */}
              <TouchableOpacity style={styles.addToList} onPress={() => {
                let values = {
                  title:selected.original_title,
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
                <Text style={{color:'white'}}>Add to My List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    )
}

export default MovieDetailPopup

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
      height: '90%',
      marginTop: 10,
      backgroundColor: "white",
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
      elevation: 5
    },
    openButton: {
      backgroundColor: "#2196F3" ,
      borderRadius: 50,
      padding: 10,
      elevation: 2,
      width: 40,
      height: 40,
      position:'absolute',
      right:10,
      top:'-2%'

    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 5,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 24
    },
    imagePoster: {
      width: '60%',
      height:'60%'
    },
    bottomContent: {
      width:'90%',
      height:'100%',
      flex:1,
      justifyContent:'center',
      
    },
    addToList: {
      // flex:1,
      width:100,
      height:30,
      backgroundColor:'red',
      justifyContent:'center',
      alignItems:'center',
      marginTop:10,
      borderRadius: 5
    }
  });
  