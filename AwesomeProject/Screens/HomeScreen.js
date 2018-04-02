import React from 'react';
import { View,Text,StyleSheet,Button,TouchableOpacity } from 'react-native';
import FetchLocation from '../components/FetchLocation';
import UsersMap from '../components/UsersMap';
import {Input} from '../components/Input';
import firebaseApp from '../components/FirebaseSetup';
import SignIn from './SignInScreen';
import {HomeBtn} from '../components/HomeBtn';
import {ButtonReg} from '../components/ButtonReg';
import Modal from "react-native-modal";

class HomeScreen extends React.Component {
    state = { 
        userLocation:null,
        usersPlaces:[],
        distance:0,
        isModalVisible: false,
     }

componentDidMount(){
this.getUserLocationHandler();
//this.getUserPlacesHandler();
}

getDistanse = (lat1, lon1,lat2, lon2) =>{
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
  var dLon = (lon2 - lon1) * Math.PI / 180;
  var a = 
     0.5 - Math.cos(dLat)/2 + 
     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
     (1 - Math.cos(dLon))/2;

  return R * 2 * Math.asin(Math.sqrt(a));
}

_toggleModal = () =>
this.setState({ isModalVisible: !this.state.isModalVisible });

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
          let tempDate = new Date();       
          fetch('https://my-project-1521996125333.firebaseio.com/placesUsers.json',{
        method:'POST',
        body:JSON.stringify({
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          currentUser:firebaseApp.auth().currentUser.email,
          userDate:tempDate.toDateString(),
        })
          })
          .then(res => console.log(res))
          .catch(err=> console.log(err));
        },err => console.log(err));
        }
        
        getUserPlacesHandler=()=>{
          fetch('https://my-project-1521996125333.firebaseio.com/placesUsers.json')
          .then(res => res.json())
          .then(parsedRes => {
            let tempDate = new Date();
            const placesArray = [];
            for(const key in parsedRes){
             if((firebaseApp.auth().currentUser.email === 
             (parsedRes[key].currentUser)&&(parsedRes[key].userDate===tempDate.toDateString()))){
                placesArray.push({
                  latitude: parsedRes[key].latitude,
                  longitude: parsedRes[key].longitude,
                  userDate:parsedRes[key].userDate,
                  id: key
                });
              }
          }
          let distOneDay = 0;
          for(let i = 0; i<placesArray.length-2; i++){
          let tmp = 0;
           tmp = this.getDistanse(placesArray[i].latitude,placesArray[i].longitude,placesArray[i+1].latitude,placesArray[i+1].longitude);
           distOneDay+=tmp;
          };
         
            console.log(distOneDay);
            
          this.setState({
            usersPlaces:placesArray,
            distance:distOneDay,
          });
          console.log(this.state.usersPlaces);
          console.log(this.state.distance);
          })
          .catch(err=> console.log(err));
        }


    render() {
        return (
            <View style={styles.container}>
               
              <UsersMap 
              userLocation={this.state.userLocation}
              usersPlaces={this.state.usersPlaces}
              />

             <View style={styles.containerButton}>
                {/* <Button title="Get User Places" onPress=
                {this.getUserPlacesHandler}/>
                <FetchLocation onGetLocation={this.getUserLocationHandler}/> */}
                
                <HomeBtn onPress={()=>this.getUserLocationHandler()}>Get User Location</HomeBtn> 
                <HomeBtn onPress={this._toggleModal}>Get User Places</HomeBtn> 
                {/* <HomeBtn onPress={()=>this.props.navigation.navigate('ModalExample')}>Get User Places</HomeBtn>  */}

       {/* <View style={{ flex: 1 }}> */}
        {/* <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity> */}
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>{this.state.distance}</Text>
            <TouchableOpacity onPress={this._toggleModal}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      {/* </View>  */}

                </View>
              </View>  
        );
    }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerButton:{
    width: '100%',
    height: '15%',
    flex: 1,
    flexDirection: 'row',
    backgroundColor:'#038387',
    padding:0,
    margin:0,
  },

  
  });
export default HomeScreen;
