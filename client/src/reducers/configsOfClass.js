import {
    GET_GRADE_PENDING,
    GET_GRADE_SUCCESS,
    GET_GRADE_ERROR,
    GET_SUBJECT_PENDING,
    GET_SUBJECT_SUCCESS,
    GET_SUBJECT_ERROR
} from '../actions/types';

let initialState = {
    isGradePending: false,
    grades: [],
    isSubjectsPending: false,
    subjects: [],
}
export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_GRADE_PENDING:
            return { ...state, isGradePending: true }
        case GET_GRADE_SUCCESS:
            return { ...state, isGradePending: false, grades: action.payload }
        case GET_GRADE_ERROR:
            return { ...state, isGradePending: false }
        case GET_SUBJECT_PENDING:
            return { ...state, isSubjectsPending: true }
        case GET_SUBJECT_SUCCESS:
            return { ...state, isSubjectsPending: false, subjects: action.payload }
        case GET_SUBJECT_ERROR:
            return { ...state, isSubjectsPending: false }


        default:
            return state;
    }
};