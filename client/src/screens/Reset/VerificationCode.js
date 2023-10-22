import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, Image,StyleSheet } from 'react-native';
import axios from 'axios';

const VerificationCode = ({navigation,route}) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = [];
  const [emailToken,setEmailToken] = useState('');
  const [expirationDate,setExpiryDate]=useState('');

  useEffect(() => {
    if (route.params && route.params.token) {
      setEmailToken(route.params.token);
    }
    if (route.params && route.params.expirationDate) {
      setExpiryDate(route.params.expirationDate);
    }
  }, [route.params]);
  
  const handleCodeChange = (text, index) => {
    if (text.length <= 1) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      
      if (text && index < code.length - 1) {
        inputRefs[index + 1].focus();
      }
    }
  };

  const handleSubmit = ()=>{
    console.log(code)
    // submit the verification code to backend here
    axios.post("http://localhost:5002/api/verification/confirm", {
        token: emailToken,
        expiration: expirationDate,
        code: code.join('')
    })
    .then((response)=>{
        window.alert(response.data.message);
        navigation.navigate('Signin');
    })
    .catch((err)=>{
        window.alert(err.response.data.message);
        console.log(err)
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/logoo.png')} 
        style={styles.image2}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>Enter verification code</Text>
      </View>
      <View style={styles.codeContainer}>
        {code.map((value, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            value={value}
            onChangeText={(text) => handleCodeChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(input) => (inputRefs[index] = input)}
          />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Send" color="#C79059" />
      </View>
      <View style={styles.signupButtonContainer}>
        <Text style={styles.subtitle}>Don't have an account?</Text>
        <Button title="Signup" color="#C79059" onPress={handleSubmit}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#FFF",
    paddingTop: 20,
    height:"100%",
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#C79059',
    fontSize: 30,
    fontWeight:"bold",
    marginBottom:30,
    marginTop:10
  },
  subtitle: {
    color: 'black',
    fontSize: 20,
    marginBottom:30
  },
  codeContainer: {
    flexDirection: 'row',
    width: '80%',
  },
  image2: {
    alignSelf: "flex-start",
    position: "relative",
    display: "flex",
    marginTop: 20,
    width: 120,
    height:120,
    flexShrink: 0,
    flexDirection: "column",
    marginLeft: 130,
    aspectRatio: 1,
  },
  codeInput: {
    marginTop:40,
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#C79059', 
    borderRadius: 40,
    fontSize: 20,
    marginRight:15,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: '#C79059',
    borderRadius: 8,
    marginTop:40,
    width: '100%',
    paddingVertical: 10,
  },
  signupButtonContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '70%',
    padding: 20,
    marginTop: 150,
  },
});

export default VerificationCode;
