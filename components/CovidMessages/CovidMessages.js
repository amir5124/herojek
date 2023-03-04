import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CovidMessages = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Traver only if neccessary
            </Text>
            <Text style={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit ipsum non temporibus exercitationem fugiat neque inventore facilis voluptatem labore rerum!
            </Text>
        </View>
    )
}

export default CovidMessages;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#21CBC0',
        padding: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Montserrat Regular 400',
        marginBottom: 10,
    },
    text: {
        color: '#FFF',
        fontSize: 15,
        fontFamily: 'Montserrat Regular 400',
        marginBottom: 10,
    },
    learnmore: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Montserrat Regular 400',
    }
});