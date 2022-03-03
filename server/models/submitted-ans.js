var mongoose = require('mongoose');

var submittedSchema = new mongoose.Schema({
    exam_id: String,
    student_id: String,
    answers: Array,
    subject_id: String,
    grade_id: String
}, {
    collection: 'submitted_ans'
});
module.exports = mongoose.model('submitted_ans', submittedSchema);