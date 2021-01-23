import React from 'react'
import Routes from './Routes'
import ContextProvider from '../context/contextProvider'

const Providers = ({navigation}) => {
    return(
        <ContextProvider>
        <Routes />
        </ContextProvider>
    )
}

export default Providers;