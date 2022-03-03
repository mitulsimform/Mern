var mongoose = require('mongoose');

var examSchema = new mongoose.Schema({
    subject_id: String,
    grade_id: String

}, {
    collection: 'exams'
});
module.exports = mongoose.model('exams', examSchema);