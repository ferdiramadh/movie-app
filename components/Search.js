import React from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback} from 'react-native'
import { FontAwesome,MaterialIcons } from '@expo/vector-icons';

const Search = ({handleInput,s,search, clearSearch}) => {
    

    return (
        <View style={styles.wrapper}>
                <View style={{alignItems:'flex-end', width: '10%',height:'100%',justifyContent:'center',flex:1}}>
                    {s !==''? <TouchableOpacity>
                    <MaterialIcons name="clear" size={30} color="grey" onPress={clearSearch} style={{fontWeight:'bold'}}/>
                    </TouchableOpacity> :null}
                    
                </View>
                <View style={{alignItems:'center', width: '80%',height:'100%',padding: 10,justifyContent:'center',}}>
                    <TextInput style={styles.input} placeholder='search a movie...' onChangeText={(s) => handleInput(s)} value={s}/>
                </View>
                <View style={{alignItems:'flex-start', width: '10%', height:'100%',justifyContent:'center',}}>
                    {s !==''? <TouchableOpacity>
                    <FontAwesome name="arrow-right" size={30} color="blue" onPress={search}  />
                </TouchableOpacity>:null}
                
                </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    wrapper:{
        alignItems:'center',
        marginTop:50,
        backgroundColor:'transparent', 
        flexDirection:'row',
        height:80,
        width:'100%'
    },
    text:{
      fontSize: 30,
      fontWeight: '200',
      color:'black',
      margin: 15,
      fontWeight:'bold'
    },
    input:{
      width: '100%',
      height: 50,
      backgroundColor:'lightgrey',
      padding: 10,
      borderRadius: 10,
      fontSize: 18,
      elevation:4
    },
    button:{
        elevation: 8,
        backgroundColor: "red",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 150,
        height: 50,
        marginTop: 10,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonDisabled:{
        elevation: 8,
        backgroundColor: "grey",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 150,
        height: 50,
        marginTop: 10
    },
    btnText:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase"
    }
  });