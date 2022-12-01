const mongoose = require('mongoose')
const { model, Schema } = mongoose

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
    leagues: [
        { 
            type: mongoose.Types.ObjectId,
            ref: 'League'  
        }
    ]
})

module.exports = model('User', userSchema)