import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BookingScreen from "./screens/BookingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ActivityPlaceOrderScreen from "./screens/ActivityPlaceOrderScreen";
import FoodScreen from "./screens/FoodScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/booking' component={BookingScreen} />
          <Route path='/activityplaceorder' component={ActivityPlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/food' component={FoodScreen}/>
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;