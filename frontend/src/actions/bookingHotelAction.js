import axios from "axios"
import { 
    BOOKING_CREATE_FAIL, 
    BOOKING_CREATE_REQUEST,  
    BOOKING_CREATE_SUCCESS,
    BOOKING_DETAILS_SUCCESS,
    BOOKING_DETAILS_FAIL,
    BOOKING_DETAILS_REQUEST,
    BOOKING_PAY_REQUEST,
    BOOKING_PAY_SUCCESS,
    BOOKING_PAY_FAIL, 
} from '../constants/bookingHotelConstants'

export const createBooking = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BOOKING_CREATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/bookings`, order, config
        )

        dispatch({
            type: BOOKING_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: BOOKING_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getBookingDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: BOOKING_DETAILS_REQUEST, 
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/bookings/${id}`, config)

        dispatch({
            type: BOOKING_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: BOOKING_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const payBooking = (bookingId, paymentResult) => async (dispatch, getState) => { 
    try {
        dispatch({
            type: BOOKING_PAY_REQUEST,
        })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(
            `/api/bookings/${bookingId}/pay`, paymentResult, config
        )
        dispatch({
            type: BOOKING_PAY_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: BOOKING_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}