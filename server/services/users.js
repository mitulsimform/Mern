const userModel = require('../models/users');
const teacherModel = require('../models/teacher');
const studentModel = require('../models/student');
var mongoose = require('mongoose');

exports.createUser = async function (user) {
    try {
        let userDetails = await userModel.create(user);
        return userDetails;
    } catch (exception) {

    }
}

exports.createTeachers = async function (user) {
    try {
        let userDetails = await teacherModel.create(user);
        return userDetails;
    } catch (exception) {

    }
}

exports.createStudents = async function (user) {
    try {
        let userDetails = await studentModel.create(user);
        return userDetails;
    } catch (exception) {

    }
}


exports.findUser = async function (user) {
    try {
        let userDetails = await userModel.findOne({ email: user.email });
        return userDetails;
    } catch (exception) {

    }
}


exports.updateUser = async function (user, updatableDetail) {
    try {

        let userDetails = await userModel.updateOne({ _id: mongoose.Types.ObjectId(user._id) }, updatableDetail);
        return userDetails;
    } catch (exception) {

    }
}


exports.getUserList = async function (type) {
    try {
        let userDetails = await userModel.find({ role: type }, '_id name email');
        return userDetails;
    } catch (exception) {

    }
}
