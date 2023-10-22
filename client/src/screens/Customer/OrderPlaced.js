import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OrderPlaced({ navigation }) {

  const handleGoBack = () => {
    navigation.navigate("CustomerScreen");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../images/confirm.png')}  ></Image>
      <Text style={styles.text}>Order Placed</Text>
      <Text style={styles.confirm}>Your order has been confirmed, we will send you confirmation email shortly.</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image:{
    marginBottom:150,
    width:"80%",
    height:"10vh", 
    borderRadius:30,
  },
  text: {
    fontSize: 30,
    marginTop:-100,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  confirm:{
    color: "#8F959E",
    textAlign: "center",
    fontSize: 15,
    marginLeft: 50,
    marginRight:50,
    marginBottom:50,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 200,
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
