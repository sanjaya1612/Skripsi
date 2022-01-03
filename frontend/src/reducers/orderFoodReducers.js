import {
    ORDER_FOOD_CREATE_REQUEST,
    ORDER_FOOD_CREATE_SUCCESS,
    ORDER_FOOD_CREATE_FAIL,
    ORDER_FOOD_DETAILS_REQUEST,
    ORDER_FOOD_DETAILS_SUCCESS,
    ORDER_FOOD_DETAILS_FAIL,
} from '../constants/foodOrderConstants'

export const orderFoodCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_FOOD_CREATE_REQUEST:
            return {
                laodiing: true
            }
        case ORDER_FOOD_CREATE_SUCCESS:
            return {
                laodiing: false,
                success: true,
                order: action.payload
            }
        case ORDER_FOOD_CREATE_FAIL:
            return {
                laodiing: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderFoodDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action) => {
    switch (action.type) {
        case ORDER_FOOD_DETAILS_REQUEST:
            return {
                ...state,
                laodiing: true
            }
        case ORDER_FOOD_DETAILS_SUCCESS:
            return {
                laodiing: false,
                order: action.payload
            }
        case ORDER_FOOD_DETAILS_FAIL:
            return {
                laodiing: false,
                error: action.payload
            }
        default:
            return state
    }
}