import React from 'react';
import { View,Image,TouchableOpacity,Text ,Modal,TouchableWithoutFeedback } from 'react-native';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { logout } from '../features/UserSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const user = (state) => state.user.user;

const CustomSidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch=useDispatch();
  const navigation = useNavigation();

  const sidebarStyles = isOpen
  ? [styles.sidebar, styles.sidebarOpen]
  : [styles.sidebar, styles.sidebarClosed];

  return (
  <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        toggleSidebar();
      }}
    >
      <TouchableWithoutFeedback onPress={toggleSidebar}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      
  <View style={ sidebarStyles} >
    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10,marginTop:30 }}>
    <Image source={require('../images/avatar.jpg')}  onClick={() => navigation.navigate('CustomerScreen')} style={{ width: 40, height: 40, borderRadius: 50 }} />
      <View style={{ marginLeft: 10 }}>
        <Text>{user.username}</Text>
        <Text>Verified Profile</Text>
      </View>
    </View>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 ,marginTop:30}}
      onPress={() =>{ navigation.navigate('ScreenName')
      toggleSidebar()}}
    >
      <FontAwesome name="fas-sun" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Dark Mode</Text>
      
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginTop:30 }}
      onPress={() => {navigation.navigate('EditProfile')
      toggleSidebar()}}
    >
      <FontAwesome name="exclamation-circle" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Account Information</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 ,marginTop:30}}
      onPress={() => {navigation.navigate('ForgotPassword');
      toggleSidebar();}}
    >
      <FontAwesome name="lock" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Password</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10,marginTop:30 }}
      onPress={() =>  {navigation.navigate('CustomerOrder')
      toggleSidebar()}}
    >
      <FontAwesome name="shopping-bag" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Orders</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 ,marginTop:30 }}
      onPress={() =>  {navigation.navigate('AddCard')
      toggleSidebar()}}
    >
      <FontAwesome name="credit-card" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>My Cards</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 ,marginTop:30}}
      onPress={() =>  {navigation.navigate('WishlistScreen');
      toggleSidebar();}
    }
    >
      <FontAwesome name="heart" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Wishlist</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 ,marginTop:30}}
      onPress={() =>  {navigation.navigate('Settings');
      toggleSidebar();}}
      
    >
      <FontAwesome name="cog" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Settings</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 , marginTop:180}}
      onPress={() => {dispatch(logout());
      toggleSidebar(); 
      navigation.navigate('Signin')}}
    >
      <FontAwesome name="sign-out" size={25} color="red" style={{ marginRight: 10 }}/>
      <Text style={{ color: 'red' }}>Logout</Text>
    </TouchableOpacity>
  </View>
  </Modal>
  
  )};
  
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', 
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '65%',
    backgroundColor: 'white',
    zIndex: 1,
  },
  sidebarOpen: {
    transform: [{ translateX: 0 }],
  },
  sidebarClosed: {
    transform: [{ translateX: 100 }], 
  },
});



export default CustomSidebar;