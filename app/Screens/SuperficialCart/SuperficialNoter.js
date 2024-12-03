import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native';
import { Animated, Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

export default function SuperficialNoter({isShow = true}) {
    const navigation = useNavigation()
    const { labTests, labTestsCount } = useSelector((state) => state.labCart)
    const slideUp = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(slideUp, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [slideUp]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [
                        {
                            translateY: slideUp.interpolate({
                                inputRange: [0, 1],
                                outputRange: [200, 0], // Slide from 200px to 0px
                            }),
                        },
                    ],
                },
            ]}
        >
          <TouchableOpacity onPress={() => navigation.navigate('labCart')} style={[styles.iconContainer,{display:isShow ? '':'none'}]}>
                <Icon name="check-circle" size={30} color="#fff" />
                <Text style={styles.mainText}>{labTestsCount} Tests Added  </Text>
                <TouchableOpacity onPress={() => navigation.navigate('labCart')} activeOpacity={0.7}>
                    <Text style={styles.subText}>Check Now</Text>
                </TouchableOpacity>

            </TouchableOpacity>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        bottom: 30,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
        width: '100%',
        backgroundColor: '#B32113', // Zomato-like color (red)
        borderRadius: 50,
        padding: 10,
        marginBottom: 10,
    },
    mainText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
    },
    subText: {
        borderWidth: 1,
        borderColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 24,
        color: '#fff',

    },
});
