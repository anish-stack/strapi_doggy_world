import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export default function Popup() {
    const [show, setShow] = useState(false);
    const navigation  = useNavigation()
    useEffect(() => {
        setShow(true);
    }, []);

    const handleLogin = () => {
        console.log('Login pressed');
        navigation.navigate('login')
        setShow(false);
    };

    const handleRegister = () => {
        console.log('Register pressed');
        navigation.navigate('register')
        setShow(false);
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <>
            {show && (
                <View style={styles.container}>
                    <TouchableOpacity 
 activeOpacity={0.9}style={styles.closeButton} onPress={handleClose}>
                        <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                    <View style={styles.popup}>
                        <Text style={styles.popupText}>Would You Like To ?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
 activeOpacity={0.9}style={styles.button} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
 activeOpacity={0.9}style={styles.button} onPress={handleRegister}>
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: width,
        height: height,
        zIndex: 999,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // paddingBottom: 20
    },
    closeButton: {
        position: 'absolute',
        bottom: 150,
        right: width / 2.5,
        backgroundColor: '#fff',
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    closeButtonText: {
        color: '#EC4C3C',
        fontSize: 18,
        fontWeight: 'bold',
    },
    popup: {
        width: width * 1,
        height: width * 0.5,
        backgroundColor: '#EC4C3C',
        borderTopLeftRadius: width * 0.45,
        borderTopRightRadius: width * 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
    popupText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 22,
        textAlign: 'center',
        marginBottom: 19,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#EC4C3C',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
