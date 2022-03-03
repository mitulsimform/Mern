const examService = require('../services/exams');
const Response = require('../utils/send-response');
const gradeService = require('../services/grade');
const subjectService = require('../services/subject')
const async = require('async');
const studentModel = require('../models/student')
const teacherModel = require('../models/teacher')

exports.createExam = async function (req, res, next) {
    try {
        let exm = await examService.createExam(req.body)
        return Response.sendJsonResponse(req, res, 200, exm, "Success")
    } catch (exception) {
        console.log('exception', exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}

exports.getExams = async function (req, res, next) {
    try {
        let grades = await gradeService.getGradeList()
        let subject = await subjectService.getSubjectList()

        let examList = await examService.getExams();
        console.log('examList', examList)

        let studentDet = await studentModel.find({ user_id: req.userData._id.toString() })
        let teacherdet = await teacherModel.find({ user_id: req.userData._id.toString() })
        console.log('teacherdet', teacherdet)
        let arrayOfEx = []
        examList.forEach((ex) => {
            if (studentDet.length > 0 && ex.grade_id === studentDet[0].grade_id && req.userData.role === 3) {
                if (studentDet[0].selected_subjects.find(e => e.subject_id === ex.subject_id)) {
                    let grd = grades.find((g) => g._id.toString() === ex.grade_id);
                    let sb = subject.find((s) => s._id.toString() === ex.subject_id);
                    let data = JSON.parse(JSON.stringify(ex))
                    data.grade = grd.grade;
                    data.subject = sb.name;
                    arrayOfEx.push(data)
                }

            } else {
                if (teacherdet.length > 0 && ex.grade_id === teacherdet[0].grade_id && req.userData.role === 2) {
                    if (teacherdet[0].subject_id === ex.subject_id) {
                        let grd = grades.find((g) => g._id.toString() === ex.grade_id);
                        let sb = subject.find((s) => s._id.toString() === ex.subject_id);
                        let data = JSON.parse(JSON.stringify(ex))
                        data.grade = grd.grade;
                        data.subject = sb.name;
                        arrayOfEx.push(data)
                    }
                }
                if (req.userData.role === 1) {
                    let grd = grades.find((g) => g._id.toString() === ex.grade_id);
                    let sb = subject.find((s) => s._id.toString() === ex.subject_id);
                    let data = JSON.parse(JSON.stringify(ex))
                    data.grade = grd.grade;
                    data.subject = sb.name;
                    arrayOfEx.push(data)
                }

            }
        })
        return Response.sendJsonResponse(req, res, 200, arrayOfEx, "Success")
    } catch (exception) {
        console.log(exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}
