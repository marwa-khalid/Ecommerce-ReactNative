import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
import { RadioButton } from 'react-native-paper';

const AddCardScreen = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardOwner, setCardOwner] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');

  const handlePayment = () => {
      if (!cardOwner || !cardNumber || !expiryDate || !cvv) {
        // Handle missing card information
        alert('Please fill in all card details.');
        return;
      }
  
      if (!isCardNumberValid(cardNumber)) {
        alert('Invalid card number format. Please use a 16-digit card number with optional spaces.');
        return;
      }
  
      if (!isExpiryDateValid(expiryDate)) {
        alert('Invalid expiry date format. Please use MM/YY format.');
        return;
      }
  
      if (!isCVVValid(cvv)) {
        alert('Invalid CVV format. Please enter a 3-digit CVV.');
        return;
      }

      navigation.navigate('CartScreen', {
        cardNumber: cardNumber,
      });
  };

  const isCardNumberValid = (cardNumber) => {
    // Validate card number format (16 digits with optional spaces)
    const cardNumberRegex = /^(\d{4}[-\s]?){3}\d{4}$/;
    return cardNumberRegex.test(cardNumber);
  };
  
  const isExpiryDateValid = (expiryDate) => {
    // Validate expiry date format (MM/YY)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return expiryDateRegex.test(expiryDate);
  };
  
  const isCVVValid = (cvv) => {
    // Validate CVV format (3 digits)
    const cvvRegex = /^\d{3}$/;
    return cvvRegex.test(cvv);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Card</Text>
      <View style={styles.imageCard}>
          <Image
            source= {require('../../images/card.png')}
            style={{width:"85%",height:"20vh", borderRadius:30}}
          />
      </View>
        <View style={styles.cardDetails}>
          <Text style={styles.label}>Card Owner</Text>
          <TextInput
            style={styles.input}
            value={cardOwner}
            placeholder='Zahra Batool'
            onChangeText={(text) => setCardOwner(text)}
          />

          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={cardNumber}
            placeholder='5254 7634 8734 7690'
            onChangeText={(text) => setCardNumber(text)}
          />

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>EXP</Text>
              <TextInput
                style={styles.input}
                placeholder='02/25'
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(text)}
              />
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                value={cvv}
                placeholder='776'
                onChangeText={(text) => setCVV(text)}
              />
            </View>
          </View>
        </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  cardDetails:{
    marginTop:120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 8,
    backgroundColor:"#F5F6FA",
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageCard:{
    width:"100%",
    height:100,
    resizeMode:"contain",
    marginLeft:30
  },
  column: {
    flex: 1,
    marginRight:40
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 150,
    shadowColor: "#BD8853",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 3, 
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center"
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
});

export default AddCardScreen;
