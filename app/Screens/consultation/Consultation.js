import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { API_END_POINT_URL } from '../../constant/constant';
import CustomSlider from '../Services/Bakery/Slider';
import Call_Header from '../../components/Call_header/Call_Header';
import UpperLayout from '../../layouts/UpperLayout';



export default function Consultation() {
    const navigation = useNavigation();
    const [expandedDescriptionIds, setExpandedDescriptionIds] = useState([]);
    const [consultation, setConsultation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchConsultation = async () => {
        try {
            setError(null);
            const { data } = await axios.get(`${API_END_POINT_URL}/api/consultations?populate=*`);
            setConsultation(data.data);
        } catch (error) {
            setError('Failed to load consultation data. Please try again.');
            console.error('Error fetching consultation:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchConsultation();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchConsultation();
    };

    const toggleDescription = (id) => {
        setExpandedDescriptionIds(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const images = [
        { id: 1, src: require('./cs.png') },
        { id: 2, src: require('./con1.jpg') },
    ];
    if (loading && !refreshing) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#B32113" />
            </View>
        );
    }

    if (error && !refreshing) {
        return (
            <View style={styles.centerContainer}>
                <FontAwesome name="warning" size={50} color="#B32113" />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchConsultation}>
                    <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <UpperLayout isBellShow={false} title={"Online Consultation"} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <CustomSlider autoPlay={true} navigationShow={true} Dealy={2500} imagesByProp={images} />
                <Call_Header />
                <View style={{ padding: 5 }}>

                    {consultation.map(item => (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('next-step', {
                            type: item.name,
                            id: item?.documentId
                        })} key={item.id} style={styles.card}>
                            <Text style={styles.tag}>Featured</Text>

                            <View style={styles.cardContent}>
                                <View style={styles.textSection}>
                                    <Text style={styles.consultationName}>{item.name}</Text>
                                    <Text style={styles.description}>
                                        {expandedDescriptionIds.includes(item.id)
                                            ? item.description
                                            : `${item.description.substring(0, 100)}...`}
                                    </Text>

                                    <TouchableOpacity onPress={() => toggleDescription(item.id)}>
                                        <View style={styles.readMoreContainer}>
                                            <Text style={styles.readMore}>
                                                {expandedDescriptionIds.includes(item.id) ? "Read Less" : "Read More"}
                                            </Text>
                                            <AntDesign
                                                name={expandedDescriptionIds.includes(item.id) ? "up" : "down"}
                                                size={16}
                                                color="#0066CC"
                                            />
                                        </View>
                                    </TouchableOpacity>

                                    <Text style={styles.price}>Starts from ₹{item.price}</Text>
                                    {item?.offer_valid_upto && (
                                        <Text style={styles.offer}>Offer valid: {item.offer_valid_upto}</Text>
                                    )}

                                </View>

                                <View style={styles.imageSection}>
                                    <Image
                                        source={{ uri: item.image?.url }}
                                        style={styles.image}
                                    //   defaultSource={require('../assets/images/icon.png')}
                                    />
                                    <TouchableOpacity
                                        style={styles.bookButton}
                                        onPress={() => navigation.navigate('next-step', {
                                            type: item.name,
                                            id: item?.documentId
                                        })}
                                    >
                                        <Text style={styles.buttonText}>Book Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.webViewContainer}>
                    <WebView
                        source={{ uri: "https://e646aa95356d411688ca904e76e00491.elf.site" }}
                        style={styles.webView}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginVertical: 16,
    },
    retryButton: {
        backgroundColor: '#B32113',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    scrollContainer: {
        padding: 0,
    },
    sliderContainer: {
        height: 200,
        marginBottom: 15,
        borderRadius: 12,
        overflow: 'hidden',
    },
    sliderImage: {
        width: '100%',
        height: '100%',
    },
    sliderNavigation: {
        position: 'absolute',
        top: '50%',
        left: 10,
        right: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        transform: [{ translateY: -20 }],
    },
    navButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tag: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#B32113',
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        fontSize: 12,
        fontWeight: '600',
        zIndex: 1,
    },
    cardContent: {
        flexDirection: 'row',
        gap: 15,
    },
    textSection: {
        flex: 1,
    },
    consultationName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#4A4A4A',
        lineHeight: 20,
        marginBottom: 8,
    },
    readMoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    readMore: {
        color: '#0066CC',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    offer: {
        fontSize: 13,
        color: '#B32113',
        fontStyle: 'italic',
    },
    imageSection: {
        alignItems: 'center',
        gap: 10,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    bookButton: {
        backgroundColor: '#B32113',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
    },
    webViewContainer: {
        height: 500,
        marginTop: 20,
        borderRadius: 12,
        overflow: 'hidden',
    },
    webView: {
        flex: 1,
    },
});