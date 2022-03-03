import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    USER_CREATE_SUCCESS,
    USER_CREATE_ERROR
} from '../actions/types';

export const reducer = (state = {}, action) => {

    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true }
        case UNAUTH_USER:
            return { ...state, authenticated: false }
        case AUTH_ERROR:
            return { ...state, error: action.payload }
        case USER_CREATE_SUCCESS:
            return { ...state, isCreated: true }
        case USER_CREATE_ERROR:
            return { ...state, isCreated: false }


        default:
            return state;
    }
};