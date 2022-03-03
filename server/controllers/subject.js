const Response = require('../utils/send-response')
const subjectService = require('../services/subject')

exports.getSubjectList = async function (req, res, next) {
    try {
        let subjects = await subjectService.getSubjectList()
        return Response.sendJsonResponse(req, res, 200, subjects, "Success")

    } catch (exception) {
        console.log('exception', exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}