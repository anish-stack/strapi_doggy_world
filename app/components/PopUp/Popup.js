import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Animated,
    Dimensions,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

export default function Popup({ navigation }) {
    const [show, setShow] = useState(true);
    const scaleAnim = new Animated.Value(0.5);
    const opacityAnim = new Animated.Value(0);
    const translateYAnim = new Animated.Value(50);

    useEffect(() => {
        setShow(true);
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(translateYAnim, {
                toValue: 0,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.5,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(translateYAnim, {
                toValue: 50,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShow(false);
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

    if (!show) return null;

    return (
        <Animated.View
            style={[
                styles.overlay,
                {
                    opacity: opacityAnim,
                },
            ]}
        >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={handleClose}
                    activeOpacity={0.7}
                >
                    <Icon name="close" size={24} color="#6B7280" />
                </TouchableOpacity>

                <Animated.View
                    style={[
                        styles.popup,
                        {
                            transform: [
                                { scale: scaleAnim },
                                { translateY: translateYAnim },
                            ],
                        },
                    ]}
                >
                    <View style={styles.iconContainer}>
                        <Icon name="pets" size={32} color="#E34234" />
                    </View>

                    <Text style={styles.title}>Welcome to PawCare</Text>
                    <Text style={styles.subtitle}>
                        Your trusted partner in pet healthcare
                    </Text>

                    <View style={styles.features}>
                        <View style={styles.featureItem}>
                            <Icon name="video-camera-front" size={24} color="#FA5F55" />
                            <Text style={styles.featureText}>Online Consultations</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Icon name="schedule" size={24} color="#FA5F55" />
                            <Text style={styles.featureText}>Best Doctors</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Icon name="local-pharmacy" size={24} color="#FA5F55" />
                            <Text style={styles.featureText}>Pet Medicine And Products</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.loginButton]}
                            onPress={handleLogin}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.loginButtonText}>Sign In</Text>
                            <Icon name="arrow-forward" size={20} color="#FFFFFF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.registerButton]}
                            onPress={handleRegister}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.registerButtonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.termsText}>
                        By continuing, you agree to our Terms of Service
                    </Text>
                </Animated.View>
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: width,
        bottom: 0,
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    container: {
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: -50,
        right: 0,
        width: 36,
        height: 36,
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    popup: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 24,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    iconContainer: {
        width: 64,
        height: 64,
        backgroundColor: '#EEF2FF',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 24,
        textAlign: 'center',
    },
    features: {
        width: '100%',
        marginBottom: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    featureText: {
        marginLeft: 12,
        fontSize: 16,
        color: '#4B5563',
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
        marginBottom: 16,
    },
    button: {
        width: '100%',
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loginButton: {
        backgroundColor: '#E34234',
        shadowColor: '#E34234',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    registerButton: {
        backgroundColor: '#F3F4F6',
    },
    registerButtonText: {
        color: '#4B5563',
        fontSize: 16,
        fontWeight: '600',
    },
    termsText: {
        fontSize: 12,
        color: '#9CA3AF',
        textAlign: 'center',
    },
});