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
} from '../actions/types';
let initialState = {
    isCreateExamPending: false,
    exam: {},
    examList: [],
    isPending: false,

    isCreateQPaper: false,
    questionPaperSave: {},

    isGetQPaper: false,
    questionPaper: [],

    isSubmit: false,
    result: {}

}

export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_EXAM_PENDING:
            return { ...state, isCreateExamPending: true, exam: {} }
        case CREATE_EXAM_SUCCESS:
            return { ...state, isCreateExamPending: false, exam: action.payload }
        case CREATE_EXAM_ERROR:
            return { ...state, isCreateExamPending: false, exam: {} }
        case GET_EXAM_PENDING:
            return { ...state, isPending: true, examList: [] }
        case GET_EXAM_SUCCESS:

            return { ...state, isPending: false, examList: action.payload }
        case GET_EXAM_ERROR:
            return { ...state, isPending: false, examList: [] }

        case CREATE_QUESTION_PAPER_PENDING:
            return { ...state, isCreateQPaper: true, questionPaperSave: {} }
        case CREATE_QUESTION_PAPER_SUCCESS:
            return { ...state, isCreateQPaper: false, questionPaperSave: action.payload }
        case CREATE_QUESTION_PAPER_RROR:
            return { ...state, isCreateQPaper: false, questionPaperSave: {} }

        case GET_QUESTION_PAPER_PENDING:
            return { ...state, isGetQPaper: true, questionPaper: [] }
        case GET_QUESTION_PAPER_SUCCESS:
            return { ...state, isGetQPaper: false, questionPaper: action.payload }
        case GET_QUESTION_PAPER_RROR:
            return { ...state, isGetQPaper: false, questionPaper: [] }

        case SUBMIT_QUESTION_PAPER_PENDING:
            return { ...state, isSubmit: true, result: [] }
        case SUBMIT_QUESTION_PAPER_SUCCESS:
            return { ...state, isSubmit: false, result: action.payload }
        case SUBMIT_QUESTION_PAPER_RROR:
            return { ...state, isSubmit: false, result: [] }

        default:
            return state;
    }
};