import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import {Input} from '../components/Input'
import {ButtonReg} from '../components/ButtonReg';
import {ButtonLog} from '../components/ButtonLog';
import firebaseApp from '../components/FirebaseSetup';

class SignIn extends React.Component {
    state = {  
        email: 'vas@gmail.com',
        password: '1234567',
    }

    componentWillMount(){
        firebaseApp;
      }

      signIn = () =>{
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(res => console.log(res))
        .then(() => this.props.navigation.navigate('HomeScreen'))
        .catch(err=> console.log(err),err => console.log(err))
      }

    render() {

        return (
            <View style={styles.container}> 

            <Input       
          placeholder = 'Enter your email ...'
          label = 'Email'
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}      
          /> 
          
            <Input
          placeholder = 'Enter your password ...'
          label = 'Password'
          secureTextEntry
          onChangeText = {password => this.setState({password})}
          value = {this.state.password}
          />

          <ButtonLog onPress={()=>this.signIn()}>Log in with email</ButtonLog>
          <ButtonReg onPress={()=>this.props.navigation.navigate('SignUpScreen')}>Go to sign up</ButtonReg>

          <Text style={styles.textUnderButtom}>Forgot password ?</Text>

          </View>
        )
    }
}

const styles = StyleSheet.create({
  textUnderButtom:{
      fontFamily: 'Cochin',
      marginTop:10,
      color: '#0099BC',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor:'#FFF',
    width: '100%',
    height: '100%',
  }, 
})
export default SignIn;