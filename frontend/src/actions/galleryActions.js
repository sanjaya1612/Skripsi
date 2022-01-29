import axios from 'axios'
import { 
    GALLERY_CREATE_FAIL,
    GALLERY_CREATE_REQUEST,
    GALLERY_CREATE_REVIEW_FAIL,
    GALLERY_CREATE_REVIEW_REQUEST,
    GALLERY_CREATE_REVIEW_SUCCESS,
    GALLERY_CREATE_SUCCESS,
    GALLERY_DELETE_FAIL,
    GALLERY_DELETE_REQUEST,
    GALLERY_DELETE_SUCCESS,
    GALLERY_DETAILS_FAIL,
    GALLERY_DETAILS_REQUEST,
    GALLERY_DETAILS_SUCCESS,
    GALLERY_LIST_FAIL,
    GALLERY_LIST_REQUEST, 
    GALLERY_LIST_SUCCESS,
    GALLERY_TOP_FAIL,
    GALLERY_TOP_REQUEST,
    GALLERY_TOP_SUCCESS,
    GALLERY_UPDATE_FAIL,
    GALLERY_UPDATE_REQUEST,
    GALLERY_UPDATE_SUCCESS, 
} from '../constants/galleryConstants'

export const listGalleries = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: GALLERY_LIST_REQUEST })
        const { data } = await axios.get(`/api/galleries?keyword=${keyword}`)

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

export const deleteGallery = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GALLERY_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        await axios.delete(`/api/galleries/${id}`, config)

        dispatch({
            type: GALLERY_DELETE_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: GALLERY_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const createGallery = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GALLERY_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const {data} = await axios.post(`/api/galleries`, {}, config)

        dispatch({
            type: GALLERY_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GALLERY_CREATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const updateGallery = (gallery) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GALLERY_UPDATE_REQUEST
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
        const { data } = await axios.put(`/api/galleries/${gallery._id}`, gallery, config)

        dispatch({
            type: GALLERY_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GALLERY_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listTopGalleries = () => async (dispatch) => {
    try {
        dispatch({ type: GALLERY_TOP_REQUEST })
        const { data } = await axios.get('/api/galleries/topgallery')

        dispatch({
            type: GALLERY_TOP_SUCCESS,
            payload: data, 
        })
    } catch (error) {
        dispatch({
            type: GALLERY_TOP_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}