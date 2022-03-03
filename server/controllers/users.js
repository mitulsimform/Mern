const userService = require('../services/users')
const Response = require('../utils/send-response')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const studentModel = require('../models/student')
const teacherModel = require('../models/teacher')

exports.createUsers = async function (req, res, next) {
    try {

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(String(req.body.email).toLowerCase())) {
            return Response.sendJsonResponse(req, res, 500, {}, "Invalid Email", null)
        }
        let userDetails = req.body
        bcrypt.hash(userDetails.password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.

            let userDetailsObj = {
                name: userDetails.name,
                email: userDetails.email.toLowerCase(),
                password: hash,
                role: userDetails.role
            }
            let user = await userService.createUser(userDetailsObj);
            let teacher = {}
            let student = {}

            if (userDetails.role === 2) {
                let teacherDetails = {
                    grade_id: userDetails.grade_id,
                    user_id: user._id,
                    subject_id: userDetails.subject_id
                }
                teacher = await userService.createTeachers(teacherDetails)
            } else if (userDetails.role === 3) {
                let studentDetails = {
                    grade_id: userDetails.grade_id,
                    user_id: user._id,
                    selected_subjects: userDetails.selected_subject
                }
                student = await userService.createStudents(studentDetails)
            }

            return Response.sendJsonResponse(req, res, 200, { ...user, ...teacher, ...student }, "Success")
        });


    } catch (exception) {
        console.log('exception', exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}

exports.signInUser = async function (req, res, next) {
    try {
        let userDetails = req.body
        userDetails.email = userDetails.email.toLowerCase()
        console.log('userDetails', userDetails)
        let user = await userService.findUser(userDetails)
        if (user) {
            // Load hash from your password DB.
            bcrypt.compare(userDetails.password, user.password, async function (err, result) {
                if (result) {


                    var grade_id = null
                    var subject_id = null
                    if (user.role === 1) {

                    } else if (user.role === 2) {
                        let teacherdet = await teacherModel.find({ user_id: user._id.toString() })
                        grade_id = teacherdet[0].grade_id;
                        subject_id = teacherdet[0].subject_id;
                    } else {
                        let studentDet = await studentModel.find({ user_id: user._id.toString() })
                        grade_id = studentDet[0].grade_id;
                    }


                    var token = jwt.sign({ _id: user._id, role: user.role, grade_id, subject_id }, 'test');
                    let updateUser = await userService.updateUser(user, { auth: token })
                    return Response.sendJsonResponse(req, res, 200, { auth: token }, "Success")
                } else {
                    return Response.sendJsonResponse(req, res, 401, {}, "failure", true)
                }
            });

        } else {
            return Response.sendJsonResponse(req, res, 404, {}, "not found", true)
        }




    } catch (exception) {
        console.log('exception', exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}



exports.getUsers = async function (req, res, next) {
    try {
        let type = req.params.type;
        console.log('type', type)
        type = type === 'teacher' ? 2 : 3;
        let user = await userService.getUserList(type)
        return Response.sendJsonResponse(req, res, 200, user, "Success")

    } catch (exception) {
        console.log('exception', exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}