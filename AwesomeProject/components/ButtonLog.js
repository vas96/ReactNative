import React from 'react';
import {StyleSheet, Text, TouchableOpacity } from 'react-native';

const ButtonLog =({onPress, children}) =>{
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
      backgroundColor: '#0099BC',
      alignItems:'center',  
    },
    text:{
        color:'white',
        fontWeight: '700',
        fontSize:18,
    }
});

export{ButtonLog};