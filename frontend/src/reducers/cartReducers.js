import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_BOOKING,
    CART_SAVE_PAYMENT_METHOD,
    
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAdress:{}, booking: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(x => x.food === item.food)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.food === existItem.food ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.food !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAdress: action.payload,
            }
        case CART_SAVE_BOOKING:
            return {
                ...state,
                booking: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        default:
            return state
    }
}