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
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import FoodPaymentScreen from "./screens/FoodPaymentScreen";
import ActivityPlaceOrderScreen from "./screens/ActivityPlaceOrderScreen";
import FoodPlaceOrderScreen from "./screens/FoodPlaceOrderScreen";
import FoodScreen from "./screens/FoodScreen";
import FoodDetailsScreen from "./screens/FoodDetailsScreen";
import FoodOrderScreen from "./screens/FoodOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ActivityListScreen from "./screens/ActivityListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/foodpayment' component={FoodPaymentScreen} />
          <Route path='/booking' component={BookingScreen} />
          <Route path='/foodorder/:id' component={FoodOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/activityplaceorder' component={ActivityPlaceOrderScreen} />
          <Route path='/foodplaceorder' component={FoodPlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/foods' component={FoodScreen}/>
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/food/:id' component={FoodDetailsScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/activitylist' component={ActivityListScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;