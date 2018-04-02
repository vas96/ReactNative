import React from 'react';
import { View,Text,StyleSheet,AppRegistry,Image } from 'react-native';
import {Input} from '../components/Input';
import {ButtonReg} from '../components/ButtonReg';
import {ButtonLog} from '../components/ButtonLog';


class Preview extends React.Component {
    state = {  }
    render() {      
        return (
            <View style={styles.container}>
                <Image
                style = {styles.logo}
                source={require('../images/logo3.jpg')} >            
                </Image> 
                <Text style={styles.textUnderLogo}>Create your life more different</Text>          
          <ButtonReg onPress={()=>this.props.navigation.navigate('SignUpScreen')}>Sign up with email</ButtonReg>
          <ButtonLog onPress={() => this.props.navigation.navigate('SignInScreen') }>
          Log in with email</ButtonLog>
          <Text style={styles.textUnderButtom}>Privacy support and other stuff</Text>          
          </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor:'#FFF',
        width: '100%',
        height: '100%',
      },
    logo:{
        marginBottom:20,
        marginLeft:100,
        width: 200,
        height: 200,
    },
    textUnderLogo:{
        fontFamily: 'Cochin',
        marginBottom:30,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textUnderButtom:{
        fontFamily: 'Cochin',
        marginTop:10,
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export default Preview;