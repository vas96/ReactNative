import React from 'react';
import { View,Text,StyleSheet,AppRegistry,Image } from 'react-native';
import {Input} from '../components/Input';
import {ButtonReg} from '../components/ButtonReg';
import {ButtonLog} from '../components/ButtonLog';
import firebaseApp from '../components/FirebaseSetup';
//import {LogoImg} from '../components/LogoImg';



class SignUp extends React.Component {
    state = {  
        email: '',
        password: '',
    }

    componentWillMount(){
        firebaseApp;
      }

    signUp = () =>{
        firebaseApp.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(res => console.log(res))
        .then(() => this.props.navigation.navigate('HomeScreen'))
        .catch(err=> console.log(err),err => console.log(err))
      }

    render() {
        
        return (
            <View style={styles.container}>
                 {/* <Image
                style = {styles.logo}
                source={require('../images/logo3.jpg')}
                >            
                </Image> */}
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
          <ButtonReg onPress={()=>this.signUp()}>Sign Up</ButtonReg>
          <ButtonLog onPress={() => this.props.navigation.navigate('SignInScreen') }>
          Go to log in</ButtonLog>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#FFF',
      },
    logo:{
        marginTop:10,
        marginBottom:10,
        marginLeft:150,
        width: 100,
        height: 100,   
    }
})

export default SignUp;