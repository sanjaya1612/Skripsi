import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { foodListReducer, foodDetailsReducer } from './reducers/foodReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer
} from './reducers/userReducers'

import { orderFoodCreateReducer, orderFoodDetailsReducer} from './reducers/orderFoodReducers'

import { orderCreatedReducer, orderDetailsReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    foodList: foodListReducer,
    foodDetails: foodDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    orderFoodCreate: orderFoodCreateReducer,
    orderCreate: orderCreatedReducer,
    orderDetails: orderDetailsReducer,
    orderFoodDetailsReducer: orderFoodDetailsReducer,
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
    userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store