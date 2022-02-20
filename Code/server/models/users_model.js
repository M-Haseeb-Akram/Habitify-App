const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    googleId: {type: 'String'},
    Name: {type: 'String', required: true},
    email: {type: 'String', required: true},
    picture: {type: 'String'},
});
module.exports = mongoose.model('Users', Users);
