import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productListReducer, 
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreateReviewReducer
} from './reducers/productReducers'
import { 
    foodListReducer, 
    foodDetailsReducer,
    foodDeleteReducer,
    foodCreateReducer,
    foodUpdateReducer,
    foodReviewCreateReducer,
} from './reducers/foodReducers'
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

import { orderCreatedReducer, orderDetailsReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    foodList: foodListReducer,
    foodDetails: foodDetailsReducer,
    foodDelete: foodDeleteReducer,
    foodCreate: foodCreateReducer,
    foodUpdate: foodUpdateReducer,
    foodReviewCreate: foodReviewCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderFoodCreate: orderFoodCreateReducer,
    orderCreate: orderCreatedReducer,
    orderDetails: orderDetailsReducer,
    orderFoodDetails: orderFoodDetailsReducer,
    orderFoodPay: orderFoodPayReducer,
    orderFoodDeliver: orderFoodDeliverReducer,
    orderListMyFood: orderListMyFoodReducer,
    orderListFood: orderListFoodReducer,

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