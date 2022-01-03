import React, {Component} from 'react';
import {StyleSheet, Text, View,ScrollView,Image} from 'react-native';
// import { Container, Tab, Tabs, StyleProvider } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tabtest = createMaterialTopTabNavigator();



const TabOne = ({selected}) => {
    return(
        <View style={{flex:1, justifyContent:'center',alignItems:'center',width:'100%',height:'100%'}}>
            <View style={{width:'80%',height:'100%',justifyContent:'center',alignItems:'center',}}>
            {selected.Poster == 'N/A'? null : <Image 
             style={styles.imagePoster}
             source={{uri:selected.Poster}}
            /> }
            </View>
          </View>
    )
}

const TabTwo = ({selected}) => {
    return(
        <View style={{width:'100%',height:'100%',flex:1,padding:10}}>
            <ScrollView>
                <Text style={{fontSize: 18}}>{selected.Plot}</Text>
            </ScrollView>  
        </View>
    )
}


const TabThree = ({selected}) => {
    return(
        <View style={{width:'100%',height:'100%', backgroundColor:'transparent',flex:1,padding:10}}>
            <ScrollView>
                <View style={styles.subContent}>
                    <Text style={styles.section}>Actors</Text>
                    <Text>{selected.Actors}</Text>
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.section}>Director</Text>
                    <Text>{selected.Director}</Text>
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.section}>Writer</Text>
                    <Text>{selected.Writer}</Text>
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.section}>Awards</Text>
                    <Text>{selected.Awards}</Text>
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.section}>Production</Text>
                    <Text>{selected.Production}</Text>
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.section}>Released Date</Text>
                    <Text>{selected.Released}</Text>
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.section}>Genre</Text>
                    <Text>{selected.Genre}</Text>
                </View>
                <View style={styles.subContent}>
                    <Text style={styles.section}>Runtime</Text>
                    <Text>{selected.Runtime}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

function MyTabs({selected}) {
    return (
      <Tabtest.Navigator tabBarOptions={{
        labelStyle: { fontSize: 14, fontWeight:'bold' },
        
        style: { backgroundColor: 'powderblue', },
      }}>
        <Tabtest.Screen name="Poster" children={() => <TabOne selected={selected}/>} options={{
            
            tabBarIcon:() => <View style={{width:200,height:50, backgroundColor:'black'}}><Text>Jo</Text></View>
        }}/>
        <Tabtest.Screen name="Plot" component={() => <TabTwo selected={selected} />} />
        <Tabtest.Screen name="Details" children={() => <TabThree selected={selected} />} />
        
      </Tabtest.Navigator>
    );
  }

// const GreenScreen = ({overview}) => {

//         return (
//             <Container>
//                 <Tabs>
//                     <Tab
//                     heading='Overview'>
//                         <View style={styles.container}>
//                         {/* <Text style={{fontSize: 18, fontWeight:'700', marginBottom:5, textAlign:'left'}}>Overview</Text> */}
//               <ScrollView style={{borderTopWidth:2, paddingHorizontal:5, borderTopColor:'grey'}}>
//                 <Text style={{fontSize: 14}}>{overview}</Text>
//               </ScrollView>
//                         </View>
//                     </Tab>
//                     <Tab heading='Tab 2'>
//                         <TabOne />
//                     </Tab>
//                     <Tab heading='Tab 3'>
//                         <TabTwo />
//                     </Tab>
//                 </Tabs>
//             </Container>
//         );
//     }
 export default MyTabs
  const styles = StyleSheet.create({
    container: {
 	 flex: 1,
 	 justifyContent: 'center',
 	 alignItems: 'center',
 	
    },
    title: {
 	 fontSize: 20,
 	 textAlign: 'center',
 	 margin: 10,
    },
    imagePoster: {
        width: '90%',
        height:'100%'
      },
      subContent:{
          width:'100%',
          marginBottom:5,
          paddingBottom:5,
          borderBottomWidth:.5,
      },
      section:{
          fontSize:18,
          fontWeight:'bold'
      }
 });