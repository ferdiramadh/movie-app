import React, {useState} from 'react'
import {View, Text, Button,Image, StyleSheet, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import * as Animatable from 'react-native-animatable';



const Skip = ({...props}) =>  (
        <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
            <Text style={{fontSize: 16}}>Skip</Text>
        </TouchableOpacity>
)

const Next = ({...props}) => (
<TouchableOpacity style={{marginHorizontal: 10}} {...props}>
            <Text style={{fontSize: 16}}>Next</Text>
        </TouchableOpacity>
)

const Done = ({...props}) => (
    <TouchableOpacity style={{marginHorizontal: 10}} {...props}>
                <Text style={{fontSize: 16}}>Done</Text>
            </TouchableOpacity>
    )

const Dots = ({selected}) => {
    let backgroundColor
    backgroundColor = selected ? 'black' : 'grey'
    return(
        <View style={{
            width: 5,
            height: 5,
            marginHorizontal: 3,
            backgroundColor
        }}/>
    )
}




const OnboardingScreen = ({navigation}) => {
    return (
<Onboarding
  SkipButtonComponent={Skip}
  NextButtonComponent={Next}
  DoneButtonComponent={Done}
  DotComponent={Dots}
  onDone={() => navigation.navigate('Search')}
  onSkip={() => navigation.navigate('myMovieList')}
  pages={[
    {
      backgroundColor: '#fff',
      image: <Animatable.Image source={require('../assets/images.png')} animation="pulse" easing="ease-out" iterationCount="infinite"/>,
      title: 'Movie App',
      subtitle: 'Search Your Movie Here',
    },
    {
        backgroundColor: 'yellow',
        image: <Animatable.Image source={require('../assets/images.png')} animation="zoomInDown" easing="ease-in" duration={10000}/>,
        title: 'Test',
        subtitle: 'Halo',
      }
  ]}
/>
    )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    }
})
