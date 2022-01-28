import { 
    GALLERY_CREATE_REVIEW_FAIL,
    GALLERY_CREATE_REVIEW_REQUEST,
    GALLERY_CREATE_REVIEW_RESET,
    GALLERY_CREATE_REVIEW_SUCCESS,
    GALLERY_DETAILS_FAIL,
    GALLERY_DETAILS_REQUEST,
    GALLERY_DETAILS_SUCCESS,
    GALLERY_LIST_FAIL,
    GALLERY_LIST_REQUEST, 
    GALLERY_LIST_SUCCESS, 
} from "../constants/galleryConstants"

export const galleryListReducer = (state = { galleries: [] }, action) => {
    switch (action.type) {
        case GALLERY_LIST_REQUEST:
            return { loading: true, galleries: [] }
        case GALLERY_LIST_SUCCESS:
            return { loading: false, galleries: action.payload }
        case GALLERY_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const galleryReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case GALLERY_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case GALLERY_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case GALLERY_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case GALLERY_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

export const galleryDetailsReducer = (state = { gallery: { reviews: [] } },
    action) => {
    switch (action.type) {
        case GALLERY_DETAILS_REQUEST:
            return { loading: true, ...state }
        case GALLERY_DETAILS_SUCCESS:
            return { loading: false, gallery: action.payload }
        case GALLERY_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}