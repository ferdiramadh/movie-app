import React, {useEffect, useState,useContext} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView,TouchableOpacity,FlatList,Alert, Button } from 'react-native';
import {windowHeight, windowWidth} from '../Utils/Dimensions'
import {Formik} from 'formik'
import {useNavigation} from '@react-navigation/native'
import {MyTestContext} from '../context/contextProvider'



const MovieForm = ({addMovie,setAddModalVisible,addModalVisible}) => {
    const {movies} = useContext(MyTestContext)
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight:'bold',color:'white', marginBottom:15,marginTop:-30}}>What Movie do you want to watch?</Text>
            <Formik 
                initialValues={{title:''}}
                onSubmit={(values, actions) => {
                    let checkMovie = movies.map(movie => movie.title)
                    if(checkMovie.includes(values.title)){
                        Alert.alert('Notification','This movie has already been added to your list.')
                      } else {
                    addMovie(values)
                    actions.resetForm()
                    Alert.alert('Notification','This movie is successfully added to your list')
                    setAddModalVisible(!addModalVisible)
                      }
                } 
                    
                }
            >
                {(props) => (
                    <View>
                        <TextInput 
                          style={styles.input}
                          placeholder='Movie Title'
                          onChangeText={props.handleChange('title')}
                          value={ props.values.title}
                          onBlur={props.handleBlur('title')}                      
                        />
                        <Button 
                            title='Save'
                            onPress={props.handleSubmit}
                        />
                    </View>
                )}
            </Formik>
            {/* <TouchableOpacity style={styles.btnGoToSearch} onPress={() => {
                navigation.navigate('Search')
                setAddModalVisible(!addModalVisible)
            }}>
                <Text style={{fontSize:14, fontWeight:'bold', color:'white'}}>Go to Search Page</Text>
            </TouchableOpacity> */}
        </View>
    )
}

export default MovieForm

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width:'90%',
        height: 250,
        backgroundColor:'grey',
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 20
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor:'#fff',
        padding: 5,
        justifyContent:'center',
        borderRadius: 5,
        marginBottom:10,
    },
    btnGoToSearch: {
        backgroundColor:'black',
        width: 150,
        height: 30,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
        position:'absolute',
        bottom: 20,
        right: 30
    }
})