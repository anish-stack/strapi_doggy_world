import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function Card({ data }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    if (!data) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No Data Found</Text>
            </View>
        );
    }

    const navigationRoutes = {
        "Pet Bakery": "Bakery",
        "Consultation": "Consultation",
        "Pet Shop": "Pet_Shop",
        "Dog Grooming": "Grooming",
        "Physiotherapy": "Physiotherapy",
        "Vaccination": "vaccination",
        "Lab Test": "Lab",
        "Pharmacy": "Coming_soon",
        "Coming soon": "Coming_soon",
    };

    const handlePress = () => {
        setLoading(true);
        const route = navigationRoutes[data.title] || "Category_Screens";

        setTimeout(() => {
            navigation.navigate(route, route === "Category_Screens" ? { item: data.title } : undefined);
            setLoading(false);
        }, 500); // Delay to simulate loading
    };

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={handlePress} disabled={loading}>
            <View style={styles.card}>
                {loading ? (
                    <ActivityIndicator size="small" color="#00aaa9" />
                ) : (
                    <Image source={{ uri: data.image.url }} style={styles.image} resizeMode="contain" />
                )}
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
        justifyContent: 'center',
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
