import axios from 'axios'
import {
    ORDER_FOOD_CREATE_REQUEST,
    ORDER_FOOD_CREATE_SUCCESS,
    ORDER_FOOD_CREATE_FAIL,
    ORDER_FOOD_DETAILS_REQUEST,
    ORDER_FOOD_DETAILS_FAIL,
    ORDER_FOOD_DETAILS_SUCCESS
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
            `/api/foods`, order, config
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
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/foods/${id}`,config
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