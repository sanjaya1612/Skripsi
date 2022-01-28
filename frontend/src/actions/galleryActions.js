import axios from 'axios'
import { 
    GALLERY_CREATE_REVIEW_FAIL,
    GALLERY_CREATE_REVIEW_REQUEST,
    GALLERY_CREATE_REVIEW_SUCCESS,
    GALLERY_DETAILS_FAIL,
    GALLERY_DETAILS_REQUEST,
    GALLERY_DETAILS_SUCCESS,
    GALLERY_LIST_FAIL,
    GALLERY_LIST_REQUEST, 
    GALLERY_LIST_SUCCESS, 
} from '../constants/galleryConstants'

export const listGalleries = () => async (dispatch) => {
    try {
        dispatch({ type: GALLERY_LIST_REQUEST })
        const { data } = await axios.get('/api/galleries')

        dispatch({
            type: GALLERY_LIST_SUCCESS,
            payload: data, 
        })
    } catch (error) {
        dispatch({
            type: GALLERY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listGalleryDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GALLERY_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/galleries/${id}`)

        dispatch({
            type: GALLERY_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: GALLERY_DETAILS_FAIL,
            payload:
                error.response && error.respond.data.message
                    ? error.respose.data.message
                    : error.message, 
        })
    }
}

export const createGalleryReview = (galleryId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GALLERY_CREATE_REVIEW_REQUEST
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
        await axios.post(`/api/galleries/${galleryId}/reviews`, review, config)

        dispatch({
            type: GALLERY_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: GALLERY_CREATE_REVIEW_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}