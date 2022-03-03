const subjectModel = require('../models/subject')

exports.getSubjectList = async function () {
    try {
        let subject = await subjectModel.find();
        return subject;
    } catch (exception) {

    }
}
