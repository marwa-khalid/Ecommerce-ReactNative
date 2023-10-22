import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, Button,TouchableOpacity } from "react-native";
import axios from "axios";
import CheckBox from 'expo-checkbox';
import { FontAwesome } from '@expo/vector-icons';

const RegisterPage = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr,setEmailErr] = useState("");
  const [usernameErr,setNameErr]  = useState("");
  const [passwordErr,setPasswordErr] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

    const handleRegistration = async() => {

      if(username.length < 3){
        setNameErr("Name should be at least 3 characters long");
        return
      } else setNameErr("");
        if(!email){
          setEmailErr("Email is required");
          return;
        }else setEmailErr("")
        if(!email.includes("@") || !email.includes(".")){
          setEmailErr(`Email must include "@" and a "."`);
          return;
        }else setEmailErr("")
      
        if(!password){
          setPasswordErr("Password is required.");
          return;
          }else setPasswordErr("");
    
        if(password.length < 8){
          setPasswordErr("Password should be at least 8 characters long");
          return;
          }else setPasswordErr("");
    
        const customerData = {
          username,
          email,
          password,
        };
    
        try{
          axios.post("http://localhost:5002/api/users/register", customerData)
          .then((response)=>{
            console.log(response)
            axios.post(`http://localhost:5002/api/verification/${email}`)
            .then((response)=>{
              console.log(response)
              navigation.navigate("VerificationCode",{token:response.data.token.token,expirationDate:response.data.token.expirationDate})
            })
            .catch((err)=>{
              alert(err)
            })      
          })
          .catch((err)=>{
            alert(err);
          });
        }catch(error){
        console.log(error.message)
        }
      };
    

  return (
    <View style={styles.container}>
      <Image
        source={require('../images/logoo.png')} 
        style={styles.image2}
      />

      <Text style={styles.title}>Signup</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <View style={styles.line}></View>
        <Text style={styles.err}>{usernameErr}</Text>

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <View style={styles.line}></View>
        <Text style={styles.err}>{passwordErr}</Text>

        <Text style={styles.label}>Email Address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <View style={styles.line}></View>
        <Text style={styles.err}>{emailErr}</Text>

        <View style={styles.rememberMeContainer}>
          
          <Text>Remember Me</Text>
          <CheckBox
          style={styles.checkbox}
            value={rememberMe}
            onValueChange={() => setRememberMe(!rememberMe)}
          />
        </View>

    <TouchableOpacity style={styles.fbbutton}>
      <FontAwesome name="facebook" size={18} color="#FFFFFF" backgroundColor="#1877f2" style={styles.icon} />
      <Text color="blue" style={styles.fbbuttonText}>Facebook</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.googlebutton}>
      <FontAwesome name="google" size={18} color="#FFFFFF" backgroundColor="red" style={styles.icon} />
      <Text color="red" style={styles.googlebuttonText} >Google</Text>
    </TouchableOpacity>
    
    <TouchableOpacity
        style={styles.button}
          onPress={handleRegistration}
        >
          <Text style={styles.buttonText}>Signup</Text>

          </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signin");
          }}
        >
          <Text style={styles.loginText}>Already have an account? Login!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    alignItems: "center",
    backgroundColor: "white",
    height:"100%"
  },
  err:{
    color:"red"
  },
  icon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    padding:4,
  },
  loginText: {
    marginTop: 30,
    textAlign: "center",
    color: "#888",
  },
  label:{
    color: "#202020",
    fontSize: 13,
    fontWeight: 400,
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 4,
  },
  title: {
    color: "#BD8853",
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: -0.21,
    alignSelf: "center",
    marginTop: 20,
    marginLeft: 25,
    width: 115,
  },
  checkbox:{
    alignContent:"flex-end",
    marginLeft:220,
  },
  line: {
    backgroundColor: "#E7E8EA",
    alignSelf: "flex-start",
    marginLeft: 3,
    width: 335,
    height: 1,
  },
  button: {
    marginTop:20,
    marginLeft:75,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 180,
    shadowColor: "#BD8853",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center"
  },
  input: {
    backgroundColor:"transparent",
    color:"brown",
    padding:10
  },
  formContainer: {
    width: "80%",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:30,
    alignContent:"space-between",
    marginBottom:30,
  },
  fbbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#1877f2', // Blue border color
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  googlebutton: {
    marginTop:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: "#EA4335", 
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  fbbuttonText: {
    fontSize: 16,
    marginLeft: 10,
    color:"#1877f2",
    fontWeight:"bold" // Spacing between icon and text
  },
  googlebuttonText: {
    fontSize: 16,
    marginLeft: 10,
    color:"#EA4335",
    fontWeight:"bold" // Spacing between icon and text
  },
  // image1: {
  //   alignSelf: "flex-start",
  //   position: "relative",
  //   display: "flex",
  //   width: 45,
  //   flexShrink: 0,
  //   flexDirection: "column",
  //   marginTop: 21,
  //   marginLeft:20,
  //   aspectRatio: 1,
  // },
  image2: {
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
});

export default RegisterPage;
