import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Sidebar from './src/screens/SideBar';
import Splash from "./src/screens/Splash";
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import EditProfile from "./src/screens/EditProfile";
import CustomerScreen from "./src/screens/Customer/CustomerScreen";
import BrandDetail from "./src/screens/Customer/BrandDetail";
import CartScreen from "./src/screens/Customer/CartScreen";
import AddAddressScreen from "./src/screens/Customer/AddAddressScreen";
import AddCardScreen from "./src/screens/Customer/AddCardScreen";
import OrderPlaced from "./src/screens/Customer/OrderPlaced";
import CustomerOrder from "./src/screens/Customer/CustomerOrders"
import ReviewPage from "./src/screens/Customer/ReviewPage";
import ProductDetail from './src/screens/Customer/ProductDetail';
import ForgotPasswordForm from "./src/screens/Reset/ForgotPasswordForm";
import ForgotPasswordConfirmation from "./src/screens/Reset/ForgotPasswordConfirmation";
import WishlistScreen from './src/screens/Customer/WishlistScreen';
import { store } from "./src/store";
import { Provider } from "react-redux";
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator options={{ headerShown: false }} initialRouteName="Main">
        <Stack.Screen name='BrandDetail' component={BrandDetail} />

        <Stack.Screen name='WishlistScreen' component={WishlistScreen} />
        <Stack.Screen name='OrderPlaced' component={OrderPlaced} />
        <Stack.Screen name='Main' component={Splash} />
          <Stack.Screen name='Signup' component={SignupScreen} />
          <Stack.Screen name='Signin' component={SigninScreen} />
          <Stack.Screen name='Sidebar' component={Sidebar} />
          <Stack.Screen name='EditProfile' component={EditProfile} />
          
          <Stack.Screen name="AddAddress" component={AddAddressScreen} />
          <Stack.Screen name="AddCard" component={AddCardScreen} />

          <Stack.Screen name='CustomerScreen' component={CustomerScreen} />
          
          <Stack.Screen name= 'ProductDetail' component={ProductDetail}/>
          
          <Stack.Screen name='Review' component={ReviewPage} />
          <Stack.Screen name='CartScreen' component={CartScreen} />
          <Stack.Screen name='CustomerOrder' component={CustomerOrder} />

          <Stack.Screen 
          name='ForgotPassword' 
          component={ForgotPasswordForm} />
          <Stack.Screen name='ForgotPasswordConfirmation' component={ForgotPasswordConfirmation} />

        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;