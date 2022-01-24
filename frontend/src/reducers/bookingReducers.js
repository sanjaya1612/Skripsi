import { SAVE_BOOKING_HOTEL, BOOKING_SAVE_PAYMENT_METHOD } from '../constants/bookingConstants'

export const bookingReducer = (state = {  bookingHotel: {} }, action) => {
    switch (action.type) {
        case SAVE_BOOKING_HOTEL:
            return {
                ...state,
                bookingHotel: action.payload,
            }
        case BOOKING_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        default:
            return state
    }
}