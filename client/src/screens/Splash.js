import React, { useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const Splash = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
        <Image
          source={require('../images/logoo.png')} 
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginBottom:50,
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
  },
});

export default Splash;
