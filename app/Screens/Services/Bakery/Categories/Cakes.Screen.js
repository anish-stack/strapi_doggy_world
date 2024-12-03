import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions, Button } from 'react-native';
import UpperLayout from '../../../../layouts/UpperLayout';
// import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window')
export default function CakesScreen() {
    const navigation = useNavigation()
    const [selectedFlavourId, setSelectedFlavourId] = useState(null);
    const [selectedQuantityId, setSelectedQuantityId] = useState(null);
    const [selectedDesignId, setSelectedDesignId] = useState(null);
    const [uploadedDesign, setUploadedDesign] = useState(null);
    const flavourData = [
        {
            id: 1,
            name: 'Banana Peanut Butter Cake',
            image: 'https://www.royalpoochpetbakery.com/wp-content/uploads/2023/07/cake-1-300x300.jpg',
        },
        {
            id: 2,
            name: 'Chocolate Chip Cookie Cake',
            image: 'https://www.royalpoochpetbakery.com/wp-content/uploads/2024/06/cakes-catgory.jpg',
        },
        {
            id: 3,
            name: 'Chocolate Chip Cookie Cake',
            image: 'https://www.royalpoochpetbakery.com/wp-content/uploads/2024/10/cake-42-300x300.jpg',
        },
        {
            id: 4,
            name: 'Chocolate Chip Cookie Cake',
            image: 'https://www.royalpoochpetbakery.com/wp-content/uploads/2024/10/cake-16-300x300.jpg',
        },
        {
            id: 5,
            name: 'Chocolate Chip Cookie Cake',
            image: 'https://www.royalpoochpetbakery.com/wp-content/uploads/2024/10/cake-13-300x300.jpg',
        },
    ];

    const quantityData = [
        { id: 1, label: '300gms @950/₹' },
        { id: 2, label: '500gms @1150/₹' },
        { id: 3, label: '1kg        @2000/₹' },
        { id: 4, label: '2kg        @2000/₹' },
    ];

    const designData = [
        {
            id: 1,
            name: 'Vanilla Cake',
            image: 'https://www.royalpoochpetbakery.com/wp-content/uploads/2024/10/cake-10-300x300.jpg',
        },
        {
            id: 2,
            name: 'Red Velvet Cake',
            image: 'https://www.royalpoochpetbakery.com/wp-content/uploads/2024/10/cake-12-300x300.jpg',
        },
        {
            id: 3,
            name: 'Vanilla Cake',
            image: 'https://www.royalpoochpetbakery.com/wp-content/uploads/2024/10/cake-17-300x300.jpg',
        },
        {
            id: 4,
            name: 'Red Velvet Cake',
            image: 'https://www.royalpoochpetbakery.com/wp-content/uploads/2024/10/cake-19-300x300.jpg',
        },
    ];
    const handleFlavourSelect = (id) => {
        setSelectedFlavourId(selectedFlavourId === id ? null : id);
    };
    const handleQuantitySelect = (id) => {
        setSelectedQuantityId(selectedQuantityId === id ? null : id);
    };

    // Handle design selection
    const handleDesignSelect = (id) => {
        setSelectedDesignId(selectedDesignId === id ? null : id);
        setUploadedDesign(null); // Clear uploaded design if a predefined design is selected
    };
    const pickImage = async () => {
        const options = ['Choose from Gallery', 'Open Camera', 'Cancel'];
        const cancelIndex = options.length - 1;

        const userChoice = await new Promise((resolve) => {
            Alert.alert(
                'Upload Your Design',
                'Select an option',
                options.map((option, index) => ({
                    text: option,
                    onPress: () => resolve(index),
                    style: index === cancelIndex ? 'cancel' : 'default',
                }))
            );
        });

        // User canceled the choice
        if (userChoice === cancelIndex) return;

        let result;

        if (userChoice === 0) {
            // Open gallery
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [5, 6],
                quality: 1,
            });
        } else if (userChoice === 1) {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                cameraType: ImagePicker.CameraType.back,
            });
        }

        if (result.canceled) {
            Alert.alert('Cancelled', 'No image was selected');
            setUploadedDesign(null);
            return;
        }

        setUploadedDesign(result.assets[0].uri);
        setShowNextButton(true);
        Alert.alert('Success', 'Your design has been uploaded!');
    };

    return (
        <>
            <UpperLayout title={"Yummy Cakes 🍰"} />
            <ScrollView contentContainerStyle={styles.container}>
                {/* Select Flavour Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Flavour</Text>
                    <View style={styles.grid}>
                        {flavourData.map((flavour) => (
                            <TouchableOpacity
                                key={flavour.id}
                                style={[
                                    styles.card,
                                    selectedFlavourId === flavour.id && styles.selectedCard,
                                ]}
                                onPress={() => handleFlavourSelect(flavour.id)}
                            >
                                <Image source={{ uri: flavour.image }} style={styles.cardImage} />
                                <Text style={styles.cardTitle}>{flavour.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Select Quantity Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Quantity</Text>
                    <View style={styles.quantityContainer}>
                        {quantityData.map((quantity) => (
                            <TouchableOpacity
                                key={quantity.id}
                                style={[
                                    styles.quantityButton,
                                    selectedQuantityId === quantity.id && styles.selectedButton,
                                ]}
                                onPress={() => handleQuantitySelect(quantity.id)}
                            >
                                <Text style={[
                                    styles.quantityText,
                                    selectedQuantityId === quantity.id && styles.selectedButtonQuantityText,
                                ]}>
                                    {quantity.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Select Cake Design Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Select Cake Design</Text>
                    <View style={styles.designContainer}>
                        {designData.map((design) => (
                            <TouchableOpacity
                                key={design.id}
                                style={styles.designItem}
                                onPress={() => handleDesignSelect(design.id)}
                            >
                                <Image source={{ uri: design.image }} style={styles.designImage} />
                                <View style={styles.checkBoxContainer}>
                                    <View
                                        style={[
                                            styles.checkBox,
                                            selectedDesignId === design.id && styles.checked,
                                        ]}
                                    >
                                        {selectedDesignId === design.id && (
                                            <Text style={styles.checkMark}>✓</Text>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity 
 activeOpacity={0.9}style={styles.uploadDesign} onPress={pickImage}>
                            <Text style={styles.uploadTextSize}>+</Text>
                            <Text style={styles.uploadText}>Upload Your Design</Text>
                        </TouchableOpacity>
                    </View>
                    {uploadedDesign && (
                        <Image source={{ uri: uploadedDesign }} style={styles.uploadedImage} />
                    )}
                </View>

                {/* Show the Next Button if a design is selected */}
                {(selectedDesignId || uploadedDesign) && (
                    <View style={styles.nextButtonContainer}>
                        <Button title="Go To Next Step 🫵" color={"#B21313"} onPress={() => {
                            Alert.alert(
                                "Proceeding to next step",
                                "", // Optional description or leave empty
                                [
                                    {
                                        text: "OK",
                                        onPress: () => navigation.navigate('Cake-Delivery')
                                    }
                                ]
                            );
                        }} />
                    </View>
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        padding: 10,
        // width:width ,
        color: "#fff",
        borderRadius: 5,
        backgroundColor: '#B32113',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        justifyContent: 'flex-start',
    },
    card: {
        width: width / 3.3,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 4,
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedCard: {
        borderColor: '#e94030',
        borderWidth: 2,
    },
    cardImage: {
        width: "100%",
        height: 80,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginBottom: 5,
    },
    cardTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    quantityButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedButton: {
        backgroundColor: '#B32113',
        borderColor: '#B32113',
    },
    selectedButtonQuantityText: {
        color: '#fff',
    },
    quantityText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#333',
    },
    designContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    designItem: {
        position: 'relative',
        alignItems: 'center',
    },
    designImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 5,
    },
    uploadDesign: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    uploadTextSize: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    uploadText: {
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
    },
    checkBoxContainer: {
        position: 'absolute',
        top: -10,
        right: 0,
        marginVertical: 10,
    },
    checkBox: {
        width: 12,
        height: 12,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#e94030',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    checked: {
        backgroundColor: '#e94030',
    },
    checkMark: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 'bold',
    },
    uploadedImage: { width: 100, height: 100, marginVertical: 10, borderRadius: 10 },
});

