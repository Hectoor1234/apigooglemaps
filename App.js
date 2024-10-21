import * as React from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View } from 'react-native';
import MapView,{Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY } from '@env';
const carImage = require('./assets/image/car.png')
export default function App() {

  const [origin, setOrigin ] = React.useState({
    latitude: 32.426543,
    longitude:-114.769457


  });

  const [destination, setDestination ] = React.useState({
    latitude: 32.4371735,
    longitude:-114.7163219
  });

  React.useEffect (()=> {
    getLocationPermission();
  }, [])
  
  async function getLocationPermission(){
    let {status}= await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      alert('Permission denied');
      return;
    }
    let location = await Location.getBackgroundPermissionsAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }



  return (
    <View style={styles.container}>
      <MapView 
      style={styles.map}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        longitudeDelta: 0.09,
        latitudeDelta: 0.04
      }}
      >
        <Marker draggable
        coordinate={origin}
        image={carImage}
        onDragEnd={(direction)=>setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker draggable
        coordinate={destination}
        onDragEnd={(direction)=>setDestination(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_KEY}
        strokeColor='blue'
        strokeWidth={6}
        />
        <Polyline
          coordinates={[origin,destination] }
          strokeColor='blue'
          strokeWidth={6}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
