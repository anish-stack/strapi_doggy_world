import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import UpperLayout from '../../layouts/UpperLayout';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import CustomSlider from '../Services/Bakery/Slider';
export default function Consultation() {
    const navigation = useNavigation()
    const data = [
        {
            id: 1,
            image: 'https://img.freepik.com/free-vector/doctor-examining-patient-clinic-illustrated_23-2148856559.jpg?t=st=1731062330~exp=1731065930~hmac=026cef4487bbd0fbc14a6a8323dc3c95a0568235db559380ca7a22b07a32d838&w=1380', // Add actual images if available
            name: "General Consultation",
            price: 750,
            discount: 20,
            discountPrice: 520,
            offer_valid_upto: "Upto this diwali 💥💥",
            description: "General consultations cover a wide range of services, including basic health checks, medication reviews, behavioral counseling, dental care, senior pet care, emergency advice, breeding guidance, dermatology, cardiology, internal medicine, oncology, pre- and post-surgical care, telemedicine, and vaccinations."
        },
        {
            id: 2,
            image: 'https://img.freepik.com/free-photo/beautiful-woman-working-as-professional-veterinarian-using-stethoscope-listen-heart-old-persian-cat-animal-clinic-little-girl-taking-her-cat-vet_662251-2363.jpg?t=st=1731062755~exp=1731066355~hmac=c430dee21542f7c20bca72ae6f48323d1168d4a1cdea8ccf5ef9ffe78dbf762e&w=1380',
            name: "Homeopathic Consultation",
            price: 800,
            discount: 15,
            discountPrice: 680,
            offer_valid_upto: "Limited time offer 🎉",
            description: "Homeopathic consultations offer personalized remedies for chronic illnesses, emotional well-being, and immunity boosting."
        },
        {
            id: 3,
            image: 'https://i.ibb.co/q7ynvrx/diet-bnr-img.jpg',
            name: "Nutritional Consultation",
            price: 900,
            discount: 10,
            discountPrice: 810,
            offer_valid_upto: "Valid until year-end 🎊",
            description: "Nutritional consultations offer expert advice on dietary needs assessment, diet formulation, portion control, and feeding techniques to promote optimal pet health."
        }
    ];

    const images = [
        { id: 1, src: require('./cs.png') },
        { id: 2, src: require('./con1.jpg') },
    ];

    return (
        <View style={styles.container}>
            <UpperLayout title={"Online Consultation"} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <CustomSlider autoPlay={true} navigationShow={true} Dealy={2500} imagesByProp={images} />

                {data.map(item => (
                    <View key={item.id} style={styles.card}>
                        <Text style={styles.tag}>Tag</Text>
                        <View style={styles.cardContent}>
                            <View style={styles.textSection}>
                                <Text style={styles.consultationName}>{item.name}</Text>
                                <Text style={styles.description}>{item.description.substring(0, 120) + '......'}</Text>
                                <Text style={styles.price}>Start at @ Rs {item.price}</Text>
                                <Text style={styles.offer}>Offer valid: {item.offer_valid_upto}</Text>
                            </View>
                            <View style={styles.imageSection}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('next-step', { type: item.name })}
                                    style={styles.button}
                                >
                                    <Text style={styles.buttonText}>Book Now</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                ))}
                <View style={styles.containers}>
                    <Text style={styles.text}>
                        <Icon name="angle-double-down" style={styles.icon} size={55} color="#000" />
                    </Text>
                </View>
                {/* <View style={styles.webViewContainer}>
                    <WebView
                        source={{ uri: "https://e646aa95356d411688ca904e76e00491.elf.site" }}
                        style={styles.webView}
                    />
                </View> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#ffffff',
    },

    scrollContainer: {
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 1,
        padding: 10,

        position: 'relative',
    },
    tag: {
        position: 'absolute',
        top: 8,
        right: 10,
        zIndex: 99,
        backgroundColor: '#B32113',
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textSection: {
        flex: 1,
        paddingRight: 10,
    },
    consultationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#222',
        marginBottom: 10,
        lineHeight: 20,
    },
    price: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    offer: {
        fontSize: 14,
        color: '#B32113',
        fontStyle: 'italic',
    },
    imageSection: {
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#B32113',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    webViewContainer: {
        height: 500,

        marginBottom: 20,

    },
    webView: {
        flex: 1,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    containers: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,           // Adds top margin for spacing
    },
    text: {
        fontSize: 16,            // Adds font size to the Text component
        textAlign: 'center',     // Centers the text
    },
    icon: {
        marginTop: 10,           // Adds space above the icon
        marginBottom: 10,        // Adds space below the icon
    },
});
