import React from 'react';
import{View,StyleSheet} from 'react-native';
import MapView from 'react-native-maps'

const UsersMap = props =>{
    let userLocationMarker = null;

    if(props.userLocation){
        userLocationMarker = <MapView.Marker coordinate={props.userLocation}/>;
    }
    userMarkers = props.usersPlaces.map(userPlace => (
    <MapView.Marker coordinate = {userPlace} key={userPlace.id}/>
    ));
return(
<View style={styles.mapContainer}>
    <MapView    
    initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0622,
        longitudeDelta: 0.0421,
      }}
      region={props.userLocation}    
    style={styles.map}>
    {userLocationMarker}
    {userMarkers}
    </MapView>
</View>
);
};

const styles = StyleSheet.create({
mapContainer:{
    width: '100%',
    height: '85%',
    // marginTop:'25%',
},
map:{
    width:'100%',
    height:'100%'
}
});

export default UsersMap;