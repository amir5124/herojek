import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const PlaceRow = ({data}) => {
  return (
        <View style={styles.row}>
            <View style={styles.iconContainer}>
                {data.description === 'Rumah'
                ? <MaterialIcons name={'home'} size={25} color={'#fff'}/>
                : <MaterialIcons name={'location-on'} size={25} color={'#fff'}/>
                }
            </View>
            <Text style={styles.locationText}>
                {data.description || data.vicinity}
            </Text>
        </View>
  )
}

export default PlaceRow

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    iconContainer: {
        backgroundColor: '#a2a2a2',
        padding: 5,
        borderRadius: 50,
        marginRight: 15,
    },
    locationText: {

    },
    circle: {

    },
    square: {
        width: 15,
        height: 5,
        backgroundColor: '#000',
        position: 'absolute',
        top: 80,
        left: 10,
    }
   
})