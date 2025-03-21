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
        padding: moderateScale(20),
    },
    errorText: {
        fontSize: moderateScale(16),
        color: '#666',
        textAlign: 'center',
        marginVertical: verticalScale(16),
    },
    retryButton: {
        backgroundColor: '#B32113',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(8),
    },
    retryButtonText: {
        color: '#fff',
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    scrollContainer: {
        padding: moderateScale(0),
    },
    sliderContainer: {
        height: verticalScale(200),
        marginBottom: verticalScale(15),
        borderRadius: moderateScale(12),
        overflow: 'hidden',
    },
    sliderImage: {
        width: '100%',
        height: '100%',
    },
    sliderNavigation: {
        position: 'absolute',
        top: '50%',
        left: scale(10),
        right: scale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        transform: [{ translateY: -verticalScale(20) }],
    },
    navButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: scale(40),
        height: scale(40),
        borderRadius: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: moderateScale(12),
        marginBottom: verticalScale(15),
        padding: moderateScale(15),
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
        top: moderateScale(12),
        right: moderateScale(12),
        backgroundColor: '#B32113',
        color: '#fff',
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4),
        borderRadius: moderateScale(6),
        fontSize: moderateScale(12),
        fontWeight: '600',
        zIndex: 1,
    },
    cardContent: {
        flexDirection: 'row',
        gap: scale(15),
    },
    textSection: {
        flex: 1,
    },
    consultationName: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: verticalScale(8),
    },
    description: {
        fontSize: moderateScale(14),
        color: '#4A4A4A',
        lineHeight: moderateScale(20),
        marginBottom: verticalScale(8),
    },
    readMoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(12),
    },
    readMore: {
        color: '#0066CC',
        fontSize: moderateScale(14),
        fontWeight: '600',
        marginRight: scale(4),
    },
    price: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: verticalScale(4),
    },
    offer: {
        fontSize: moderateScale(13),
        color: '#B32113',
        fontStyle: 'italic',
    },
    imageSection: {
        alignItems: 'center',
        gap: verticalScale(10),
    },
    image: {
        width: scale(120),
        height: scale(120),
        borderRadius: moderateScale(10),
    },
    bookButton: {
        backgroundColor: '#B32113',
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(20),
        borderRadius: moderateScale(8),
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: moderateScale(14),
        textAlign: 'center',
    },
    webViewContainer: {
        height: verticalScale(500),
        marginTop: verticalScale(20),
        borderRadius: moderateScale(12),
        overflow: 'hidden',
    },
    webView: {
        flex: 1,
    },
});