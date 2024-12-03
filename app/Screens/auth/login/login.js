import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import img from '../../../assets/authimages/login.jpg';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const navigation = useNavigation()

  const handleLogin = () => {
    if (contactNumber === '' || password === '') {
      Alert.alert('Error', 'Please enter contact number and password');
      return;
    }
    Alert.alert('Success', 'Logged in successfully');
  };

  const handleOtpLogin = () => {
    if (contactNumber === '' || otp === '') {
      Alert.alert('Error', 'Please enter contact number and OTP');
      return;
    }
    Alert.alert('Success', 'Logged in with OTP successfully');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image source={img} style={styles.image} />

        <TextInput
          placeholder="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          style={styles.input}
          keyboardType="phone-pad"
        />
        {!showOtp ? (
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        ) : (
          <TextInput
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
            keyboardType="number-pad"
          />
        )}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={!showOtp ? handleLogin : handleOtpLogin}
        >
          <Text style={styles.loginButtonText}>{!showOtp ? 'Login With Password' : 'Login with OTP'}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
 activeOpacity={0.9}onPress={() => setShowOtp(!showOtp)}>
          <Text style={styles.toggleText}>
            {showOtp ? 'Or login with Password' : 'Or login with OTP'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
 activeOpacity={0.9}onPress={() => navigation.navigate('forget-password')}>
          <Text style={styles.linkText}>Forget Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity 
 activeOpacity={0.9}onPress={() => navigation.navigate('register')}>
          <Text style={styles.linkText}>New to Doggy World Care? Sign Up</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#FF7862',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleText: {
    color: '#FF7862',
    fontSize: 14,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
  linkText: {
    color: '#FF7862',
    fontSize: 14,
    marginTop: 5,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
