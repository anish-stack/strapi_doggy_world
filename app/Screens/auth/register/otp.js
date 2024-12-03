import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, Alert } from 'react-native';

export default function OtpVerification() {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(120);
    const navigation = useNavigation()
    // Effect to handle the countdown
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timer]);

    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Resend OTP function
    const handleResend = () => {
        setTimer(120); // Reset timer to 2 minutes
        Alert.alert("OTP Resent", "A new OTP has been sent to your WhatsApp.");
    };

    // Handle OTP verification
    const handleVerify = () => {
        if (!otp) {
            Alert.alert("Validation Error", "Please enter the OTP.");
            return;
        }

        // Here, add the actual verification logic
        Alert.alert("OTP Verified", "Your OTP has been verified successfully.");
        navigation.navigate('Home')
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../../assets/authimages/verify.png')} style={styles.image} />

            <Text style={styles.instructions}>Enter the OTP sent to you on WhatsApp</Text>

            {/* OTP Input */}
            <TextInput
                style={styles.input}
                placeholder="OTP"
                keyboardType="numeric"
                value={otp}
                onChangeText={setOtp}
                maxLength={6}
            />


            <View style={styles.buttonContainer}>
                <TouchableOpacity 
 activeOpacity={0.9}style={[styles.button, styles.resendButton]} onPress={handleResend} disabled={timer > 0}>
                    <Text style={styles.buttonText}>Resend</Text>
                </TouchableOpacity>

                <TouchableOpacity 
 activeOpacity={0.9}style={[styles.button, styles.verifyButton]} onPress={handleVerify}>
                    <Text style={styles.buttonText}>Verify</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.timerbox}>
                <Text style={styles.timertext}>Remaining time for new otp </Text>
                <Text style={styles.timer}>{formatTime()}</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    timerbox: {
        width: '100%',
        display: 'flex',
        alignItems: "center",
        textAlign: 'end',
        paddingHorizontal: 5,
    },
    timertext: {
        paddingTop: 5,
        fontSize: 16,
        color: '#333',
        marginTop: 10,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    instructions: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        textAlign: 'start',
    },
    timer: {
        textAlign: 'end',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    resendButton: {
        backgroundColor: '#ddd',
    },
    verifyButton: {
        backgroundColor: '#FF7862',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

