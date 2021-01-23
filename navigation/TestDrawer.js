import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
    DrawerContentScrollView,
    DrawerItemList,DrawerItem
  } from '@react-navigation/drawer';
import MyMovieList from '../Screens/MyMovieList'  


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openURL('https://mywebsite.com/help')}
      />
    </DrawerContentScrollView>
  );
}

// function CustomDrawerContent({ navigation }) {
//     return (
//       <Button
//         title="Go somewhere"
//         onPress={() => {
//           // Navigate using the `navigation` prop that you received
//           navigation.navigate('WatchList');
//         }}
//       />
//     );
//   }

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (

      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}  drawerContentOptions={{
        activeTintColor: '#red',
        activeBackgroundColor:'yellow',
        color:'orange'
      }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="WatchList" component={MyMovieList} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>

  );
}