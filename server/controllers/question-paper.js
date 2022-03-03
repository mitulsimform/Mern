const Response = require('../utils/send-response');
const questionPService = require('../services/question-paper');
const submittedModel = require('../models/submitted-ans');
const resultModel = require('../models/exam-result');

exports.createQuestionPaper = async function (req, res, next) {
    try {
        let subjects = await questionPService.createQuestionPaper(req.body)
        return Response.sendJsonResponse(req, res, 200, subjects, "Success")

    } catch (exception) {
        console.log(exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}



exports.getQuestionPaper = async function (req, res, next) {
    try {
        let questions = await questionPService.getQuestionPaper(req.body)

        let resObj = { ...req.body, student_id: req.userData._id.toString() }
        console.log('resObj', resObj)
        let result = await resultModel.find(resObj)
        if (result.length > 0 && req.userData.role === 3) {
            return Response.sendJsonResponse(req, res, 200, result[0], "Success")
        } else {
            return Response.sendJsonResponse(req, res, 200, questions, "Success")
        }

    } catch (exception) {
        console.log(exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}


exports.submitExamForResult = async function (req, res, next) {
    try {
        console.log('req.body', req.body)

        let questionQuery = {
            exam_id: req.body.exam_id,
            subject_id: req.body.subject_id,
            grade_id: req.body.grade_id
        }
        let questions = await questionPService.getQuestionPaper(questionQuery)
        console.log('questions', questions)
        let answers = req.body.answers || []
        let count = 0;
        answers.forEach(ans => {
            let checkAns = questions.find((ca) => ca._id.toString() === ans.question_id)
            console.log('checkAns', checkAns)
            if (checkAns.right_answer === ans.submitted_answer) {
                count = count + 1
            }
        });
        let myResult = {
            exam_id: req.body.exam_id,
            total: answers.length,
            result: count,
            student_id: req.userData._id,
            subject_id: req.body.subject_id,
            grade_id: req.body.grade_id
        }
        let results = await resultModel.create(myResult)
        req.body.student_id = req.userData._id;
        let submittedAnswers = await submittedModel.create(req.body)
        return Response.sendJsonResponse(req, res, 200, results, "Success")
    } catch (exception) {
        console.log(exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}

