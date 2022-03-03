const grateModel = require('../models/grade')

exports.getGradeList = async function () {
    try {
        let subject = await grateModel.find();
        return subject;
    } catch (exception) {

    }
}
