import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './webScreens/HomeScreen';
import Nav from "./Nav";
import Login from './webScreens/LoginScreen';
import Cart from './webScreens/CartScreen';
import Orders from './webScreens/OrdersScreen';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { Routes, Route } from 'react-router-dom';
import Account from './webScreens/AccountScreen';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
          displayName: userAuth.displayName
        }));


      } else {
        dispatch(logout());

        window.localStorage.removeItem("data");

      }
    })

    return unsubscribe;
  }, [dispatch])

  // console.log(JSON.parse(window.localStorage.getItem("data")).cartItems)

  // console.log(user);



  return (
    <div className="App">
      <div className='nav'>
        <Nav />
      </div>

      {user && user.displayName ?
        <Routes>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/account' element={<Account />} />

        </Routes>
        :
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<HomeScreen />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      }





      {/* <HomeScreen /> */}

      {/* <Login /> */}

      {/* <Cart /> */}

      {/* <Orders /> */}



    </div>
  );
}

export default App;
