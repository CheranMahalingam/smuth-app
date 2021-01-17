import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from "../config";

const coordinates = [
  {
      latitude: 37.798790,
      longitude: -122.442753
  },
  {
      latitude: 37.790651,
      longitude: -122.442497

  },

];

class MapScreen extends React.Component {
  render() {
    return (
      <MapView initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421}}
         style={{ flex: 1 }}
         showsUserLocation
>

  <MapView.Marker coordinate={coordinates[0]}/>
  <MapView.Marker coordinate={coordinates[1]}/>
      <MapViewDirections
      origin={coordinates[0]}
      destination={coordinates[1]}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
      strokeColor = "black"
    />
</MapView>
    );
  }
}
export default MapScreen



