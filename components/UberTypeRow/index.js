import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UberTypeRow = (props) => {
    const { type } = props;

    const getImage = () => {
        if (type.type === 'LinkRide') {
            return require('../../assets/images/UberX.jpeg')
        }

        if (type.type === 'LinkX') {
            return require('../../assets/images/Comfort.jpeg')
        }


        return require('../../assets/images/UberXL.jpeg')

    }

    return (
        <View style={styles.container}>
            {/* images */}
            <Image
                style={styles.image}
                source={getImage()} />
            <View style={styles.middleContainer}>
                <Text style={styles.type}>
                    {type.type}{''}
                    <Ionicons name={'person'} size={12} />
                    3
                </Text>
                <Text style={styles.time}>
                    8.03 pm drop off
                </Text>
            </View>

            <View style={styles.rightContainer}>
                {/* <Ionicons name={'pricetag'} size={18} color={'#42d742'} /> */}
                <Text style={styles.price}>
                    Rp.{type.price}
                </Text>
            </View>

        </View>
    )
}

export default UberTypeRow;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        height: 70,
        width: 80,
        resizeMode: 'contain',
    },
    middleContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    type: {
        fontWeight: 'bold',
        fontSize: 18,
        fontFamily: 'Montserrat SemiBold 600',
        color: '#000',
        marginBottom: 5,
    },
    time: {
        color: '#5d5d5d',
    },
    rightContainer: {
        width: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 5,
        color: '#000',
    },

});