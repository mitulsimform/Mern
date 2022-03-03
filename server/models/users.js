var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    auth: String,
    email: String,
    password: String,
    role: Number,
    activate: { type: Boolean, default: true },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now }

}, {
    collection: 'user'
});
module.exports = mongoose.model('user', userSchema);