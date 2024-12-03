import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');


const images = [
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
        <View style={styles.container}>
            <View style={styles.imageContainer} {...panResponder.panHandlers}>
                <Image source={images[activeIndex].src} style={styles.image} />
                {/* <View style={styles.navigation}>
                    <TouchableOpacity 
 activeOpacity={0.9}onPress={goToPrevious} style={styles.navButton}>
                        <Icon name="chevron-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity 
 activeOpacity={0.9}onPress={goToNext} style={styles.navButton}>
                        <Icon name="chevron-forward" size={30} color="#fff" />
                    </TouchableOpacity>
                </View> */}
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
        height: 180,
        // borderWidth:2,
        overflow: 'hidden',
        top: 0,
        position: 'relative',
        // marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
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
