const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {type: String, unique: true},
    firstName : {type: String, required: true},
    lastName: String,
    age: {type:Number, min:0}
});

module.exports = mongoose.model('User', userSchema);