import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../../features/BasketSlice';
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { clearCart } from "../../features/BasketSlice";

const CartScreen = ({ route,navigation }) => {
  
  const [cardNumber, setCardNumber] = useState('');

  const [address, setAddress] = useState(''); // Address state in the CartScreen

  useEffect(() => {
    // Check if an updated address is provided in the route parameters
    if (route.params && route.params.address) {
      // Update the address in the CartScreen
      setAddress(route.params.address);
    }
    if (route.params && route.params.cardNumber) {
      // Update the address in the CartScreen
      setCardNumber(route.params.cardNumber);
    }
  }, [route.params]);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState(state.cart.items);
  const [quantity, setQuantity] = useState(null);
  console.log(cartItems)

  const deleteItem = (orderId) => {
    setCartItems(cartItems.filter((item) => item.id !== orderId));
    dispatch(removeFromCart({ id: orderId }));
  }

  const incrementQuantity = (quantity) => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = (quantity) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const formatCardNumber = (cardNumber) => {
    // Remove spaces and hyphens, if any
    const cleanedCardNumber = cardNumber.replace(/[\s-]/g, '');
  
    // Use regex to split the number into groups of 4 digits
    const formattedCardNumber = cleanedCardNumber.match(/(\d{1,4})/g).join(' ');
  
    return formattedCardNumber;
  };
  
  const handleSubmit = () =>{
   
    console.log(state.cart.items[0].brand)
    console.log(address)
    console.log(state.user.user.user.username)
    console.log(state.cart.items.map(item => ({
      title: item.title,
      quantity: item.quantity
    })))

    if (!cardNumber || !address) {
      alert('Please fill in all address and card details.');
      return;
    }
    
    axios
    .post("http://localhost:5002/api/orders/", {
        customerName: state.user.user.user.username, 
        products: state.cart.items.map(item => ({
          title: item.title,
          quantity: item.quantity,
          image: item.image
        })),
        status: "Processing",
        amount: state.cart.items.reduce(
            (total, item) => (total + item.price * item.quantity)+200,
            0
        ),
        address: address,
        brand: state.cart.items[0].brand, 
    },{headers: {
      'Content-Type': 'application/json'
       }  } )
    .then((response) => {
        console.log(response.data);
        dispatch(clearCart());
        navigation.navigate("OrderPlaced")
    })
    .catch((error) => console.log(error));

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <View>
          {cartItems.map((item) => (
            <View key={item._id} style={styles.cartItem}>
              <Image source={{ uri: `http://localhost:5002/${item.image}` }} style={styles.productImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>Rs. {item.price}</Text>
                <View style={styles.quantityContainer}>
                  
                  <View style={styles.quantityButtons}>
                    <TouchableOpacity
                      onPress= {() => {item.quantity-1}}
                    >
                      <Icon name="remove" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress= {() => {item.quantity+1}}
                    >
                      <Icon name="add" size={24} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteItem(item.id)}
              >
                <Icon name="delete" size={28} color="grey" />
              </TouchableOpacity>
            </View>
          ))}
          <Text style={styles.totalText}>
            Total Items:
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </Text>

          {/* Delivery Address */}
      <Text style={styles.subheading}>Delivery Address</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('AddAddress')}
      >
        {address ? <Text> {address}</Text>  : <Text>Add/Select Address</Text>}
      </TouchableOpacity>

      {/* Payment Method */}
      <Text style={styles.subheading}>Payment Method</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('AddCard')}
      >
        {cardNumber ? <Text> {formatCardNumber(cardNumber)}</Text>  : <Text>Add Payment Card</Text>}
      </TouchableOpacity>

      {/* Order Info */}
      <Text style={styles.subheading}>Order Info</Text>
      <View style={styles.orderInfo}>
          <Text style={styles.ordertext} >Subtotal</Text>
          <TouchableOpacity >
            <Text style={styles.ordertext2}>Rs {state.cart.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.orderInfo}>
          <Text style={styles.ordertext} >Shipping Cost</Text>
          <TouchableOpacity >
            <Text style={styles.ordertext2}>Rs 200</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.orderInfo}>
          <Text style={styles.ordertext} >Total</Text>
          <TouchableOpacity >
            <Text style={styles.ordertext2}>Rs {state.cart.items.reduce(
              (total, item) => (total + item.price * item.quantity) +200,
              0
            )}</Text>
          </TouchableOpacity>
      </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.addToCartButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 10,
    resizeMode:"contain"
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    marginTop: 10,
  },
  ordertext: {
    fontSize:17,
    fontWeight:"bold",
    color:"grey",
  },
  ordertext2: {
    marginRight:5,
    fontSize:17,
    fontWeight:"bold",
    color:"black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    marginTop:30,
    textAlign: "center",
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  option: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    marginVertical: 8,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: "#FEFEFE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  itemInfo: {
    flex: 1,
    marginRight: 16,
    marginLeft:20
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  quantityButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    width: 40,
    alignItems: "center",
    marginTop:70
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center"
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    marginTop:40,
    marginLeft:90,
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
});

export default CartScreen;
