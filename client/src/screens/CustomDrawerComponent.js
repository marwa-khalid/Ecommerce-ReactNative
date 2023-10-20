import React from 'react';
import { View,Image,TouchableOpacity,Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { logout } from '../features/UserSlice';
import { useDispatch } from 'react-redux';
const user = (state) => state.user.user;

const CustomDrawerContent = ({ navigation }) => (
  <View style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10,marginTop:30 }}>
      <Image   style={{ width: 30, height: 30, borderRadius: 15 }} />
      <View style={{ marginLeft: 10 }}>
        <Text>{user.username}</Text>
        <Text>Verified Profile</Text>
      </View>
    </View>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 ,marginTop:30}}
      onPress={() => navigation.navigate('ScreenName')}
    >
      <FontAwesome name="fas-sun" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Dark Mode</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10, marginTop:30 }}
      onPress={() => navigation.navigate('ScreenName')}
    >
      <FontAwesome name="exclamation-circle" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Account Information</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 ,marginTop:30}}
      onPress={() => navigation.navigate('ForgotPassword')}
    >
      <FontAwesome name="lock" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Password</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10,marginTop:30 }}
      onPress={() => navigation.navigate('OrdersScreen')}
    >
      <FontAwesome name="shopping-bag" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Orders</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 ,marginTop:30 }}
      onPress={() => navigation.navigate('AddCard')}
    >
      <FontAwesome name="credit-card" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>My Cards</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 ,marginTop:30}}
      onPress={() => navigation.navigate('WishlistScreen')}
    >
      <FontAwesome name="heart" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Wishlist</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 ,marginTop:30}}
      onPress={() => navigation.navigate('Settings')}
    >
      <FontAwesome name="cog" size={25} color="black" style={{ marginRight: 10 }}/>
      <Text>Settings</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center', margin: 10 , marginTop:300}}
      onPress={() => dispatch(logout())}
    >
      <FontAwesome name="sign-out" size={25} color="red" style={{ marginRight: 10 }}/>
      <Text style={{ color: 'red' }}>Logout</Text>
    </TouchableOpacity>
  </View>
);

export default CustomDrawerContent;