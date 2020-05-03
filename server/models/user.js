const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    createdDate: {type: Date, default: Date.now},
    updatedDate: {type: Date, default: Date.now},
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel;


