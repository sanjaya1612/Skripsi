import axios from "axios"
import { 
    BOOKING_CREATE_FAIL, 
    BOOKING_CREATE_REQUEST, 
    BOOKING_CREATE_SUCCESS 
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