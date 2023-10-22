import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import StarRating from './StarRating';

const ReviewsPage = ({ route }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [starRating, setStarRating] = useState(0);
  const [customerName, setCustomerName] = useState(0);

  // useEffect(() => {
  //   fetchReviews();
  // }, [])

  // const fetchReviews = async () => {
  //   try {
  //     console.log("hi")
  //     console.log(kitchenId)
  //     const response = await axios.get(
  //       `http://localhost:3500/reviews/${productId}`
  //     );
  //     const reviewsData = response.data;
  //     setReviews(reviewsData);
  //   } catch (error) {
  //     console.log('Error fetching reviews:', error);
  //   }
  // };

  const handleReviewSubmit = async () => {
    try {

      const data = {
        productId:"7878788888hf",
        customerName:customerName,
        rating: starRating,
        review: reviewText,
      }; 
      console.log(customerName)

  
      await axios.post("http://localhost:5002/api/reviews", data);
      setReviewText('');
      setStarRating(0);
    } catch (error) {
      console.log('Error submitting review:', error);
    }
  };

  const renderReviews = ({ item: review }) => {
    return (
      <View style={styles.reviewItem}>
        <Text style={styles.reviewText}>{review.customerName}</Text>
        <Text style={styles.reviewText}>{review.review}</Text>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={review.rating}
          starSize={20}
          fullStarColor="#fbc02d"
        />
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={{textAlign:"center",fontWeight:"bold",fontSize:24}}>Add Review</Text>
      <View style={styles.addReviewContainer}>
      <Text style={styles.addReviewTitle}>Name</Text>
      <TextInput
          style={styles.reviewNameInput}
          placeholder="Type your name"
          value={customerName}
          onChangeText={(text) => setCustomerName(text)}
        />

        <Text style={styles.addReviewTitle}>How was your experience</Text>
        <TextInput
          style={styles.reviewTextInput}
          placeholder="Describe your experience"
          value={reviewText}
          onChangeText={(text) => setReviewText(text)}
          numberOfLines={4}
        />

<Text style={styles.addReviewTitle}>Star</Text>

        <StarRating
          maxStars={5} // Set the maximum number of stars
          rating={starRating} // Pass the current rating value as a prop
          onStarPress={(rating) => setStarRating(rating)} // Pass a callback function to handle star press events
        />
        <TouchableOpacity
        style={styles.button}
          onPress={handleReviewSubmit}
          disabled={!reviewText || starRating === 0}
        ><Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>

      </View>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          renderItem={renderReviews}
          keyExtractor={(review)=> review.id}
        />
      ) : (
        <Text>No reviews available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  addReviewContainer: {
    marginBottom: 16,
  },
  addReviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewNameInput:{
    height: 40,
    borderRadius:10,
    backgroundColor:"lightgrey",
    marginBottom: 8,
 },
  reviewTextInput: {
    height: 40,
    borderRadius:10,
    backgroundColor:"lightgrey",
    marginBottom: 8,
    height:200
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft:90,
    marginTop:200,
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

export default ReviewsPage;
