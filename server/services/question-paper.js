const questionPModel = require('../models/question-paper')

exports.createQuestionPaper = async function (question) {
    try {
        let userDetails = await questionPModel.create(question);
        return userDetails;
    } catch (exception) {

    }
}

exports.getQuestionPaper = async function (exm) {
    try {
        let userDetails = await questionPModel.find(exm);
        return userDetails;
    } catch (exception) {

    }
}