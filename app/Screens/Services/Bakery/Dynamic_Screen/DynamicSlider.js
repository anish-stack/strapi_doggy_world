import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function DynmaicSlider({ autoPlay, Dealy, isUri = false, imagesByProp, navigationShow, heightPass = 200, mainWidth = '100%', mode = 'cover' }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = imagesByProp[0]?.src || [];


    const goToNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevious = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Autoplay effect
    useEffect(() => {
        if (autoPlay) {
            const interval = setInterval(() => {
                goToNext();
            }, Dealy);

            return () => clearInterval(interval);
        }
    }, [autoPlay, Dealy]);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            const { dx } = gestureState;
            return Math.abs(dx) > 20;
        },
        onPanResponderMove: (_, gestureState) => {
            const { dx } = gestureState;
            if (dx > 50) {
                goToPrevious();
            } else if (dx < -50) {
                goToNext();
            }
        },
    });

    // Check if images array is empty or not
    if (images.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No images available</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={[styles.imageContainer, { height: heightPass, width: mainWidth }]} {...panResponder.panHandlers}>
                {isUri ? (

                    <Image source={{ uri: String(images[activeIndex]) }} style={[styles.image, { resizeMode: mode }]} />
                ) : (

                    <Image source={images[activeIndex]} style={styles.image} />
                )}
                {navigationShow && (
                    <View style={styles.navigation}>
                        <TouchableOpacity
                            activeOpacity={0.9} onPress={goToPrevious} style={styles.navButton}>
                            <Icon name="chevron-back" size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.9} onPress={goToNext} style={styles.navButton}>
                            <Icon name="chevron-forward" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        alignItems: 'center',
    },
    imageContainer: {

        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
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
        borderRadius: 30,
        margin: 12,
        padding: 2,
        alignItems: 'center',
    },
});
