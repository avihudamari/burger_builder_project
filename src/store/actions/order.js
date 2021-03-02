import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        // const queryParams = '?auth=' + token ;
        axios.get('/orders.json' + queryParams)
        .then(response => {
            dispatch(fetchOrdersSuccess(response.data));
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error));
        });
    }
}