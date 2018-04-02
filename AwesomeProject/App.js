/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import {StackNavigator,} from 'react-navigation';
// import * as firebase from 'firebase';

import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';
import {Input} from './components/Input';
import {ButtonReg} from './components/ButtonReg';

 import SignUpScreen from './Screens/SignUpScreen';
 import SignInScreen from './Screens/SignInScreen';
 import HomeScreen from './Screens/HomeScreen';
 import PreviewScreen from './Screens/PreviewScreen';

import firebaseApp from './components/FirebaseSetup';
import { ModalExample } from './Screens/ModalScreen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


type Props = {};
export default class App extends Component<Props> {

  state={
    userLocation:null,
    usersPlaces:[],
    authenticating:false,
    email: '',
    password: '',
    response: '',
  }
  // constructor(props) {
  //   super(props)
  
  //   this.state = {userLocation:null},
  //   this.state = {usersPlaces:[]},
  //   this.state = {authenticating:false},
  
  //       this.state = {email: ''},
  //       this.state = {password: ''},
  //       this.state = {response: ''}

  // }

// componentWillMount(){
//   const firebaseConfig = {
//     apiKey: "AIzaSyDHKxUR28jvWxKKVPEIEi970zdDRPRqYwA",
//     authDomain: "my-project-1521996125333.firebaseapp.com",
//     databaseURL: "https://my-project-1521996125333.firebaseio.com",
//     projectId: "my-project-1521996125333",
//     storageBucket: "my-project-1521996125333.appspot.com",
//     messagingSenderId: "907758163261",
//   }
//   firebase.initializeApp(firebaseConfig);
// }

componentWillMount(){
  firebaseApp;
}

async signUp2(){
  try{
    await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    this.setState({
      response:'account created!'
    })
    // setTimeout(()=>{
    // this.props.navigator.push({
    //   id:'App'
    // })
    // },1500)
  } 
  catch(err){
    this.setState({
      response: err.toString()      
    })
  }
}

async register(){
  console.log("ololo");
  console.log(this.state.password+" pass");
  console.log(this.state.email+" email" );
  firebase.auth().createUserWithEmailAndPassword("anyvas221@gmail.com",this.state.password)
  .then(res => console.log(res))
  .catch(err=> console.log(err),err => console.log(err));
}



signUp = () =>{
  firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
  .then(res => console.log(res))
  .catch(err=> console.log(err),err => console.log(err))
}

logIn = () =>{
  firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
  .then(res => console.log(res))
  .catch(err=> console.log(err),err => console.log(err))
}

signOut = () =>{
  firebase.auth().signOut()
  .then(res => console.log(res))
  .catch(err=> console.log(err),err => console.log(err))
}

getUserLocationHandler = () =>{
navigator.geolocation.getCurrentPosition(position =>{
  this.setState({
    userLocation:{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,
      latitudeDelta: 0.0622,
      longitudeDelta: 0.0421
    }
  });
  fetch('https://my-project-1521996125333.firebaseio.com/places.json',{
method:'POST',
body:JSON.stringify({
  latitude:position.coords.latitude,
  longitude:position.coords.longitude,
})
  })
  .then(res => console.log(res))
  .catch(err=> console.log(err));
},err => console.log(err));
}

getUserPlacesHandler=()=>{
  fetch('https://my-project-1521996125333.firebaseio.com/places.json')
  .then(res => res.json())
  .then(parsedRes => {
    const placesArray = [];
    for(const key in parsedRes){
      placesArray.push({
        latitude: parsedRes[key].latitude,
        longitude: parsedRes[key].longitude,
        id: key
      });
  }
  this.setState({
    usersPlaces:placesArray
  });
  })
  .catch(err=> console.log(err));
}

onPressSignIn(){
  this.setState({
    authenticating:true,
  })
}

renderSignUp(){
  if(this.state.authenticating){
    return(
      <View style={styles.form}>
      <ActivityIndicator size='large'/>
      </View>
    )
  }
  return(
    <View style={styles.form}>   
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
    <ButtonReg onPress={()=>this.signUp()}>signUp</ButtonReg>
    </View>
  )
}
renderSignIn(){
  if(this.state.authenticating){
    return(
      <View style={styles.form}>
      <ActivityIndicator size='large'/>
      </View>
    )
  }
  return(
    <View style={styles.form}>   
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
    <ButtonReg onPress={()=>this.signUp()}>signUp</ButtonReg>
    </View>
  )
}
renderMap(){
  <View>
  <View style={{marginBottom: 20}}>
      <Button title="Get User Places" onPress=
      {this.getUserPlacesHandler}/>
      </View>
     <FetchLocation onGetLocation={this.getUserLocationHandler}/>
    <UsersMap 
    userLocation={this.state.userLocation}
    usersPlaces={this.state.usersPlaces}
    />
    </View>
}

render() {
    return (
     
    //   <View style={styles.container}>
       <AppNavigator/>
    //   <View style={{marginBottom: 20}}>
    //   {/* <Button title="Get User Places" onPress=
    //   {this.getUserPlacesHandler}/> */}
    //   <Button title="Test"   onPress={() =>
    //       navigator.push('LoginScreen')
    //     }/>


    //   </View>
    //  {/* <FetchLocation onGetLocation={this.getUserLocationHandler}/> */}
    // <UsersMap 
    // userLocation={this.state.userLocation}
    // usersPlaces={this.state.usersPlaces}
    // />
    // {/* {this.renderMap()} */}
    
    //   </View>
    );
  }
}

const AppNavigator = StackNavigator({
   PreviewScreen: { screen: PreviewScreen },
   SignUpScreen: { screen: SignUpScreen },
   SignInScreen: { screen: SignInScreen },
   HomeScreen: { screen: HomeScreen },
   ModalExample: { screen: ModalExample },   
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  form: {
    flex: 1,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
