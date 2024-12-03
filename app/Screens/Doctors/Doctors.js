import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import doctorbharat from '../../assets/Doctor/dr-bharat-bandhu.webp';
import doctornaman from '../../assets/Doctor/dr-naman-gupta.webp';
import doctorsaurabh from '../../assets/Doctor/dr-saurabh-gupta.webp';
import doctorsweta from '../../assets/Doctor/dr-sweta.webp';
import doctorneha from '../../assets/Doctor/dr.neha-chaudhary.webp';

const Doctors = () => {
  const data = [
    {
      id: 1,
      doctorName: 'Dr. Bharat Bandhu',
      specialization: 'B.V.Sc. & A.H., M.V.Sc.',
      experience: '10 years',
      description: 'Expert in heart diseases',
      isBest: true,
      image: doctorbharat,
    },
    {
      id: 2,
      doctorName: 'Dr. Naman Gupta',
      specialization: 'B.V.Sc. & A.H., M.V.Sc.',
      experience: '8 years',
      description: 'Specialist in brain disorders',
      isBest: true,
      image: doctornaman,
    },
    {
      id: 3,
      doctorName: 'Dr. Saurabh Gupta',
      specialization: 'B.V.Sc. & A.H.',
      experience: '12 years',
      description: 'Expert in bone and joint issues',
      isBest: false,
      image: doctorsaurabh,
    },
    {
      id: 4,
      doctorName: 'Dr. Sweta',
      specialization: 'B.V.Sc. & A.H.',
      experience: '7 years',
      description: 'Skin care specialist',
      isBest: true,
      image: doctorsweta,
    },
    {
      id: 5,
      doctorName: 'Dr. Neha Chaudhary',
      specialization: 'B.V.Sc. & A.H., M.V.Sc.',
      experience: '5 years',
      description: 'Child care expert',
      isBest: false,
      image: doctorneha,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>#Doctors</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardContainer}
      >
        {data.map((doctor) => (
          <View key={doctor.id} style={styles.card}>
            <Image source={doctor.image} style={styles.image} />
            <Text style={styles.name}>{doctor.doctorName}</Text>
            <Text style={styles.specialization}>{doctor.specialization}</Text>
            <Text style={styles.experience}>{doctor.experience}</Text>
            <Text style={styles.description}>{doctor.description}</Text>
            {doctor.isBest && <Text style={styles.best}>Best</Text>}
          </View>
        ))}
      </ScrollView>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    // padding: 20,
    marginBottom: 70,
    borderRadius: 10,
    // elevation: 5,

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
  card: {
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
   
    marginBottom: 20,


   
    borderRadius: 15,
    padding: 20,
    width: 250,
    height: 250,
    marginTop: 10,

    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#B32113',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B32113',
  },
  specialization: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  experience: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  best: {
    position: 'absolute',
    right: 5,
    marginTop: 10,
    backgroundColor: '#B32113',
    color: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#B32113',
  },
});

export default Doctors;
