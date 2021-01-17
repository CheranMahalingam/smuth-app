import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";



export default function PastTrip(props){
    return(
        <View style={styles.container}>
            <Text style={styles.duration}>{spaceBeforeDuration}{props.duration} minutes {spaceAfterDuration} 
                <Text style={styles.bump}> {props.bump} bumps </Text>
            </Text>
             
            
            <Text style={styles.distance}>{spaceBeforeDuration}{props.distance} km
                <Text > {`       `} <Text style={styles.rec}>{`  `}recommended route {` `}</Text>   </Text> 
                <Text>{'\n'}</Text>
            
            </Text> 
            <Text style={styles.arrival}>{`      `}{props.arrival}</Text> 
        </View>
    )

}
const spaceBeforeDuration = `       `
const spaceAfterDuration = `                                `

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        marginBottom: 5,
        // paddingLeft: 140,
        // paddingRight: 140,
        backgroundColor: "white",
        borderRadius: 10,
    },
    duration:{
        marginTop: 10,
        color: 'black',
        marginBottom: 10,
        fontSize: 14,
        fontWeight: "bold",
    },
    bump:{
        color: '#D28A7D',
        fontSize: 14,
        fontWeight: "bold",
    },
    arrival:{
        fontSize: 17,
        marginBottom: 10,
    },
    rec:{
        color: 'white',
        backgroundColor: '#FFCD9A',
        marginBottom: 20,
        borderRadius: 5,
    },

    distance:{
        marginBottom: 4,
         marginTop: 10,
    }







})