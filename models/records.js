const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new mongoose.Schema();


module.exports = mongoose.model('Record', recordSchema);
