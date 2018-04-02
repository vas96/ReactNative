import React from 'react';
import {Button} from "react-native";
import{View,StyleSheet} from 'react-native';
 
const fetchLocation = props => {
return(
    <Button title ="Get Location"  
    onPress={props.onGetLocation}
    style={styles.button}
    />
 );
};

const styles = StyleSheet.create({
    button:{
      marginTop:1,
      width: '50%',
      height:999,
      backgroundColor: '#2D7D9A',
      alignItems:'center', 
    },
    
    });

export default fetchLocation;