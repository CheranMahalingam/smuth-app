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
            <Text>{`\n`}</Text>
            <Text>{`\n`}</Text>
            <Text style={styles.arrival}>{`      `}{props.arrival}</Text>
                
            
            </Text> 
            
             
            
        </View>
            
        
    )

}
const spaceBeforeDuration = `       `
const spaceAfterDuration = `                                `

const styles = StyleSheet.create({
    container:{
        marginTop: 5,
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
        paddingTop: 10
    },

    rec:{
        color: 'white',
        backgroundColor: '#556995',
        marginBottom: 20,
    },

    distance:{
        marginBottom: 10,
        marginTop: 10,
    }

})