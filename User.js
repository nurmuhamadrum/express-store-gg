const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true, 'name cannot be empty']
    },
    age: {
        type: Number,
        required: [true, 'age cannot be empty']
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User