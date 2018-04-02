import React from 'react';
import {StyleSheet, Text, TouchableOpacity } from 'react-native';

const ButtonReg =({onPress, children}) =>{
    return(
       <TouchableOpacity onPress={onPress} style={styles.buton}>
       <Text style={styles.text}>{children}</Text>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buton:{
        
      marginTop:10,
      padding:20,
      width: '100%',
      backgroundColor: '#2D7D9A',
      alignItems:'center',  
    },
    text:{
        color:'white',
        fontWeight: '700',
        fontSize:18,
    }
});

export{ButtonReg};