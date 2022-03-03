var mongoose = require('mongoose');

var gradeSchema = new mongoose.Schema({
    grade: String,
    year: Number

}, {
    collection: 'grades'
});
module.exports = mongoose.model('grades', gradeSchema);