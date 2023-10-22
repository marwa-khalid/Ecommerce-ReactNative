import React from 'react';

function BackButton({navigation}) {

  const backButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff', 
    color: '#fff', 
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const goBack = () => {
    navigation.navigate.goBack(); 
  };

  return (
    <button onClick={goBack} style={backButtonStyle}>
      Back
    </button>
  );
}

export default BackButton;
