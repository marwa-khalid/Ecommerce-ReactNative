import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";
import CheckBox from 'expo-checkbox';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login } from "../features/UserSlice";

const SignInPage = ({navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const handleSignIn = async () => {
    const data = {
      username: username,
      password: password,
      userType: "customer"
    };
    if(!username){
      window.alert("Username is required");
      return;
    }
    if(!password){
      window.alert("Password is required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5002/api/users/login", data);
      dispatch(login(response.data));

      await AsyncStorage.setItem("userId", response.data.user.id);
      console.log(response.data.user.id);

      navigation.navigate("CustomerScreen");
    }catch(error){
        if (error.response) 
          window.alert( error.response.data.message); 
        else {
          window.alert('Error:', error.message);
        }
      };
  };

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../images/logoo.png')} 
        style={styles.image2}
      />

      <Text style={styles.signInText}>Sign In</Text>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <View style={styles.line} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
          <View style={styles.line} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>


        <View style={styles.rememberMeContainer}>
          
          <Text>Remember Me</Text>
          <CheckBox
          style={styles.checkbox}
            value={rememberMe}
            onValueChange={() => setRememberMe(!rememberMe)}
          />
        </View>

        <View style={styles.termView}>
          <Text>
            <Text style={styles.termText}>
              By connecting your account, confirm that you agree with our
            </Text>
            <Text style={styles.termCondition}> Term and Condition</Text>
          </Text>
        </View>
      </View>

        <TouchableOpacity
        style={styles.button}
          onPress={handleSignIn}
        >
          <Text style={styles.buttonText}>Login</Text>

          </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={styles.registerText}>New to OFF? Register!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    alignItems: "center",
    height:"100%"
  },
  registerText: {
    marginTop: 30,
    textAlign: "center",
    color: "#888",
  },
  label:{
    marginTop:20,
  },
  termView: {
    color: "#000",
    textAlign: "justify",
    fontSize: 13,
    fontWeight: 500,
    alignSelf: "stretch",
    marginTop:120,
    marginBottom:50
  },
  checkbox:{
    alignContent:"flex-end",
    marginLeft:220,
  },
  signInText: {
    color: "#BD8853",
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: -0.21,
    alignSelf: "center",
    marginTop: 20,
    marginLeft: 25,
    width: 115,
  },
  formContainer: {
    width: "80%",
  },
  line: {
    backgroundColor: "#E7E8EA",
    alignSelf: "flex-start",
    marginLeft: 3,
    width: 335,
    height: 1,
  },
  
  inputContainer: {
    backgroundColor:"white"
  },
  termText: {
    fontWeight: '400',
    color: 'rgba(189, 136, 83, 1)',
    alignContent:"space-between"
  },
  termCondition: {
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 1)',
    alignContent:"center"
  },
  input: {
    padding: 10,
    backgroundColor:"transparent",
    color:"brown"
  },
  
  image2: {
    alignSelf: "flex-start",
    position: "relative",
    display: "flex",
    marginTop: 16,
    width: 120,
    height:120,
    flexShrink: 0,
    flexDirection: "column",
    marginLeft: 130,
    aspectRatio: 1,
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: 25,
    color: "red",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:30,
    alignContent:"space-between"
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

export default SignInPage;
