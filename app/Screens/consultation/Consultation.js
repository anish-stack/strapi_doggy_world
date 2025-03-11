import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import UpperLayout from '../../layouts/UpperLayout';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
import CustomSlider from '../Services/Bakery/Slider';
import Call_Header from '../../components/Call_header/Call_Header';
import WebView from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API_END_POINT_URL } from '../../constant/constant';
export default function Consultation() {
    const navigation = useNavigation()
    const [expandedDescriptionIds, setExpandedDescriptionIds] = useState([]);
    const [consultation, setConsultation] = useState([])


    useEffect(() => {
        const fetchConsultation = async () => {
            try {
                const { data } = await axios.get(`${API_END_POINT_URL}/api/consultations?populate=*`)
                setConsultation(data.data)
            } catch (error) {

                console.log("error", error)
            }
        }
        fetchConsultation()
    }, [])



    const toggleDescription = (id) => {
        if (expandedDescriptionIds.includes(id)) {
            setExpandedDescriptionIds(expandedDescriptionIds.filter(itemId => itemId !== id));
        } else {
            setExpandedDescriptionIds([...expandedDescriptionIds, id]);
        }
    };
    const images = [
        { id: 1, src: require('./cs.png') },
        { id: 2, src: require('./con1.jpg') },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>


            <View style={styles.container}>
                <UpperLayout title={"Online Consultation"} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <CustomSlider autoPlay={true} navigationShow={true} Dealy={2500} imagesByProp={images} />
                    <Call_Header />
                    {consultation.map(item => (
                        <View key={item.id} style={styles.card}>
                            <Text style={styles.tag}>Tag</Text>
                            <View style={styles.cardContent}>
                                <View style={styles.textSection}>
                                    <Text style={styles.consultationName}>{item.name}</Text>
                                    <Text style={styles.description}>
                                        {expandedDescriptionIds.includes(item.id)
                                            ? item.description
                                            : `${item.description.substring(0, 100)}...`}
                                    </Text>
                                    <TouchableOpacity onPress={() => toggleDescription(item.id)}>
                                        <Text style={styles.readMore}>
                                            {expandedDescriptionIds.includes(item.id) ? "Read Less" : "Read More"}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.price}>Start at @ Rs {item.price}</Text>
                                    <Text style={styles.offer}>Offer valid: {item.offer_valid_upto}</Text>
                                </View>
                                <View style={styles.imageSection}>
                                    <Image source={{ uri: item.image?.url }} style={styles.image} />
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('next-step', { type: item.name, id: item?.documentId })}
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
                    <View style={styles.webViewContainer}>
                        <WebView
                            source={{ uri: "https://e646aa95356d411688ca904e76e00491.elf.site" }}
                            style={styles.webView}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {

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
    readMore: {
        color: '#0d6efd',
        fontWeight: 'bold',
        marginTop: 5,
    },
});
