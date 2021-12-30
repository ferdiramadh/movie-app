import React, { useState, useEffect,useContext } from 'react';
import { Button, Image, View, Platform,Text, StyleSheet, TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MyTestContext} from '../context/contextProvider'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {Formik} from 'formik';

export default function ImageUploader({navigation}) {
  const [image, setImage] = useState(null);
  // const[imageStorge, setImageStorage] = useState(null);
  const {imageStorge,setImageStorage,personalData, setPersonalData} = useContext(MyTestContext)
  const [editItem, setEditItem] = useState(null);
  const storeImgData = async () => {
    try {
      // const jsonValue = JSON.stringify(image);
      await AsyncStorage.setItem('@img_Key', imageStorge);
      console.log('data telah disimpan')
    } catch (e) {
      // saving error
      console.log('data GAGAL disimpan!')
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@img_Key')
      // const data = JSON.parse(value)
      
      if(value !== null) {
        setImageStorage(value);
        console.log('datanya adalah'+value);
        
      } else {
        
       console.log('kosong nih')
      }
      
    } catch(e) {
      console.log('error baca nih');
      console.log(e)
    }
  }

  const removeImage = async () => {
    try {
      setImageStorage(null);
      await AsyncStorage.removeItem('@img_Key')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }
  

  useEffect(() => {
    storeImgData();
    getData();
  }, [])

  // useEffect(() => {
  //   getData();
  //   console.log('ambil data')
  // }, [])


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    

    if (!result.cancelled) {
      // setImage(result.uri);
      setImageStorage(result.uri);
      
      
    }
  };
  const handleInput = (e) => {
      
    //   let s = e.target.value
        setPersonalData(prevState => {
        return{ ...prevState, name: e}
      })
      
      
    }

  return (
    <View style={styles.container}>
      {/* <View style={styles.content}>  */}
        <View style={styles.photoArea}>
          <View style={{width:200, height:200,alignItems:'center',justifyContent:'center',position:'relative',borderWidth:2, }}>
          {imageStorge && <Image source={{ uri: imageStorge }} style={{ width: 200, height: 200 }} />}
        <TouchableOpacity style={{position:'absolute', alignItems:'center',top:25}} onPress={pickImage}>
          <Feather name="camera" size={40} color="lightgrey" />
          <Text style={{fontSize:16, fontWeight:'500',color:'red'}}>Take a Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{position:'absolute', alignItems:'center',bottom:25}} onPress={removeImage}>
          <AntDesign name="delete" size={40} color="lightgrey" />
          <Text style={{fontSize:16, fontWeight:'500',color:'lightgrey'}}>Remove Photo</Text>
        </TouchableOpacity>
          </View>
       
        </View>
        
        <Formik 
                initialValues={{name:personalData.name, bio:personalData.bio, location:personalData.location}}
                onSubmit={(values, actions) => {
                    console.log(values)
                    setPersonalData(values)
                    navigation.navigate('Search')
                }}
            >
                {(props) => (
                        <View  behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.formData}>
                        <TextInput 
                          style={styles.input}
                          placeholder='Your Name... (max 20 char)'
                          onChangeText={props.handleChange('name')}
                          value={ props.values.name}
                          onBlur={props.handleBlur('name')}   
                          maxLength={20}                   
                        />
                        <TextInput 
                          style={styles.input}
                          placeholder='Your Bio... (max 20 char)'
                          onChangeText={props.handleChange('bio')}
                          value={ props.values.bio}
                          onBlur={props.handleBlur('bio')}   
                          maxLength={20}                   
                        />
                        <TextInput 
                          style={styles.input}
                          placeholder='Your Location... (max 20 char)'
                          onChangeText={props.handleChange('location')}
                          value={ props.values.location}
                          onBlur={props.handleBlur('location')}
                          maxLength={20}                      
                        />
                        <Button 
                            title='Save'
                            onPress={props.handleSubmit}
                        />
                        </View>
                )}
            </Formik>


      {/* </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    // backgroundColor:'green',
  },
  formData:{
    alignItems: 'center', 
    justifyContent: 'center',
    // backgroundColor:'blue',
    width:'100%',
    height:'50%',
  },
  photoArea:{
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor:'lightgrey',
    width:'100%',
    height:'50%',
  },
  input:{
    width: '80%',
    height: 50,
    backgroundColor:'white',
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    elevation:4,
    marginVertical:10
  },
})