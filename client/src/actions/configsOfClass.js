import axios from 'axios';
import History from '../history.js';
import {
    GET_GRADE_PENDING,
    GET_GRADE_SUCCESS,
    GET_GRADE_ERROR,
    GET_SUBJECT_PENDING,
    GET_SUBJECT_SUCCESS,
    GET_SUBJECT_ERROR
} from './types';

import { ROOT_URL } from '../config'

export const getGradeList = () => {
    const header = {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    }
    return (dispatch) => {
        // submit email/password to the server
        dispatch({ type: GET_GRADE_PENDING })
        axios.get(`${ROOT_URL}/grades`, header)
            .then(response => {
                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: GET_GRADE_SUCCESS, payload: response.data.data })

                // - redirect to the route '/feature'
                // History.push('/dashboard');

            }).catch(() => {
                dispatch({ type: GET_GRADE_ERROR })
                // if request is bad...
                // - show an error to the user
            });
    };

}


export const getSubjectList = () => {
    const header = {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    }
    return (dispatch) => {
        // submit email/password to the server

        dispatch({ type: GET_SUBJECT_PENDING })
        axios.get(`${ROOT_URL}/subject`, header)
            .then(response => {

                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: GET_SUBJECT_SUCCESS, payload: response.data.data })

                // - redirect to the route '/feature'
                // History.push('/dashboard');

            }).catch(() => {
                dispatch({ type: GET_SUBJECT_ERROR })
                // if request is bad...
                // - show an error to the user
            });
    };

}