import axios from 'axios'
import { 
    HOTEL_CREATE_FAIL,
    HOTEL_CREATE_REQUEST,
    HOTEL_CREATE_REVIEW_FAIL,
    HOTEL_CREATE_REVIEW_REQUEST,
    HOTEL_CREATE_REVIEW_SUCCESS,
    HOTEL_CREATE_SUCCESS,
    HOTEL_DELETE_FAIL, 
    HOTEL_DELETE_REQUEST, 
    HOTEL_DELETE_SUCCESS, 
    HOTEL_DETAILS_FAIL, 
    HOTEL_DETAILS_REQUEST, 
    HOTEL_DETAILS_SUCCESS, 
    HOTEL_LIST_FAIL, 
    HOTEL_LIST_REQUEST, 
    HOTEL_LIST_SUCCESS, 
    HOTEL_UPDATE_FAIL, 
    HOTEL_UPDATE_REQUEST,
    HOTEL_UPDATE_SUCCESS
} from '../constants/hotelConstants'

export const listHotels = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: HOTEL_LIST_REQUEST })
        const { data } = await axios.get(`/api/hotels?keyword=${keyword}`)

        dispatch({
            type: HOTEL_LIST_SUCCESS,
            payload: data, 
        })
    } catch (error) {
        dispatch({
            type: HOTEL_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listHotelDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: HOTEL_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/hotels/${id}`)

        dispatch({
            type: HOTEL_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: HOTEL_DETAILS_FAIL,
            payload:
                error.response && error.respond.data.message
                    ? error.respose.data.message
                    : error.message, 
        })
    }
}

export const deleteHotel = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOTEL_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        await axios.delete(`/api/hotels/${id}`, config)

        dispatch({
            type: HOTEL_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: HOTEL_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createHotel = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOTEL_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.post(`/api/hotels`, {}, config)

        dispatch({
            type: HOTEL_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HOTEL_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateHotel = (hotel) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOTEL_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.put(`/api/hotels/${hotel._id}`, hotel, config)

        dispatch({
            type: HOTEL_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: HOTEL_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const diffDays = (from,to) => {
    const day = 24 * 60 * 60 * 1000
    const start = new Date(from)
    const end = new Date(to)
    const difference = Math.round(Math.abs((start - end) / day))
    return difference
}

export const createHotelReview = (hotelId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: HOTEL_CREATE_REVIEW_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        } 
        await axios.post(`/api/hotels/${hotelId}/reviews`, review, config)

        dispatch({
            type: HOTEL_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: HOTEL_CREATE_REVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const searchListings = async (query) =>
  await axios.post(`api/search-listings`, query);
