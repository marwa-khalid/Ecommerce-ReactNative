import React, { useState, useEffect } from 'react';
import './App.css';
import MainDash from './components/Pages/MainDash';
import Sidebar from './components/Sidebar';
import Customers from './components/Pages/Customers';
import Products from './components/Pages/Products';
import Login from './components/Pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedIn, login } from './components/redux/UserSlice';

const App = () => {

  const isLoggedIn = useSelector(selectLoggedIn);

  const pageComponents = {
    Customers: <Customers />,
    Dashboard: <MainDash />,
    Products: <Products />,
  };

  const dispatch = useDispatch();

  const handleMenuItemSelect = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const user = localStorage.getItem("user");
    if (storedIsLoggedIn === "true") {
      dispatch(login({ user}));
    }
  }, []);
  
  return (
    <>
        {isLoggedIn ? (
            <>
            <div className="App">
              <div className="AppGlass">
              <Sidebar 
              onMenuItemSelect={handleMenuItemSelect}/>
            {selectedMenuItem && 
              pageComponents[selectedMenuItem.heading]}
              </div>
            </div>
            </>
          ) : (
            <Login/>
          )}
    </>
  );
}

export default App;
