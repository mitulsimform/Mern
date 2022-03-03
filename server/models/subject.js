var mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
    name: String

}, {
    collection: 'subjects'
});
module.exports = mongoose.model('subjects', subjectSchema);