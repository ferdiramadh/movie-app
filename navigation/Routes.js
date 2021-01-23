import React, { useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import BottomDrawer from './AuthStack'
import DrawerNavigator from './Drawer'

const Routes = ({navigation}) => {
    return (
        <NavigationContainer >
            <DrawerNavigator />
        </NavigationContainer>
    )
}

export default Routes
