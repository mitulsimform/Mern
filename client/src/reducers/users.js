import {
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR
} from '../actions/types';

export const reducer = (state = { users: [] }, action) => {

    switch (action.type) {
        case GET_USER_PENDING:
            return { ...state, isPending: true, users: [] }
        case GET_USER_SUCCESS:
            return { ...state, isPending: false, users: action.payload }
        case GET_USER_ERROR:
            return { ...state, isPending: false, users: [] }
        default:
            return state;
    }
};