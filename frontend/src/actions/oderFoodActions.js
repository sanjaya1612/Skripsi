import axios from 'axios'
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
    ORDER_FOOD_LIST_MY_REQUEST,
    ORDER_FOOD_LIST_MY_SUCCESS,
    ORDER_FOOD_LIST_MY_FAIL,
    ORDER_FOOD_LIST_REQUEST,
    ORDER_FOOD_LIST_SUCCESS,
    ORDER_FOOD_LIST_FAIL,
    ORDER_FOOD_DELIVER_REQUEST,
    ORDER_FOOD_DELIVER_SUCCESS,
    ORDER_FOOD_DELIVER_FAIL,
} from '../constants/foodOrderConstants'

export const createFoodOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_FOOD_CREATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/orderfoods`, order, config
        )

        dispatch({
            type: ORDER_FOOD_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_FOOD_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getOrderFoodDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_FOOD_DETAILS_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `/api/orderfoods/${id}`, config
        )
        dispatch({
            type: ORDER_FOOD_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_FOOD_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const payFoodOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_FOOD_PAY_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(
            `/api/orderfoods/${orderId}/pay`, paymentResult, config
        )
        dispatch({
            type: ORDER_FOOD_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_FOOD_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deliverFoodOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_FOOD_DELIVER_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(
            `/api/orderfoods/${order._id}/deliver`, {}, config
        )
        dispatch({
            type: ORDER_FOOD_DELIVER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_FOOD_DELIVER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listMyFoodOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_FOOD_LIST_MY_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `/api/orderfoods/myfoods`, config
        )
        dispatch({
            type: ORDER_FOOD_LIST_MY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_FOOD_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listFoodOrders = (keydate = []) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_FOOD_LIST_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(
            `/api/orderfoods?keydate=${keydate}`, config
        )
        console.log(keydate)
        dispatch({
            type: ORDER_FOOD_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: ORDER_FOOD_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}