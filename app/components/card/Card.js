import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';

export default function Card({ data }) {
    const navigation = useNavigation();

    if (!data) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No Data Found</Text>
            </View>
        );
    }

    const handlePress = () => {
        console.log("data",data.title)
        if (data.title === "Pet Bakery") {
            navigation.navigate('Bakery');
        } else if (data.title === 'Consultation') {
            navigation.navigate('Consultation');

        } else if (data.title === 'Pet Shop') {
            navigation.navigate('Pet_Shop');
        } else if (data.title === 'Dog Grooming') {

            navigation.navigate('Grooming');

        } else if (data.title === 'Physiotherapy') {
            navigation.navigate('Physiotherapy');
        }
        else if (data.title === 'Vaccination') {
            navigation.navigate('vaccination');
        }
        else if (data.title === 'Lab Test') {
            navigation.navigate('Lab');
        } else if (data.title === 'Coming soon') {
            navigation.navigate('Coming_soon');
        } else {
            navigation.navigate('Category_Screens', { item: data.title });
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9} onPress={handlePress}>
            <View style={styles.card}>
                <Image
                    source={{ uri: data.image.url }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.cardTitle}>{data.title || "Category Title"}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        marginLeft: 22,
        width: 70,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 4,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        margin: 8,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 10,
        borderRadius: 50,
    },
    cardTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000',
        textAlign: 'center',
    },
    noDataContainer: {
        alignItems: 'center',
        padding: 20,
    },
    noDataText: {
        color: '#888',
        fontSize: 16,
    },
});
