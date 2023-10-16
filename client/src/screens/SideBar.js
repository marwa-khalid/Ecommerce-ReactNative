import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Sidebar = ({ navigation }) => {
  return (
      <View style={styles.sidebarContainer}>
       
       
                <TouchableOpacity
                 style={styles.sidebarItem}
                  onPress={() => navigateToEditProfile()}
               >
                 <Text>Edit Profile</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={styles.sidebarItem}
                 onPress={() => navigateToWishlistScreen()}
               >
                 <Text>Wishlist</Text>
               </TouchableOpacity>
               <TouchableOpacity
                 style={styles.sidebarItem}
                 onPress={() => navigation.navigate("CustomerOrder")}
               >
                 <Text>Orders</Text>
               </TouchableOpacity>
               <TouchableOpacity
               style={styles.sidebarItem}
               onPress={() => navigation.navigate("CartScreen")}
             >
               <FontAwesome name="shopping-cart" size={20} color="#333" />
               <Text style={styles.sidebarItemText}>Cart</Text>
             </TouchableOpacity>
               <TouchableOpacity
                 style={styles.sidebarItem}
                 onPress={async () => {
                   dispatch(logout());
                   navigation.navigate("Signin")
                   await AsyncStorage.clear();
                 }}
               >
                 <Text>Logout</Text>
               </TouchableOpacity>
             </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginLeft:0
  },
});

export default Sidebar;
