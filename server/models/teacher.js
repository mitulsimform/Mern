var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
    user_id: String,
    grade_id: String,
    subject_id: String
}, {
    collection: 'teachers'
});
module.exports = mongoose.model('teachers', teacherSchema);