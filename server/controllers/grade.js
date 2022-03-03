const Response = require('../utils/send-response')
const gradeService = require('../services/grade')

exports.getSubjectList = async function (req, res, next) {
    try {
        let subjects = await gradeService.getGradeList()
        return Response.sendJsonResponse(req, res, 200, subjects, "Success")

    } catch (exception) {
        console.log('exception', exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}