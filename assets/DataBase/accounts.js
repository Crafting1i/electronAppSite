const { Schema, model } = require('mongoose')

const accounts = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
    }
})

module.exports = model('Accounts', accounts)