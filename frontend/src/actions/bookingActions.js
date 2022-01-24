import { 
    SAVE_BOOKING_HOTEL,
    BOOKING_SAVE_PAYMENT_METHOD, 
} from "../constants/bookingConstants"

export const saveBookingHotel = (data) => (dispatch) => {
    dispatch({
        type: SAVE_BOOKING_HOTEL,
        payload: data,
    })

    localStorage.setItem('bookingHotel', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: BOOKING_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}