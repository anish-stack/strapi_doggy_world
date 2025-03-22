import { useNavigation } from '@react-navigation/native';
import React, { useState, useCallback, useRef } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function Card({ data }) {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const pressCount = useRef(0);
    const lastPressTime = useRef(0);

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

    const handlePress = useCallback(() => {
        // Track press count and time
        pressCount.current += 1;
        const now = Date.now();
        const timeSinceLastPress = now - lastPressTime.current;
        lastPressTime.current = now;

        console.log(`===== PRESS DEBUG =====`);
        console.log(`Press #${pressCount.current} detected on "${data.title}" card`);
        console.log(`Time since last press: ${timeSinceLastPress}ms`);
        console.log(`Current loading state: ${loading}`);

        if (loading) {
            console.log(`Press ignored - component is in loading state`);
            return;
        }

        console.log(`Setting loading to true`);
        setLoading(true);

        const route = navigationRoutes[data.title] || "Category_Screens";
        const params = route === "Category_Screens" ? { item: data.title } : undefined;

        console.log(`Route selected: ${route}`);
        console.log(`Params: ${JSON.stringify(params)}`);
        console.log(`Setting timeout for navigation...`);

        const navigateTimeout = setTimeout(() => {
            console.log(`Timeout fired after 300ms`);
            console.log(`Navigating to ${route}`);

            try {
                navigation.navigate(route, params);
                console.log(`Navigation completed successfully`);
            } catch (error) {
                console.error(`Navigation error: ${error.message}`);
            }

            console.log(`Setting loading to false`);
            setLoading(false);
        }, 300);

        return () => {
            console.log(`Cleanup function called - clearing timeout`);
            clearTimeout(navigateTimeout);
        };
    }, [data, loading, navigation]);

    return (
        <>

            <View style={styles.card}>
                {loading ? (
                    <ActivityIndicator size="small" color="#B32113" />
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            console.log(`TouchableOpacity onPress triggered for "${data.title}"`);
                            handlePress();
                        }}
                        style={{ opacity: loading ? 0.8 : 1 }}
                    >
                        <Image
                            source={{ uri: data.image.url }}
                            style={styles.image}
                            resizeMode="contain"
                            onError={() => console.error(`Image loading error for ${data.title}`)}
                        />
                    </TouchableOpacity>
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