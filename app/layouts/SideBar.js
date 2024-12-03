import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import user from '../assets/user.png';
import bg from '../assets/bg.jpg';
import arrow from '../assets/arrow.png';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function SideBar({ open }) {
    const naviagte = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const slideAnim = useRef(new Animated.Value(-width / 1.2)).current; // Initially hidden off-screen

    useEffect(() => {
        // Slide the sidebar in or out based on the `open` prop
        Animated.timing(slideAnim, {
            toValue: open ? 0 : -width / 1.2,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [open]);
    const handleLogin = () => {

        console.log('Login clicked');
        naviagte.navigate('register')
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.doggy.adsdigitalmedia.com/api/v1/Product/Get-All-category');
                const result = await response.json();
                setData(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <Animated.View style={[styles.sideBarContainer, { transform: [{ translateX: slideAnim }] }]}>
            <ImageBackground source={bg} style={styles.backgroundImage}>
                <View style={styles.userSide}>
                    <Text style={styles.greetingText}>Hi Pet Parent</Text>
                    <Image source={user} style={styles.userImage} />
                </View>
            </ImageBackground>
            <TouchableOpacity 
 activeOpacity={0.9}onPress={handleLogin} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Signup or Login</Text>
            </TouchableOpacity>
            <ScrollView style={styles.sidebar} contentContainerStyle={styles.sidebarContent}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    data.map((item, index) => (
                        <View key={index} style={styles.itemContainer}>
                            <View style={styles.itemContent}>
                                <Image
                                    source={{ uri: item.Image?.url }}
                                    style={styles.itemImage}
                                    resizeMode="contain"
                                />
                                <Text style={styles.sidebarTitle}>{item.CategoryTitle}</Text>
                            </View>
                            <Image source={arrow} style={styles.arrowImage} />
                        </View>
                    ))
                )}
            </ScrollView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    sideBarContainer: {
        backgroundColor: '#fff',
        height: height,
        width: width / 1.2,
        position: 'absolute',
        zIndex: 99,
    },
    backgroundImage: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },
    userSide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        // paddingHorizontal: 10,
    },
    greetingText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 25,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    sidebar: {
        flex: 1,
    },
    sidebarContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    loadingText: {
        fontSize: 16,
        color: '#000',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    sidebarTitle: {
        fontSize: 16,
        color: '#000',
    },
    arrowImage: {
        width: 20,
        height: 20,
    },
    buttonContainer: {
        backgroundColor: '#ffe4e1',
        paddingVertical: 12,
        paddingHorizontal: 25,
        // marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
