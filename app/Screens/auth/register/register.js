import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import img from '../../../assets/authimages/image.png'
import { useNavigation } from '@react-navigation/native';
export default function Register() {
    const [petType, setPetType] = useState('dog');
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation()
    const handleSubmit = () => {
        if (!name || !contactNumber || !breed || !age) {
            Alert.alert("No fields are filled", "All fields are mandatory.");
            return;
        }
        if (!password || password.length < 6) {
            Alert.alert("Validation Error", "Password must be at least 6 characters long.");
            return;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(contactNumber)) {
            Alert.alert("Wrong Contact number", "Please enter a valid 10-digit contact number.");
            return;
        }

        Alert.alert("Registration Successful", "Your details have been submitted.");
        navigation.navigate('otp')
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                  
                    <Image
                        source={img}
                        style={styles.headerImage}
                    />

               
                    <Text style={styles.title}>Find & Love Your New Friend</Text>

                
                    <View style={styles.petTypeContainer}>
                        <TouchableOpacity
                            style={[styles.petTypeButton, petType === 'dog' && styles.selectedPetTypeButton]}
                            onPress={() => setPetType('dog')}
                        >
                            <Text style={styles.petTypeText}>Dog</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.petTypeButton, petType === 'cat' && styles.selectedPetTypeButton]}
                            onPress={() => setPetType('cat')}
                        >
                            <Text style={styles.petTypeText}>Cat</Text>
                        </TouchableOpacity>
                    </View>

                
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Contact Number"
                        keyboardType="phone-pad"
                        value={contactNumber}
                        onChangeText={setContactNumber}
                    />

                    <View style={styles.box}>
                        <TextInput
                            style={[styles.input, { width: '48%' }]}
                            placeholder="Breed"
                            value={breed}
                            onChangeText={setBreed}
                        />

                        <TextInput
                            style={[styles.input, { width: '48%' }]}
                            placeholder="Age"
                            keyboardType="numeric"
                            value={age}
                            onChangeText={setAge}
                        />
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Passowrd"
                        value={password}
                        onChangeText={setPassword}
                    />
                    {/* Register Button */}
                    <TouchableOpacity 
 activeOpacity={0.9}onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    {/* Login Text */}
                    <TouchableOpacity 
 activeOpacity={0.9}onPress={() => navigation.navigate('login')}>
                        <Text style={styles.loginText}>Already a pet parent? Login</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerImage: {

        width: 250,
        height: 250,
        resizeMode: 'cover',

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    petTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    petTypeButton: {
        flex: 1,
        paddingVertical: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        alignItems: 'center',
    },
    selectedPetTypeButton: {
        backgroundColor: '#FF7862',
    },
    petTypeText: {
        fontSize: 16,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    button: {
        width: '100%',
        backgroundColor: '#FF7862',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',

    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        color: '#555',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});