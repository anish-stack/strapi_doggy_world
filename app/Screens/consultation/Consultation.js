import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Dimensions,
    Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { API_END_POINT_URL } from '../../constant/constant';
import axios from 'axios';
import TopHeadPart from '../../layouts/TopHeadPart';
import Call_Header from '../../components/Call_header/Call_Header';

import WebView from 'react-native-webview';
const { width } = Dimensions.get('window');

const ImageSlider = ({ images }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollViewRef = useRef(null);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % images.length;
            setCurrentIndex(nextIndex);
            scrollViewRef.current?.scrollTo({
                x: nextIndex * width,
                animated: true,
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <View style={styles.sliderContainer}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={image.src}
                        style={styles.sliderImage}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>
            <View style={styles.pagination}>
                {images.map((_, index) => {
                    const inputRange = [
                        (index - 1) * width,
                        index * width,
                        (index + 1) * width,
                    ];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [8, 16, 8],
                        extrapolate: 'clamp',
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={index}
                            style={[styles.dot, { width: dotWidth, opacity }]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const ConsultationCard = ({ item, navigation, showText, toggle }) => (
    <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => navigation.navigate('next-step', {
            type: item.name,
            id: item?.documentId
        })}
    >
        <View style={styles.cardContent}>
            <Image
                source={{ uri: item.image?.url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2940&auto=format&fit=crop' }}
                style={styles.cardImage}
            />

            <View style={styles.textContent}>
                {/* <View style={styles.tagContainer}>
          <LinearGradient
            colors={['#ff4d4d', '#cc0000']}
            style={styles.tag}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.tagText}>Featured</Text>
          </LinearGradient>
        </View> */}

                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text
                    style={styles.cardDescription}
                    numberOfLines={showText ? undefined : 3}
                >
                    {item.description}
                </Text>

                {item.description.length > 100 && (
                    <TouchableOpacity onPress={() => toggle()}>
                        <Text style={styles.readMore}>
                            {showText ? 'Read Less ▲' : 'Read More ▼'}
                        </Text>
                    </TouchableOpacity>
                )}
                <View style={styles.priceSection}>
                    <View>
                        <Text style={styles.priceLabel}>Starting from</Text>
                        <Text style={styles.price}>₹{item.price}</Text>
                        {item?.offer_valid_upto && (
                            <Text style={styles.offer}>Valid until {item.offer_valid_upto}</Text>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.bookButton}
                        onPress={() => navigation.navigate('next-step', {
                            type: item.name,
                            id: item?.documentId
                        })}
                    >
                        <LinearGradient
                            colors={['#ff4d4d', '#cc0000']}
                            style={styles.gradientButton}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.buttonText}>Book Now</Text>
                            <Ionicons name="arrow-forward" size={moderateScale(18)} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

export default function Consultation() {
    const navigation = useNavigation();
    const [consultation, setConsultation] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => setShowFullText(prev => !prev);


    const images = [
        { id: 1, src: require('./cs.png') },
        { id: 2, src: require('./con1.jpg') },
    ];

    const fetchConsultation = async () => {
        try {
            setError(null);
            const { data } = await axios.get(`${API_END_POINT_URL}/api/consultations?populate=*`);
            setConsultation(data.data);
        } catch (error) {
            setError('Failed to load consultation data');
            console.error('Error fetching consultation:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchConsultation();
    }, []);

    if (loading && !refreshing) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#cc0000" />
            </View>
        );
    }

    if (error && !refreshing) {
        return (
            <View style={styles.centerContainer}>
                <Ionicons name="alert-circle" size={moderateScale(50)} color="#cc0000" />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchConsultation}>
                    <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <TopHeadPart title={'Online Consultation'} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchConsultation} />
                }
            >
                <ImageSlider images={images} />
                <Call_Header />

                <View style={styles.consultationsContainer}>
                    {consultation.map(item => (
                        <ConsultationCard
                            key={item.id}
                            item={item}
                            showText={showFullText}
                            toggle={() => setShowFullText(!showFullText)}
                            navigation={navigation}
                        />
                    ))}
                </View>
                <WebView
                    source={{ uri: "https://e646aa95356d411688ca904e76e00491.elf.site" }}
                    style={{ overflow: "hidden", height: 500 }}
                />

            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(15),
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: moderateScale(24),
        fontWeight: '700',
        color: '#333',
    },
    filterButton: {
        padding: moderateScale(8),
        borderRadius: moderateScale(8),
        backgroundColor: '#f5f5f5',
    },
    sliderContainer: {
        height: verticalScale(200),
        width: width,
    },
    sliderImage: {
        width: width,
        height: verticalScale(200),
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: verticalScale(15),
        alignSelf: 'center',
    },
    dot: {
        height: verticalScale(8),
        borderRadius: moderateScale(4),
        backgroundColor: '#fff',
        marginHorizontal: scale(4),
    },
    consultationsContainer: {
        padding: scale(4),
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: moderateScale(15),
        marginBottom: verticalScale(15),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 0,
    },
    cardContent: {
        flexDirection: 'row',
        overflow: 'hidden',
        justifyContent: 'flex-start',
        paddingVertical: verticalScale(5),
        paddingHorizontal: scale(15),
        borderRadius: moderateScale(15),
    },
    cardImage: {
        width: scale(150),
        flexDirection: 'row',
        overflow: 'hidden',
        alignSelf: 'center',
        height: scale(150),

        justifyContent: 'center',
        resizeMode: 'cover',
        height: scale(220),
        borderRadius: moderateScale(15),
        marginHorizontal: scale(5)

    },
    textContent: {
        flex: 1,
        padding: scale(15),
    },
    tagContainer: {
        marginBottom: verticalScale(10),
    },
    tag: {
        alignSelf: 'flex-start',
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(20),
    },
    tagText: {
        color: '#fff',
        fontSize: moderateScale(12),
        fontWeight: '600',
    },
    cardTitle: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: '#333',
        marginBottom: verticalScale(8),
    },
    cardDescription: {
        fontSize: moderateScale(12),
        color: '#666',
        lineHeight: moderateScale(20),
        marginBottom: verticalScale(12),
    },
    priceSection: {
        marginTop: 'auto',
    },
    priceLabel: {
        fontSize: moderateScale(12),
        color: '#666',
    },
    price: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: '#333',
        marginBottom: verticalScale(8),
    },
    offer: {
        fontSize: moderateScale(12),
        color: '#cc0000',
        marginBottom: verticalScale(8),
    },
    bookButton: {
        overflow: 'hidden',
        borderRadius: moderateScale(25),
    },
    gradientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(25),
        gap: scale(5),
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: moderateScale(14),
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(20),
    },
    errorText: {
        fontSize: moderateScale(16),
        color: '#666',
        textAlign: 'center',
        marginVertical: verticalScale(16),
    },
    retryButton: {
        backgroundColor: '#cc0000',
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(10),
        borderRadius: moderateScale(25),
    },
    retryButtonText: {
        color: '#fff',
        fontSize: moderateScale(14),
        fontWeight: '600',
    },
    readMore: {
        color: '#0d6efd',
        marginTop: 4,
        fontWeight: 'bold',
    },
});