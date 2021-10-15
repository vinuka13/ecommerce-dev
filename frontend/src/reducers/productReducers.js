import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERROS
} from '../constants/productConstants'

export const productsReducer = (state = {products : [] }, action) => {
     if(action.type === ALL_PRODUCTS_REQUEST){
         return {
             loading: true,
             products: []
         }
     }

     if(action.type === ALL_PRODUCTS_SUCCESS){
        return {
            loading: false,
            products: action.payload.products,
            productsCount : action.payload.productsCount
        }
    }

    if(action.type === ALL_PRODUCTS_FAIL){
        return {
            loading: false,
            error: action.payload
        }
    }

    if(action.type === CLEAR_ERROS){
        return {
            ...state,
            error: null
        }
    } 

    else {
        return {
            state
        }
    }
 }