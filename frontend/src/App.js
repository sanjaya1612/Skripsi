import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import FaqScreen from "./screens/FaqScreen";
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
import FoodListScreen from "./screens/FoodListScreen";
import FoodEditScreen from "./screens/FoodEditScreen";
import OrderFoodListScreen from "./screens/OrderFoodListScreen";
import FoodOrderScreen from "./screens/FoodOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ActivityScreen from "./screens/ActivityScreen";
import ActivityListScreen from "./screens/ActivityListScreen";
import ActivityEditScreen from "./screens/ActivityEditScreen";
import HotelScreen from "./screens/HotelScreen";
import HotelDetailsScreen from "./screens/HotelDetailsScreen";
import HotelListScreen from "./screens/HotelListScreen";
import HotelEditScreen from "./screens/HotelEditScreen";
import HotelBookingScreen from "./screens/HotelBookingScreen";
import HotelPaymentScreen from "./screens/HotelPaymentScreen";
import HotelPlaceOrderScreen from "./screens/HotelPlaceOrderScreen";
import HotelOrderScreen from "./screens/HotelOrderScreen";
import ScrollToTop from "./components/ScrollToTop";
import MyFoodOrdersScreen from "./screens/MyFoodOrdersScreen";
import MyActivitiesScreen from "./screens/MyActivitiesScreen";
import MyHotelBookingsScreen from "./screens/MyHotelBookingsScreen";
import GalleryScreen from "./screens/GalleryScreen";
import GalleryDetailsScreen from "./screens/GalleryDetailsScreen";
import GalleryListScreen from "./screens/GalleryListScreen";
import GalleryEditScreen from "./screens/GalleryEditScreen";
import BaliScreen from "./screens/BaliScreen";
import SulawesiScreen from "./screens/SulawesiScreen";
import PapuaScreen from "./screens/PapuaScreen";
import NttScreen from "./screens/NttScreen";
import AllGalleryScreen from "./screens/AllGalleryScreen";
import CovidScreen from "./screens/CovidScreen"


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/foodorders/:id' component={FoodOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/hotelorder/:id' component={HotelOrderScreen} />
          <Route path='/FAQ' component={FaqScreen} />
          <Route path='/bali' component={BaliScreen} />
          <Route path='/papua' component={PapuaScreen} />
          <Route path='/ntt' component={NttScreen} />
          <Route path='/sulawesi' component={SulawesiScreen} />
          <Route path='/allgallery' component={AllGalleryScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/hotelpayment' component={HotelPaymentScreen} />
          <Route path='/foodpayment' component={FoodPaymentScreen} />
          <Route path='/booking' component={BookingScreen} />
          <Route path='/hotelbooking' component={HotelBookingScreen} />
          <Route path='/hotelplaceorder' component={HotelPlaceOrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/activityplaceorder' component={ActivityPlaceOrderScreen} />
          <Route path='/foodplaceorder' component={FoodPlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/foods' component={FoodScreen}/>
          <Route path='/activities' component={ActivityScreen}/>
          <Route path='/hotels' component={HotelScreen}/>
          <Route path='/galleries' component={GalleryScreen}/>
          <Route path='/covidinfo' component={CovidScreen}/>
          <Route path='/myfoodorders' component={MyFoodOrdersScreen}/>
          <Route path='/myactivities' component={MyActivitiesScreen}/>
          <Route path='/myhotelbooking' component={MyHotelBookingsScreen}/>
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/gallery/:id' component={GalleryDetailsScreen} />
          <Route path='/food/:id' component={FoodDetailsScreen} />
          <Route path='/hotel/:id' component={HotelDetailsScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/hotellist' component={HotelListScreen} />
          <Route path='/admin/hotel/:id/edit' component={HotelEditScreen} />
          <Route path='/admin/gallerylist' component={GalleryListScreen} />
          <Route path='/admin/gallery/:id/edit' component={GalleryEditScreen} />
          <Route path='/admin/foodlist' component={FoodListScreen} exact/>
          <Route path='/admin/foodlist/:pageNumber' component={FoodListScreen} exact/>
          <Route path='/admin/food/:id/edit' component={FoodEditScreen} />
          <Route path='/admin/activitylist' component={ActivityListScreen} />
          <Route path='/admin/foodorderlist' component={OrderFoodListScreen} />
          <Route path='/admin/activity/:id/edit' component={ActivityEditScreen} />
          <Route path='/search-food/:keyword' component={FoodScreen} />
          <Route path='/foodspage/page/:pageNumber' component={FoodScreen} />
          <Route path='search-food/:keyword/foodspage/page/:pageNumber' component={FoodScreen}/>
          <Route path='/search-activity/:keyword' component={ActivityScreen} />
          <Route path='/activitypage/page/:pageNumber' component={ActivityScreen} />
          <Route path='/search-hotel/:keyword' component={HotelScreen} />
          <Route path='/search-allgallery/:keyword' component={AllGalleryScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;