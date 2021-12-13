import axios from 'axios'
import { 
    FOOD_LIST_REQUEST,
    FOOD_LIST_SUCCESS,
    FOOD_LIST_FAIL,
    FOOD_DETAILS_REQUEST,
    FOOD_DETAILS_SUCCESS,
    FOOD_DETAILS_FAIL,
} from '../constants/foodConstants'

export const listFoods = () => async (dispatch) => {
    try{
        dispatch({ type: FOOD_LIST_REQUEST})
        const {data} = await axios.get('/api/foods')

        dispatch({
            type: FOOD_LIST_SUCCESS,
            payload: data,
        })
    } catch (error){
        dispatch({
            type: FOOD_LIST_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        })
    }
}

export const listFoodDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: FOOD_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/foods/${id}`)

        dispatch({
            type: FOOD_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error){
        dispatch({
            type: FOOD_DETAILS_FAIL,
            payload:
            error.response && error.respond.data.message
            ? error.respose.data.message
            : error.message,
        })
    }
}