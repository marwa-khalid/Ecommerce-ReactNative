import React, { useState } from "react";
import { View, Text,StyleSheet, Image, TouchableOpacity} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";

const ForgotPasswordConfirmation = ({navigation, route}) => {
  const {email} = route.params;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if(!newPassword || !verificationCode){
      setMessage('Fields cannot be empty');
      return;
    }else setMessage("");

    if(newPassword !== confirmPassword){
      setMessage('Passwords do not match');
      return;
    }else setMessage("");
    
      const data = {
        email:email,
        verificationCode: verificationCode,
        password: newPassword
      };

      await axios  
      .post("https://off-api.vercel.app/api/reset/confirm", data)
      .then((response) => {
        console.log(response)
        setMessage(response.data.message);
        navigation.navigate("Signin");
      })
      .catch((err)=>{
      console.error("Error:", err);
      setMessage(err.data.message);
      alert(`Something went wrong! ${err}`)
      })
  };

  return (
    <View style={styles.container}>
       <Image
        source={require('../../images/logoo.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Forgot Password Confirmation</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        mode="outlined"
        value={verificationCode}
        onChangeText={(text) => setVerificationCode(text)}
      />
       <TextInput
         style={styles.input}
         placeholder="New Password"
         mode="outlined"
         secureTextEntry
         value={newPassword}
         onChangeText={(text) => setNewPassword(text)}
       />
      <TextInput
         style={styles.input}
         placeholder="Confirm New Password"
         mode="outlined"
         secureTextEntry
         value={confirmPassword}
         onChangeText={(text) => setConfirmPassword(text)}
       />
      <TouchableOpacity style={styles.buttonn} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      {message !== "" && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:"white"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
    marginTop:50
  },
  logo: {
    alignSelf: "flex-start",
    position: "relative",
    display: "flex",
    marginTop: 16,
    width: 120,
    height:120,
    flexShrink: 0,
    flexDirection: "column",
    marginLeft: 135,
    aspectRatio: 1,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  message: {
    marginTop: 16,
    textAlign: "center",
    color: "red",
  },
  resendButton:{
    margintop:8,
    backgroundColor:'transparent'
  },
  buttonText: {
    color:"white",
    justifyContent:"center",
    textAlign:"center"
  },
  buttonn: {
    marginTop: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center", // Center button within its row
    backgroundColor: '#BC8752',
    boxShadow: "0px 4px 4px 0px #BD8853",
  }
});

export default ForgotPasswordConfirmation;
