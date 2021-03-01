import React, {useEffect, useState,useLayoutEffect, useContext, createContext} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView,TouchableOpacity,FlatList,Alert, ActivityIndicator, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const MyTestContext = createContext();

const ContextProvider = (props) => {

      const [marginRight, setMarginRight] = useState(10)
      const [addModalVisible, setAddModalVisible] = useState(false)
      const [imageStorge, setImageStorage] = useState(null);
      const [movies, setMovies] = useState([])
      const [personalData, setPersonalData] = useState({
        name:'Ferdi',
        Bio:'Lalala',
        Location:'Bogor'
      })
  
      const addMovie =  (movie_data) => {
        if(movie_data.title !== ''){
  
        movie_data.id = Math.random().toString()
        setMovies((currentMovies) => {
          return [movie_data, ...currentMovies]
        })
  
          } else {
              Alert.alert('Woy','Hoo')
             }
        }
  
  
      useEffect(() => {
        console.log('loading dulu mau ambil data')
        getData()
        console.log(movies.length)
        
        }, [])
  
  
        useEffect(() => {
          storeData()
          }, [movies])
  
  
      const storeData = async () => {
          try {
            const jsonValue = JSON.stringify(movies)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
          } catch (e) {
            // saving error
          }
        }
  
  
        const getData = async () => {
          try {
            const value = await AsyncStorage.multiGet(['@storage_Key','@img_Key'])
            const data = JSON.parse(value)
            
            if(data !== null) {
              setMovies(data)
              console.log('datanya adalah'+data.length)
            } else {
              setMovies([])
             console.log('kosong nih')
            }
            
          } catch(e) {
            console.log('error baca nih')
          }
        }
  
        const clearAll = async () => {
          try {
            await AsyncStorage.clear()
          } catch(e) {
            // clear error
          }
        
          console.log('Done.')
        }
        
        
  
        const clearData = () => {
          setMovies([])
          clearAll()
              console.log('udah ane apus semua nih ye')
        }
  
        const removeMovie = id => {
          setMovies(movies.filter(movie => movie.id !== id))
      } 
  
    //   useLayoutEffect(() => {
    //     if(movies.length !== 0){
    //     navigation.setOptions({
    //       headerRight: () => (
    //         <TouchableOpacity onPress={() => {
                
    //           Alert.alert(
    //             'Warning!',
    //             'Are You Sure to Remove All Your List?',
    //             [
    //               {
    //                 text:'Yes, Sure.',
    //                 onPress:() => {
    //                   clearData()
    //                   navigation.setOptions({
    //                     headerRight:''
    //                   })
    //                   Alert.alert('Attention!','All Your Data Have Been Deleted!')
    //                 }
    //               },
    //               {
    //                 text:'No, I\'m not sure',
    //                 onPress:null
    //               }
    //             ]
    //           )
    //         }} style={styles.clearAllBtn}>
    //           <MaterialIcons name="clear-all" size={30} color="black" />
    //           <Text style={{fontSize:16, marginTop:-5, color:'white'}}>Clear All</Text>
    //       </TouchableOpacity>
    //       ),
    //     });
    //   }}, [navigation,movies]);
 
    
    return (
        <MyTestContext.Provider value={{movies, setMovies,addMovie,addModalVisible,setAddModalVisible,removeMovie,clearData,imageStorge,setImageStorage,personalData, setPersonalData}}>
            {props.children}
        </MyTestContext.Provider>
    )
}

export default ContextProvider
