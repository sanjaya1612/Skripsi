import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreateReviewReducer,
    productTopRatedReducer
} from './reducers/productReducers'
import {
    foodListReducer,
    foodDetailsReducer,
    foodDeleteReducer,
    foodCreateReducer,
    foodUpdateReducer,
    foodReviewCreateReducer,
    foodTopRatedReducer,
} from './reducers/foodReducers'
import {
    hoteltListReducer,
    hotelDetailsReducer,
    hotelDeleteReducer,
    hotelCreateReducer,
    hotelUpdateReducer,
    hotelReviewCreateReducer,
} from './reducers/hotelReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers'

import {
    orderFoodCreateReducer,
    orderFoodDetailsReducer,
    orderFoodPayReducer,
    orderFoodDeliverReducer,
    orderListMyFoodReducer,
    orderListFoodReducer
} from './reducers/orderFoodReducers'

import {
    bookingCreateReducer,
    bookingDetailsReducer,
    bookingPayReducer,
    bookingListMyReducer
} from './reducers/bookingHotelReducers'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer
} from './reducers/orderReducers'

import {
    bookingReducer,
} from './reducers/bookingReducers'

import {
    galleryListReducer,
    galleryDetailsReducer,
    galleryReviewCreateReducer
} from './reducers/galleryReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    productTopRated: productTopRatedReducer,
    foodList: foodListReducer,
    foodDetails: foodDetailsReducer,
    foodDelete: foodDeleteReducer,
    foodCreate: foodCreateReducer,
    foodUpdate: foodUpdateReducer,
    foodReviewCreate: foodReviewCreateReducer,
    foodTopRated: foodTopRatedReducer,
    hotelList: hoteltListReducer,
    hotelDetails: hotelDetailsReducer,
    hotelDelete: hotelDeleteReducer,
    hotelCreate: hotelCreateReducer,
    hotelUpdate: hotelUpdateReducer,
    hotelReviewCreate: hotelReviewCreateReducer,
    cart: cartReducer,
    booking: bookingReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderFoodCreate: orderFoodCreateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    bookingCreate: bookingCreateReducer,
    bookingDetails: bookingDetailsReducer,
    bookingPay: bookingPayReducer,
    bookingListMy: bookingListMyReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderFoodDetails: orderFoodDetailsReducer,
    orderFoodPay: orderFoodPayReducer,
    orderFoodDeliver: orderFoodDeliverReducer,
    orderListMyFood: orderListMyFoodReducer,
    orderListFood: orderListFoodReducer,
    galleryList: galleryListReducer,
    galleryDetails: galleryDetailsReducer,
    galleryReviewCreate: galleryReviewCreateReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
const bookingFromStorage = localStorage.getItem('booking')
    ? JSON.parse(localStorage.getItem('booking'))
    : {}
const bookingHotelFromStorage = localStorage.getItem('bookingHotel')
    ? JSON.parse(localStorage.getItem('bookingHotel'))
    : {}
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}
const initialState = {
    cart:
    {
        cartItems: cartItemsFromStorage,
        booking: bookingFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    booking:{
        bookingHotel: bookingHotelFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store