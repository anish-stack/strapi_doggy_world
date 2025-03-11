import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, Dimensions } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function Popup({ navigation }) {
    const [show, setShow] = useState(true);
    const slideAnim = new Animated.Value(height);
    const fadeAnim = new Animated.Value(0);
    useEffect(() => {
        setShow(true);
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: height,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShow(false); // Hide the component after animation
        });
    };

    const handleLogin = () => {
        handleClose();
        navigation.navigate('login');
    };

    const handleRegister = () => {
        handleClose();
        navigation.navigate('register');
    };

    if (!show) return null; // Avoid rendering when show is false

    return (
        <>
            {show && (

                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity: fadeAnim,
                        }
                    ]}
                >
                    <SafeAreaView style={styles.safeArea}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={handleClose}
                            activeOpacity={0.9}
                        >
                            <Icon name="close" size={scale(24)} color="#EC4C3C" />
                        </TouchableOpacity>

                        <Animated.View
                            style={[
                                styles.popup,
                                {
                                    transform: [{ translateY: slideAnim }]
                                }
                            ]}
                        >
                            <View style={styles.semicircle} />
                            <Icon
                                name="account-circle"
                                size={scale(50)}
                                color="#fff"
                                style={styles.headerIcon}
                            />
                            <Text style={styles.popupText}>Welcome!</Text>
                            <Text style={styles.subText}>Would you like to...</Text>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.loginButton]}
                                    onPress={handleLogin}
                                    activeOpacity={0.9}
                                >
                                    <Icon name="login" size={scale(20)} color="#EC4C3C" />
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, styles.registerButton]}
                                    onPress={handleRegister}
                                    activeOpacity={0.9}
                                >
                                    <Icon name="person-add" size={scale(20)} color="#EC4C3C" />
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </SafeAreaView>
                </Animated.View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: width,
        height: height,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        zIndex: 999,
    },
    safeArea: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    closeButton: {
        position: 'absolute',
        bottom: verticalScale(180),
        alignSelf: 'center',
        backgroundColor: '#fff',
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 5,
        right:0,
        // top: ,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    popup: {
        backgroundColor: '#EC4C3C',
        height: verticalScale(240),
        borderTopLeftRadius: scale(40),
        borderTopRightRadius: scale(40),
        alignItems: 'center',
        paddingTop: verticalScale(20),
        position: 'relative',
    },
    semicircle: {
        position: 'absolute',
        top: -scale(20),
        width: scale(200),
        height: scale(40),
        borderTopLeftRadius: scale(100),
        borderTopRightRadius: scale(100),
    },
    headerIcon: {
        marginBottom: verticalScale(10),
    },
    popupText: {
        fontSize: scale(24),
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: verticalScale(5),
    },
    subText: {
        fontSize: scale(16),
        color: '#fff',
        marginBottom: verticalScale(20),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        paddingHorizontal: scale(10),
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
        paddingVertical: verticalScale(12),
        borderRadius: scale(25),
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    loginButton: {
        marginRight: scale(10),
    },
    registerButton: {
        marginLeft: scale(10),
    },
    buttonText: {
        color: '#EC4C3C',
        fontSize: scale(16),
        fontWeight: 'bold',
        marginLeft: scale(8),
    },
});