import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Platform,
    Dimensions
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'expo-linear-gradient';
import img from '../../../assets/authimages/image.png';
import { useNavigation } from '@react-navigation/native';
import { API_END_POINT_URL } from '../../../constant/constant';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function Register() {
    const [petType, setPetType] = useState('dog');
    const [name, setName] = useState('dog');
    const [contactNumber, setContactNumber] = useState('7217619794');
    const [breed, setBreed] = useState('king');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('mahakaal@123');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: '',
        color: '#ccc'
    });
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errors, setErrors] = useState({});

    const navigation = useNavigation();

    useEffect(() => {
        if (date) {
            const calculatedAge = moment().diff(moment(date), 'years', true).toFixed(1);
            setAge(calculatedAge.toString());
        }
    }, [date]);

    const checkPasswordStrength = (pass) => {
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        const strengthMap = {
            0: { message: 'Very Weak', color: '#ff4444' },
            1: { message: 'Weak', color: '#ffbb33' },
            2: { message: 'Medium', color: '#ffbb33' },
            3: { message: 'Strong', color: '#00C851' },
            4: { message: 'Very Strong', color: '#007E33' }
        };

        setPasswordStrength({
            score,
            ...strengthMap[score]
        });
    };

    const validateField = (field, value) => {
        const newErrors = { ...errors };

        switch (field) {
            case 'name':
                if (!value) newErrors.name = 'Name is required';
                else if (value.length < 2) newErrors.name = 'Name is too short';
                else delete newErrors.name;
                break;
            case 'contactNumber':
                if (!value) newErrors.contactNumber = 'Contact number is required';
                else if (!/^[0-9]{10}$/.test(value)) newErrors.contactNumber = 'Invalid contact number';
                else delete newErrors.contactNumber;
                break;
            case 'breed':
                if (!value) newErrors.breed = 'Breed is required';
                else delete newErrors.breed;
                break;
            case 'password':
                if (!value) newErrors.password = 'Password is required';
                else if (value.length < 6) newErrors.password = 'Password must be at least 6 characters';
                else delete newErrors.password;
                break;
        }

        setErrors(newErrors);
    };

    const handleSubmit = async () => {
        // Validate all fields
        validateField('name', name);
        validateField('contactNumber', contactNumber);
        validateField('breed', breed);
        validateField('password', password);

        if (Object.keys(errors).length > 0) {
            Alert.alert('Validation Error', 'Please fix the errors before submitting.');
            return;
        }

        const data = {
            PetType: petType,
            petName: name || "petName",
            contact_number: contactNumber || "7217619794",
            Breed: breed || "breed",
            DOB: date.toISOString(),
            Age: age,
            password
        };

        try {
            const response = await axios.post(`${API_END_POINT_URL}/api/register`, data);
            console.log("response", response.data)
            Alert.alert('Success', 'Registration successful!');
            navigation.navigate('otp', {
                data: response.data,
                contact_number:contactNumber
            });
        } catch (error) {
            console.log("error", error.response)
            Alert.alert('Error', error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <Image source={img} style={styles.headerImage} />

                    <Text style={styles.title}>
                        <MaterialIcons name="pets" size={24} color="#FF7862" />
                        Register Your Pet
                    </Text>

                    <View style={styles.petTypeContainer}>
                        <TouchableOpacity
                            style={[styles.petTypeButton, petType === 'dog' && styles.selectedPetTypeButton]}
                            onPress={() => setPetType('dog')}
                        >
                            <FontAwesome5 name="dog" size={20} color={petType === 'dog' ? '#fff' : '#666'} />
                            <Text style={[styles.petTypeText, petType === 'dog' && styles.selectedPetTypeText]}>
                                Dog
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.petTypeButton, petType === 'cat' && styles.selectedPetTypeButton]}
                            onPress={() => setPetType('cat')}
                        >
                            <FontAwesome5 name="cat" size={20} color={petType === 'cat' ? '#fff' : '#666'} />
                            <Text style={[styles.petTypeText, petType === 'cat' && styles.selectedPetTypeText]}>
                                Cat
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="pets" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Pet Name"
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                validateField('name', text);
                            }}
                        />
                    </View>
                    {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}


                    <View style={styles.inputContainer}>
                        <MaterialIcons name="phone" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Contact Number"
                            keyboardType="phone-pad"
                            value={contactNumber}
                            onChangeText={(text) => {
                                setContactNumber(text);
                                validateField('contactNumber', text);
                            }}
                        />
                    </View>
                    {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber}</Text>}


                    <TouchableOpacity
                        style={styles.datePickerButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <MaterialIcons name="calendar-today" size={20} color="#666" />
                        <Text style={styles.datePickerText}>
                            {date ? moment(date).format('MMMM D, YYYY') : 'Select Birth Date'}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            maximumDate={new Date()}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) setDate(selectedDate);
                            }}
                        />
                    )}

                    <View style={styles.inputContainer}>
                        <MaterialIcons name="pets" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Breed"
                            value={breed}
                            onChangeText={(text) => {
                                setBreed(text);
                                validateField('breed', text);
                            }}
                        />
                    </View>
                    {errors.breed && <Text style={styles.errorText}>{errors.breed}</Text>}


                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                checkPasswordStrength(text);
                                validateField('password', text);
                            }}
                        />
                        <TouchableOpacity
                            style={styles.passwordIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <MaterialIcons
                                name={showPassword ? "visibility-off" : "visibility"}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}


                    {password && (
                        <View style={styles.passwordStrength}>
                            <View style={[styles.strengthBar, { backgroundColor: passwordStrength.color }]} />
                            <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
                                {passwordStrength.message}
                            </Text>
                        </View>
                    )}

                    <TouchableOpacity onPress={handleSubmit}>
                        <LinearGradient
                            colors={['#FF7862', '#FF5733']}
                            style={styles.button}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.buttonText}>Register Pet</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('login')}
                        style={styles.loginLink}
                    >
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
        paddingBottom: 30,
    },
    headerImage: {
        width: width * 0.6,
        height: width * 0.6,
        resizeMode: 'contain',
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    petTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
        gap: 15,
    },
    petTypeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        width: '45%',
        gap: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedPetTypeButton: {
        backgroundColor: '#FF7862',
        borderColor: '#FF7862',
    },
    petTypeText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
    selectedPetTypeText: {
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        marginBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    passwordIcon: {
        padding: 10,
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 25,
        marginBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    datePickerText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    passwordStrength: {
        width: '100%',
        marginBottom: 15,
    },
    strengthBar: {
        height: 4,
        borderRadius: 2,
        width: '100%',
        marginBottom: 5,
    },
    strengthText: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '600',
    },
    button: {
        width: width - 40,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginLink: {
        marginTop: 20,
        padding: 10,
    },
    loginText: {
        color: '#FF7862',
        fontSize: 16,
        fontWeight: '600',
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginBottom: 10,
        marginTop: -10,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
});