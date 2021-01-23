import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView,TouchableOpacity,FlatList,Alert, ActivityIndicator, ImageBackground,StatusBar } from 'react-native';
import axios from "axios";
import Search from '../components/Search';
import Results from '../components/Results';
import OmdbResults from '../components/OmdbResults';
import PageInfo from '../components/PageInfo'
import MovieDetailPopup from '../components/movieDetailPopup';
import OmdbMovieDetailPopup from '../components/OmdbMovieDetailPopup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {windowWidth, windowHeight} from '../Utils/Dimensions'


const SearchScreen = () => {
    

    const apiurlOmdb ='http://www.omdbapi.com/?apikey=8cf14869';

    const apiurlTmdb ='https://api.themoviedb.org/3/search/movie?api_key=7a8b234f0b5da3ddf22841c8cefd4544';

    const [modalVisible, setModalVisible] = useState(false);

    const [state, setState] = useState({
      s:'',
      result:[],
      page:'',
      totalPages:'',
      movieResult:'',
      selected:{},
      imdbSelected:{}

    })

    const [indicator, setIndicator] = useState(false)
   

    const search = () => {
        setIndicator(true)
        axios(apiurlTmdb + "&query=" + state.s + "&page=1").then(({data}) => {
          let results = data.results;
          if (results.length == 0 ){
            alertNoMovie()
            setIndicator(false)
          } else {
          // setIndicator(false)
          setState(prevState => {
            return {...prevState, result:results, page: data.page, totalPages:data.total_pages, movieResult:data.total_results}
          })
          setIndicator(false)
        }
          
        })
        
      }

      const searchOmdb = () => {
        setIndicator(true)
        axios(apiurlOmdb + "&s=" + state.s ).then(({data}) => {
          let response = data.Response;
          let results = data.Search;

          if (response !== 'True' ){
            alertNoMovie()
            setIndicator(false)
          } else {
          // setIndicator(false)
          setState(prevState => {
            return {...prevState, result:results}
          })
          setIndicator(false)
        }
          
        })
        
      }

  
  
    const handleInput = (e) => {
      
    //   let s = e.target.value
      setState(prevState => {
        return{ ...prevState, s: e}
      })
      
      
    }

    const handleNextPage = () => {
        
        setState(prevState => {
            return{ ...prevState, page: state.page + 1}
          })
          
          

    }
    const handlePrevPage = () => {
        
        setState(prevState => {
            return{ ...prevState, page: state.page - 1}
          })
          

    }
    // useEffect(() => {
    //     if(state.page != ''){
    //     axios(apiurlTmdb + "&query=" + state.s + `&page=${state.page}`).then(({data}) => {
    //         let results = data.results;
    //         setState(prevState => {
    //           return {...prevState, result:results,  page: data.page}
    //         })
    //         // console.log(state.result)
    //         // .catch(function (error) {
    //         //     throw error;
    //         //     console.log(error);
    //         // });
            
    //       }) } else {
    //           () => null
    //       }

    // },[state.page])


    const clearSearch = () => {
        setState({s:'',
        result:[],
        page:'',
        totalPages:'',
        movieResult:'',
        selected:{},
        imdbSelected:{}})
    }

    const openPopup = id => {
      let tmdbMovieId = `https://api.themoviedb.org/3/movie/${id}?api_key=7a8b234f0b5da3ddf22841c8cefd4544&language=en-US`
      axios(tmdbMovieId + id).then(({data}) => {
        let selected = data;
        console.log(selected)
        setState(prevState => {
          return {...prevState, selected:selected}
        })
      })
      setModalVisible(true)
    }

    const openPopupOmdb = id => {
      axios(apiurlOmdb + '&i='+ id).then(({data}) => {
        let selected = data;
        console.log(selected)
        setState(prevState => {
          return {...prevState, selected:selected}
        })
      })
      setModalVisible(true)
    }


    const alertNoMovie = () => {
      Alert.alert(
        'Oops!',
        'There is No Movie Found',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      )
    }


    return (
      <ImageBackground style={styles.container} source={require('../assets/images/jonatan-moerman-4nUQH0EXzfg-unsplash.jpg')}>
        <StatusBar />
      {/* { state.page === '' || state.result == 0 ? null: <PageInfo pageInfo={state} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} result={state.result}/>} */}

      {/* <View style={styles.searchBar}> */}
        <Search handleInput={handleInput} search={searchOmdb} s={state.s} result={state.result} clearSearch={clearSearch} />
      {/* </View> */}

        {state.result.length !== 0 || state.movieResult == ''? null : alertNoMovie()}
        {/* <MovieDetailPopup selected={state.selected} modalVisible={modalVisible} setModalVisible={setModalVisible} setState={setState}/>  */}
        <OmdbMovieDetailPopup selected={state.selected} modalVisible={modalVisible} setModalVisible={setModalVisible} setState={setState}/>
        {indicator? <ActivityIndicator size="large" color="#0000ff" animating={indicator} size={50}/> : null}
  
        <FlatList
        showsVerticalScrollIndicator={false}
        data={state.result}
        renderItem={({item}) => (
            // <Results item={item} openPopup={openPopup}/>
            <OmdbResults item={item} openPopup={openPopupOmdb}/>
        )}
        keyExtractor={item => item.imdbID.toString()}
        
      />

    </ImageBackground> 

    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: "center",
      height: windowHeight,
      resizeMode:'cover',
    },
    searchBar:{
      
      width:'100%',  
      
      // top:0,
    },

    button:{
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 100,
        marginTop: 10
    },
    btnText:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    noMorePage:{
      width: '100%',
      height: '50%',
      backgroundColor:'grey',
      position: 'absolute',
      justifyContent:'center',
      alignItems:'center'
    }
  });


  