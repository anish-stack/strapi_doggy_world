import { View, Text, TouchableOpacity, Linking, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import UpperLayout from '../../layouts/UpperLayout';
import CustomSlider from '../Services/Bakery/Slider';
import GroomingServices from './GroomingServices';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Grooming() {
    const images = [
        { id: 1, src: require('./pet.png') },
        { id: 2, src: require('./pet2.jpg') },
    ];

    const handleCallPress = () => {
        const phoneNumber = 'tel:7217619794';
        Linking.openURL(phoneNumber);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>


            <View style={styles.container}>
                <UpperLayout title={"Dog Grooming"} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                    <CustomSlider autoPlay={true} navigationShow={true} Dealy={3000} imagesByProp={images} />

                    <View style={styles.infoContainer}>
                        <Text style={styles.openText}>
                            Open: <Text style={styles.timeText}>10:00 AM - 9:00 PM</Text>
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.9} onPress={handleCallPress} style={styles.buttonContainer}>
                            <Text style={styles.confusedText}>Confused? Call Now</Text>
                        </TouchableOpacity>
                    </View>


                    <GroomingServices />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    openText: {
        fontSize: 14,
        color: '#333',
    },
    timeText: {
        fontWeight: 'bold',
        color: '#B32113',
    },
    confusedText: {
        fontSize: 14,
        textDecorationLine: 'underline',
        textDecorationColor: "#B32113",
        color: '#B32113',
        paddingHorizontal: 5,
        paddingVertical: 3,
        textAlign: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 16,
    },
});
