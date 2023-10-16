import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DeliveryAddressPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [city, setCity] = useState('Lahore');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleSaveAddress = () => {
    if (!name || !phoneNumber || !address) {
      alert('Please fill in all address details.');
      return;
    }
    navigation.navigate('CartScreen',{address:address});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Delivery Address</Text>

      <View style={styles.formGroup}>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Country</Text>
        <Picker
          selectedValue={country}
          onValueChange={(itemValue) => setCountry(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Pakistan" value="Pakistan" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text>City</Text>
        <Picker
          selectedValue={city}
          onValueChange={(itemValue) => setCity(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Lahore" value="Lahore" />
          <Picker.Item label="Islamabad" value="Islamabad" />
          <Picker.Item label="Karachi" value="Karachi" />
          <Picker.Item label="Rawalpindi" value="Rawalpindi" />
          <Picker.Item label="Gujrat" value="Gujrat" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(text) => setAddress(text)}
          multiline={true}
          numberOfLines={1}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveAddress} >
      <Text style={styles.buttonText}>Save Address</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  input: {
    borderRadius: 8,
    backgroundColor:"#F5F6FA",
    padding: 10,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft:90,
    width: 200,
    marginTop:20,
    shadowColor: "#BD8853",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3, 
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center"
  },
});

export default DeliveryAddressPage;
