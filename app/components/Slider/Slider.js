import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');


const images = [
    // { id: 3, src: require('../../assets/slider/doggy-world.jpg') },
    { id: 1, src: require('../../assets/slider/banner.webp') },
    { id: 2, src: require('../../assets/slider/slider-doggy-world1.webp') },
];

export default function CustomSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const goToNext = () => {
        if (activeIndex < images.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) => {
            const { dx } = gestureState;
            return Math.abs(dx) > 20; // Detect horizontal swipe
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

    return (
        <View >
            <View style={styles.imageContainer} {...panResponder.panHandlers}>
                <Image source={images[activeIndex].src} style={styles.image} />

            </View>

            <Text style={styles.counter}>
                {activeIndex + 1}/{images.length}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({

    imageContainer: {
        width: width,
        height: 200,
        backgroundColor: "#fff",
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
        // marginVertical: 10,
    },
    navButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 30,
        margin: 12,
        padding: 2,
        alignItems: 'center',
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 35,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    dot: {
        fontSize: 24,
        marginHorizontal: 5,
        color: '#000',
    },
    counter: {
        color: '#fff',
        marginTop: 10,
    },
});
