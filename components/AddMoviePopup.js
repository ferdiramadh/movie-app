import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,  Dimensions, Modal, Image, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Movieform from './MovieForm'

const AddMoviePopup = ({addMovie,addModalVisible,setAddModalVisible}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={addModalVisible}
            onRequestClose={() => {
            
                setAddModalVisible(!addModalVisible);
            
            }}
        >
            <TouchableWithoutFeedback onPress={() => setAddModalVisible(!addModalVisible)}>
            <View style={styles.container}>
                <Movieform addMovie={addMovie} setAddModalVisible={setAddModalVisible} addModalVisible={addModalVisible}/>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default AddMoviePopup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.7)'
    }
})
