import React from 'react';
import { View, Text, Image, StyleSheet, Button, SafeAreaView } from 'react-native';

const ThankYouPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('./thank-you.png')} // Make sure to add an image in the assets folder
          style={styles.image}
        />
        <Text style={styles.heading}>Thank You!</Text>
        <Text style={styles.message}>
          Your submission was successfully received. We appreciate your time and effort. We will get back to you shortly.
        </Text>
        <Button
          title="Go Back to Home"
          onPress={() => navigation.navigate('Home')} // Adjust 'Home' to your screen name
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff', // Light background color
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d2d2d',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ThankYouPage;
