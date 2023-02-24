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
                   Mau kemana?
               </Text>

               <View style={styles.timeContainer}>
               <MaterialIcons name={'schedule'} size={25} color={'#535353'} />
                   <Text>Now</Text>
                   <MaterialIcons name={'keyboard-arrow-down'} size={16} />
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
                  <View style={[styles.iconContainer, {backgroundColor: '#2b88ff',}]}>
                  <MaterialIcons name={'location-on'} size={25} color={'#fff'}/>
                  </View>
                  <Text style={styles.destination}>
                      Spin Nightclub
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
        width: 100,
        padding: 10,
        backgroundColor: '#fff',
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