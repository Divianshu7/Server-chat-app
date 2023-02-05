import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    },
})
userSchema.pre('save', function (next) {
    let user = this
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 12, function (err, hash) {
            if (err) {
                console.log('password hashing error ', err)
                return next(err)
            } else {
                user.password = hash
                return next()
            }
        })
    } else {
        return next()
    }
})

userSchema.methods.comparePasswords = function (password, next) {
    bcrypt.compare(password, this.password, function (err, result) {
        if (err) {
            console.log('Password matching error ', err)
            return next(err, false)
        } else {
            console.log('Password match ', result)
            return next(null, result)
        }
    })
}

export default mongoose.model('Users', userSchema)