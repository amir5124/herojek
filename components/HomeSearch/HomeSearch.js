import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const HomeSearch = () => {
    const navigation = useNavigation();

    const goToSearch = () => {
        navigation.navigate('DestinationSearch')
    }
    return (
        <View>
           {/* input box */}
           <Pressable onPress={goToSearch} style={styles.inputBox}>
               <Text style={styles.inputText}>
                 Cari perawat atau caregiver...
               </Text>

               <View style={styles.timeContainer}>
               <MaterialIcons name={'add-circle-outline'} size={30} color={'#fff'} />
               </View>
           </Pressable>

            {/* prev destination */}
            <View style={styles.row}>
                  <View style={styles.iconContainer}>
                  <MaterialIcons name={'business-center'} size={25} color={'#fff'}/>
                  </View>
                  <Text style={styles.destination}>
                      Tempat Kerja
                  </Text>
              </View>


           {/* home destination */}
              <View style={styles.row}>
                  <View style={[styles.iconContainer, {backgroundColor: '#FBC531',}]}>
                  <MaterialIcons name={'location-on'} size={25} color={'#fff'}/>
                  </View>
                  <Text style={styles.destination}>
                      Rumah
                  </Text>
              </View>


        </View>
    )
}

export default HomeSearch;

const styles = StyleSheet.create({
    inputBox: {
        backgroundColor: '#E1E1E1',
        margin: 10,
        padding: 10,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        fontSize: 18,
        marginLeft: 10,
        fontWeight: '600',
        fontFamily: 'Montserrat Regular 400',
        color: '#6e6e6e',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        padding: 10,
        backgroundColor: '#21cbc0',
        borderRadius: 50,
    },
    row: {
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#dbdbdb',
    },
    iconContainer: {
        backgroundColor: '#b3b3b3',
        padding: 10,
        borderRadius: 25,
    },
    destination: {
        marginLeft: 10,
        fontWeight: '500',
        fontSize: 16,
    }
});