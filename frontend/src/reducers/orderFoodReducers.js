import {
    ORDER_FOOD_CREATE_REQUEST,
    ORDER_FOOD_CREATE_SUCCESS,
    ORDER_FOOD_CREATE_FAIL,
    ORDER_FOOD_DETAILS_REQUEST,
    ORDER_FOOD_DETAILS_SUCCESS,
    ORDER_FOOD_DETAILS_FAIL,
    ORDER_FOOD_PAY_REQUEST,
    ORDER_FOOD_PAY_SUCCESS,
    ORDER_FOOD_PAY_FAIL,
    ORDER_FOOD_PAY_RESET,
    ORDER_FOOD_LIST_MY_REQUEST,
    ORDER_FOOD_LIST_MY_SUCCESS,
    ORDER_FOOD_LIST_MY_FAIL,
    ORDER_FOOD_LIST_MY_RESET,
    ORDER_FOOD_LIST_SUCCESS,
    ORDER_FOOD_LIST_FAIL,
    ORDER_FOOD_LIST_REQUEST,
    ORDER_FOOD_DELIVER_SUCCESS,
    ORDER_FOOD_DELIVER_FAIL,
    ORDER_FOOD_DELIVER_REQUEST,
    ORDER_FOOD_DELIVER_RESET,
} from '../constants/foodOrderConstants'

export const orderFoodCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_FOOD_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_FOOD_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_FOOD_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderFoodDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_FOOD_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_FOOD_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_FOOD_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderFoodPayReducer = (
    state = {}, action) => {
    switch (action.type) {
        case ORDER_FOOD_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_FOOD_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_FOOD_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_FOOD_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const orderFoodDeliverReducer = (
    state = {}, action) => {
    switch (action.type) {
        case ORDER_FOOD_DELIVER_REQUEST:
            return {
                loading: true
            }
        case ORDER_FOOD_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case ORDER_FOOD_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_FOOD_DELIVER_RESET:
            return {}
        default:
            return state
    }
}

export const orderListMyFoodReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_FOOD_LIST_MY_REQUEST:
             return {
                 loading: true
             }
        case ORDER_FOOD_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_FOOD_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_FOOD_LIST_MY_RESET:
            return {orders: []}
        default:
            return state
    }
}

export const orderListFoodReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_FOOD_LIST_REQUEST:
             return {
                 loading: true
             }
        case ORDER_FOOD_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_FOOD_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}