import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import FetchLocation from '../components/FetchLocation';
import UsersMap from '../components/UsersMap';
import { Input } from '../components/Input';
import firebaseApp from '../components/FirebaseSetup';
import SignIn from './SignInScreen';
import { HomeBtn } from '../components/HomeBtn';
import { ButtonReg } from '../components/ButtonReg';
import { ButtonLog } from '../components/ButtonLog';
import Modal from "react-native-modal";
import RNGooglePlaces from 'react-native-google-places';

class HomeScreen extends React.Component {
  state = {
    userLocation: null,
    usersPlaces: [],
    distance: 0,
    isModalVisible: false,
  }

  componentDidMount() {
    this.getUserLocationHandler();
    //this.getUserPlacesHandler();
  }

  getDistanse = (lat1, lon1, lat2, lon2) => {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a));
  }

  helper = (distance) => {

    var reply = (distance < 1) ? 'You went ' + Math.round(distance * 100) / 100 + ' km' + ', near-' + Math.round(distance * 1500 * 100) / 100 + ' steps. ' + 'You move very little!! We recommend going to the park or riding a bike' :
      (distance < 4) ? 'You went ' + Math.round(distance * 100) / 100 + ' km' + ', near-' + Math.round(distance * 1500 * 100) / 100 + ' steps. ' + 'Hi you are not moving enough. Swimming pool or footbal maybe ?' :
        (distance < 7) ? 'You went ' + Math.round(distance * 100) / 100 + ' km' + ', near-' + Math.round(distance * 1500 * 100) / 100 + ' steps. ' + 'Hi you move enough! If you want more activity go to the ice rink and eat pizza' :
          'You went ' + Math.round(distance * 100) / 100 + ' km' + ', near-' + Math.round(distance * 1500 * 100) / 100 + ' steps. ' + 'WOW! You need rest. Please go in some calm place. Eat somethin and relax';

    return reply;
  }


  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  getUserLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0421
        }
      });
      let tempDate = new Date();
      fetch('https://my-project-1521996125333.firebaseio.com/placesUsers.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          currentUser: firebaseApp.auth().currentUser.email,
          userDate: tempDate.toDateString(),
        })
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }, err => console.log(err));
  }

  getUserPlacesHandler = () => {
    fetch('https://my-project-1521996125333.firebaseio.com/placesUsers.json')
      .then(res => res.json())
      .then(parsedRes => {
        let tempDate = new Date();
        const placesArray = [];
        for (const key in parsedRes) {
          if ((firebaseApp.auth().currentUser.email ===
            (parsedRes[key].currentUser) && (parsedRes[key].userDate === tempDate.toDateString()))) {
            placesArray.push({
              latitude: parsedRes[key].latitude,
              longitude: parsedRes[key].longitude,
              userDate: parsedRes[key].userDate,
              id: key
            });
          }
        }
        let distOneDay = 0;
        for (let i = 0; i < placesArray.length - 2; i++) {
          let tmp = 0;
          tmp = this.getDistanse(placesArray[i].latitude, placesArray[i].longitude, placesArray[i + 1].latitude, placesArray[i + 1].longitude);
          distOneDay += tmp;
        };

        this.setState({
          usersPlaces: placesArray,
          distance: distOneDay,
        });
        console.log(this.state.usersPlaces);
        console.log(this.state.distance);
        console.log(this.helper(this.state.distance));
      })
      .catch(err => console.log(err));
  }


  nerbyPos = () => {
    //  let tmpLat = 0.0;
    //  let tmpLon = 0.0;
    // RNGooglePlaces.getCurrentPlace()
    // .then((results) => {
    //   tmpLat = results.latitude;
    //   tmpLon = results.longitude;
    //   console.log(results)})
    // .catch((error) => console.log(error.message));

    // console.log(this.state.userLocation.latitude);


    var place = (this.state.distance < 1) ? 'park' :
    (this.state.distance < 4) ?'swimming pool':
    (this.state.distance < 7) ? 'pizza':
    'cinema';

    console.log(this.state.distance);
    console.log(place);
  
    RNGooglePlaces.getAutocompletePredictions(place, {
      //  type: 'establishments',
      latitude: this.state.userLocation.latitude,
      longitude: this.state.userLocation.longitude,
      radius: 10
    })
      .then((place) => {
        const bestPlaces = [];
        for (const key in place) {
          bestPlaces.push({
            placeID: place[key].placeID,
            id: key
          });
        }
        console.log(place);
        const tmoPlaces = [];

        for (const key in bestPlaces) {
          RNGooglePlaces.lookUpPlaceByID(bestPlaces[key].placeID)
            .then((results) => {
              tmoPlaces.push({
                latitude: results.latitude,
                longitude: results.longitude,
                id: key
              });
            })
            .catch((error) => console.log(error.message));
        }
        console.log(tmoPlaces);
        this.setState({
          usersPlaces: tmoPlaces,
        });
        // console.log(tmoPlaces);
        //console.log(usersPlaces);
      });

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

          <HomeBtn onPress={() => this.getUserPlacesHandler()}>Get User places</HomeBtn>
          <HomeBtn onPress={this._toggleModal}>Get recomendation</HomeBtn>
          {/* <HomeBtn onPress={()=>this.props.navigation.navigate('ModalExample')}>Get User Places</HomeBtn>  */}

          {/* <View style={{ flex: 1 }}> */}
          {/* <TouchableOpacity onPress={this._toggleModal}>
          <Text>Show Modal</Text>
        </TouchableOpacity> */}

          <Modal
            backdropColor={'#FFF'}
            backdropOpacity={1}
            animationIn={'slideInLeft'}
            animationOut={'slideOutRight'}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}

            isVisible={this.state.isModalVisible}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>{this.helper(this.state.distance)}</Text>
              {/* <TouchableOpacity onPress={this._toggleModal}>
              <Text>{this.reply(this.state.distance)}</Text>
            </TouchableOpacity> */}
              {/* <ButtonReg style={{ justifyContent: 'flex-end' }} onPress={this._toggleModal}>Hide modal!</ButtonReg> */}
              
              <ButtonLog style={{ justifyContent: 'flex-end' }} onPress={() => this.nerbyPos()}>Show recomendation on map</ButtonLog>
              <ButtonReg style={{ justifyContent: 'flex-end' }} onPress={this._toggleModal}>Hide modal... .</ButtonReg>

            </View>
          </Modal>
          {/* </View>  */}
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerButton: {
    width: '100%',
    height: '15%',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#038387',
    padding: 0,
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 4,
    borderColor: '#00B7C3',
  },
  modalText: {
    color: '#4C4A48',
    fontSize: 18,
    fontWeight: '700',
  },

});
export default HomeScreen;
