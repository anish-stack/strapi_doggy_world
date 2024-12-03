import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function LocationTab({ data }) {

    return (
        <View style={styles.container}>
            <View style={styles.locationInfo}>
                <Icon name="location-outline" size={24} color="#fff" />
                {/* <Text style={styles.locationText}>{data?.address?.city}, {data?.address?.postalCode}</Text> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B32113',
        padding: 5,

    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 10, // Space between icon and text
    },
});
