var mongoose = require('mongoose');

var examSchema = new mongoose.Schema({
    exam_id: String,
    subject_id: String,
    grade_id: String,
    question: String,
    right_answer: String,
    options: Object

}, {
    collection: 'question_paper'
});
module.exports = mongoose.model('question_paper', examSchema);