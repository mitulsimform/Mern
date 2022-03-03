var mongoose = require('mongoose');

var examResultSchema = new mongoose.Schema({
    exam_id: String,
    total: String,
    result: String,
    student_id: String,
    subject_id: String,
    grade_id: String

}, {
    collection: 'exams_result'
});
module.exports = mongoose.model('exams_result', examResultSchema);