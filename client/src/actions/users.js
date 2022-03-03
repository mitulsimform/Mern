import axios from 'axios';
import History from '../history.js';
import { message } from 'antd';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_FEATURE,
    USER_CREATE_SUCCESS,
    USER_CREATE_ERROR,
    GET_USER_PENDING,
    GET_USER_SUCCESS,
    GET_USER_ERROR
} from './types';

import { ROOT_URL } from '../config'


export const signinUser = ({ email, password }) => {

    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${ROOT_URL}/users/sign-in`, { email, password })
            .then(response => {

                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });

                // - save the jwt token
                localStorage.setItem('token', response.data.data.auth);

                // - redirect to the route '/feature'


            }).catch(() => {
                History.push('/signin')
                // if request is bad...
                // - show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    };
};


export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const createUserError = (error) => {
    return {
        type: USER_CREATE_ERROR,
        payload: error
    };
};

export const signoutUser = () => {
    localStorage.removeItem('token')
    return { type: UNAUTH_USER };
};



export const createUser = (user, type) => {

    return (dispatch) => {
        const header = {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }
        // submit email/password to the server
        axios.post(`${ROOT_URL}/users/create`, user, header)
            .then(response => {

                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: USER_CREATE_SUCCESS });
                message.success('saved')
                // - redirect to the route '/feature'
                History.push(`/${type}s`);

            }).catch(() => {

                // if request is bad...
                // - show an error to the user
                dispatch(createUserError('Bad Login Info'));
            });
    };
};

export const getListOfUser = (userType) => {
    return (dispatch) => {
        // submit email/password to the server
        const header = {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }
        dispatch({ type: GET_USER_PENDING })
        axios.get(`${ROOT_URL}/users/${userType}`, header)
            .then(response => {
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: GET_USER_SUCCESS, payload: response.data.data })

                // - redirect to the route '/feature'
                // History.push('/dashboard');

            }).catch(() => {
                dispatch({ type: GET_USER_ERROR })
                // if request is bad...
                // - show an error to the user
            });
    };

}