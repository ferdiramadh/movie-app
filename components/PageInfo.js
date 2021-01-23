import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity} from 'react-native';

const PageInfo = ({pageInfo, handleNextPage,handlePrevPage,result}) => {
    return (
        <View style={styles.container}>
        
        <Text>Page : {pageInfo.page}</Text>
       
        {pageInfo.page == '1' ?  null : <TouchableOpacity onPress={handlePrevPage}>
             <Text>Prev</Text>
        </TouchableOpacity> }
        {result.length !== 0 ? <TouchableOpacity onPress={handleNextPage}>
            <Text>Next</Text>
        </TouchableOpacity> : null}
        <View>
            <Text>TotalResult: {pageInfo.movieResult}</Text>
            
        </View>
        </View>
    )
}

export default PageInfo

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height: 30,
        backgroundColor:'grey',
        width:'100%',
        justifyContent:'space-around',
        padding:5,
        position:'absolute',
        top:0
    }
})
