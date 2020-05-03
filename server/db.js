const mongoose = require('mongoose')
mongoose.connect('mongodb://dragan:emi99sg@ds159020.mlab.com:59020/qa_webapi');
const db = mongoose.connection;

module.exports = db;