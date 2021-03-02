import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        meat: 0,
        bacon: 0,
        cheese: 0,  
        salad: 0
    },
    totalPrice: 4,
    building: false
}

const INGREDIENTS_PRICES = {
    meat: 1.3,
    bacon: 1,
    cheese: 0.7,
    salad: 0.5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] + 1
                    },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingName],
                building: true
            }
        }
        case actionTypes.REMOVE_INGREDIENT: {
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1
                    },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingName],
                building: true    
            }
        }
        case actionTypes.INIT_INGREDIENTS: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}

export default reducer;