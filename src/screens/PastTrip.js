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
            <Text style={styles.duration}>{spaceBeforeDuration}{props.duration} min {spaceAfterDuration} 
                <Text style={styles.bump}> {props.bump} bumps </Text>
            </Text>
             
            <Text style={styles.arrival}>{`      `}arrival: {props.arrival}</Text> 
            <Text style={styles.distance}>{spaceBeforeDuration}{props.distance} kms
                <Text > {`       `} <Text style={styles.rec}>{`  `}recommended route {` `}</Text>   </Text> 
                <Text>{`\n`}</Text>
            
            </Text> 
            
             
            
        </View>
            
        
    )

}
const spaceBeforeDuration = `       `
const spaceAfterDuration = `                                   `

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginBottom: 4,
        // paddingLeft: 140,
        // paddingRight: 140,
        backgroundColor: "#556995",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#556995',
        borderRadius: 10,
        
    },
    duration:{
        marginTop: 10,
        color: 'black',
        marginBottom: 10,
        fontSize: 14,
    },
    bump:{
        color: '#556995',
        fontSize: 14,
    },
    arrival:{
        fontSize: 17,
        marginBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    line:{
        color: 'grey'
    },
    rec:{
        color: 'white',
        backgroundColor: '#556995',
        marginBottom: 20,
    }







})