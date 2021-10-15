import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERROS
} from '../constants/productConstants'

import axios from 'axios'

export const getProducts = () => async (dispatch) => {
    try{
        dispatch({
            type: ALL_PRODUCTS_REQUEST
        })

       const { data } = await axios.get('/api/v1/products')

       dispatch({

           type: ALL_PRODUCTS_SUCCESS,
           payload: data
       })

    }
    catch(error){
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROS,
    })
}

 