import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_START: {
            return {
                ...state,
                orders: [],
                error: null,
                loading: true
            }
        }
        case actionTypes.FETCH_ORDERS_SUCCESS: {
            return {
                ...state,
                orders: action.orders,
                error: null,
                loading: false
            }
        }
        case actionTypes.FETCH_ORDERS_FAIL: {
            return {
                ...state,
                orders: [],
                error: action.error,
                loading: false
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;