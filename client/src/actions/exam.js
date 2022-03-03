
import axios from 'axios';
import History from '../history.js';
import { message } from 'antd';
import {
    CREATE_EXAM_PENDING,
    CREATE_EXAM_SUCCESS,
    CREATE_EXAM_ERROR,

    GET_EXAM_PENDING,
    GET_EXAM_SUCCESS,
    GET_EXAM_ERROR,

    CREATE_QUESTION_PAPER_PENDING,
    CREATE_QUESTION_PAPER_SUCCESS,
    CREATE_QUESTION_PAPER_RROR,

    GET_QUESTION_PAPER_PENDING,
    GET_QUESTION_PAPER_SUCCESS,
    GET_QUESTION_PAPER_RROR,

    SUBMIT_QUESTION_PAPER_PENDING,
    SUBMIT_QUESTION_PAPER_SUCCESS,
    SUBMIT_QUESTION_PAPER_RROR
} from './types';

import { ROOT_URL } from '../config'


export const createExam = (exm) => {
    const header = {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    }
    return (dispatch) => {
        // submit email/password to the server
        dispatch({ type: CREATE_EXAM_PENDING })
        axios.post(`${ROOT_URL}/exams`, exm, header)
            .then(response => {

                dispatch({ type: CREATE_EXAM_SUCCESS, payload: {} })
                History.push('/exams')
                message.success('saved')
            }).catch(() => {
                dispatch({ type: CREATE_EXAM_ERROR })
            });
    };
};


export const getExamsList = () => {
    const header = {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    }

    return (dispatch) => {
        dispatch({ type: SUBMIT_QUESTION_PAPER_RROR })
        // submit email/password to the server
        dispatch({ type: GET_EXAM_PENDING })
        axios.get(`${ROOT_URL}/exams/get-exams`, header)
            .then(response => {

                dispatch({ type: GET_EXAM_SUCCESS, payload: response.data.data })

            }).catch(() => {
                dispatch({ type: GET_EXAM_ERROR })
            });
    };
};



export const createQuestionPaper = (exm) => {
    const header = {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    }
    return (dispatch) => {
        // submit email/password to the server
        dispatch({ type: CREATE_QUESTION_PAPER_PENDING })
        axios.post(`${ROOT_URL}/exams/create-question-paper`, exm, header)
            .then(response => {
                message.success('saved')
                dispatch({ type: CREATE_QUESTION_PAPER_SUCCESS, payload: {} })
                History.push('/exams')

            }).catch(() => {
                dispatch({ type: CREATE_QUESTION_PAPER_RROR })
            });
    };
};



export const getQuestionPaper = (exm) => {
    const header = {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    }
    return (dispatch) => {
        // submit email/password to the server
        dispatch({ type: GET_QUESTION_PAPER_PENDING })
        axios.post(`${ROOT_URL}/exams/get-question-paper`, exm, header)
            .then(response => {

                if (response.data.data.result) {
                    dispatch({ type: SUBMIT_QUESTION_PAPER_SUCCESS, payload: response.data.data })
                } else {
                    dispatch({ type: GET_QUESTION_PAPER_SUCCESS, payload: response.data.data })

                }



            }).catch(() => {
                dispatch({ type: GET_QUESTION_PAPER_RROR })
            });
    };
};

export const submittPaper = (exm) => {

    const header = {
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    }
    return (dispatch) => {

        // submit email/password to the server
        dispatch({ type: SUBMIT_QUESTION_PAPER_PENDING })
        axios.post(`${ROOT_URL}/exams/submit-exam`, exm, header)
            .then(response => {
                message.success('saved')
                dispatch({ type: SUBMIT_QUESTION_PAPER_SUCCESS, payload: response.data.data })

            }).catch(() => {
                dispatch({ type: SUBMIT_QUESTION_PAPER_RROR })
            });
    };
};