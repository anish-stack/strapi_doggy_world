import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, Image, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

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

    const handleNavigation = () => {
        if (loading) return;
        
        setLoading(true);
        
        const route = navigationRoutes[data.title] || "Category_Screens";
        const params = route === "Category_Screens" ? { item: data.title } : undefined;
        
        // Simple direct navigation without timeout to improve reliability
        navigation.navigate(route, params);
        
        // Keep a short delay before allowing another press
        setTimeout(() => {
            setLoading(false);
        }, 300);
    };

    return (
        <>
            <View style={styles.card}>
                {loading ? (
                    <ActivityIndicator size="small" color="#B32113" />
                ) : (
                    <Pressable
                        onPress={handleNavigation}
                        style={({ pressed }) => [
                            styles.pressable,
                            { opacity: pressed ? 0.7 : 1 }
                        ]}
                        android_ripple={{ color: '#f0f0f0', borderless: true }}
                    >
                        <Image
                            source={{ uri: data.image.url }}
                            style={styles.image}
                            resizeMode="contain"
                            onError={() => console.error(`Image loading error for ${data.title}`)}
                        />
                    </Pressable>
                )}
            </View>
            <Text style={styles.cardTitle}>{data.title || "Category Title"}</Text>
        </>
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
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },
    pressable: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    image: {
        width: 50,
        height: 50,
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