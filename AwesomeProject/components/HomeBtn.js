import React from 'react';
import {StyleSheet, Text, TouchableOpacity } from 'react-native';

const HomeBtn =({onPress, children}) =>{
    return(
       <TouchableOpacity onPress={onPress} style={styles.buton}>
       <Text style={styles.text}>{children}</Text>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buton:{
    marginTop:5,
    width: '50%',
    height:'100%',
    backgroundColor: '#0099BC',
    borderColor: '#FFF',
    borderWidth: StyleSheet.hairlineWidth, 
    flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        color:'white',
        fontWeight: '700',
        fontSize:18,
    }
});

export{HomeBtn};