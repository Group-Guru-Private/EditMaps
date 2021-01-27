import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps'
const region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export default function App() {
  const [currentPositions, setCurrentPositions] = useState(region)

  // karena kita pakainya axios getById, yang navigator.geolocation ga perlu dijalankan. langsung setpositions aja dari DB
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(positions => {
      const {latitude, longitude} = positions.coords
      setCurrentPositions({
        ...currentPositions,
        latitude,
        longitude
      })
    })
  }, [])

  const changePositions = (e) => {
    console.log(e.nativeEvent)
    const {latitude, longitude} = e.nativeEvent.coordinate
    setCurrentPositions({
      ...currentPositions,
      latitude,
      longitude
    })
  }

  return (
    <View style={styles.container}>
      <MapView 
        region={currentPositions}
        style={{ width: 400, height: 400 }}
      >
        <Marker draggable
          coordinate={{ 
            latitude: currentPositions.latitude,
            longitude: currentPositions.longitude
          }}
          onDragEnd={changePositions}
        />
        </MapView>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
});
