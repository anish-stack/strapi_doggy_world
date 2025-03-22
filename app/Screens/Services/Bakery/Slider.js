import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, PanResponder } from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CustomSlider({ autoPlay, Dealy, isUri = false, imagesByProp = [], navigationShow }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = imagesByProp;

    const goToNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevious = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (autoPlay && images.length > 0) {
            const interval = setInterval(goToNext, Dealy);
            return () => clearInterval(interval);
        }
    }, [autoPlay, Dealy, images.length]);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 20,
        onPanResponderEnd: (_, gestureState) => {
            if (gestureState.dx > 50) goToPrevious();
            else if (gestureState.dx < -50) goToNext();
        },
    });

    if (images.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.noImageText}>No images available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer} {...panResponder.panHandlers}>
                <Image 
                    source={isUri ? { uri: String(images[activeIndex]?.src) } : images[activeIndex]?.src}
                    style={styles.image}
                />
                {navigationShow && (
                    <View style={styles.navigation}>
                        <TouchableOpacity onPress={goToPrevious} style={styles.navButton}>
                            <Icon name="chevron-back" size={moderateScale(15)} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goToNext} style={styles.navButton}>
                            <Icon name="chevron-forward" size={moderateScale(15)} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = ScaledSheet.create({
    container: {
        alignItems: 'center',
        marginTop: '0@ms',
    },
    imageContainer: {
        width: '100%',
        height: '180@ms',
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    navigation: {
        position: 'absolute',
        top: '30%',
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '30@ms',
        margin: '12@ms',
        padding: '5@ms',
        alignItems: 'center',
    },
    noImageText: {
        fontSize: '16@ms',
        color: '#555',
    },
});