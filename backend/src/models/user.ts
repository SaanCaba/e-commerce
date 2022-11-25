const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

// export interface IUser {
//     firstName : string
//     lastName: string
//     email:string
//     password: string
// }

export interface DataValidate {
    firstName?:string
    lastName?:string
    email: string
    lastname: string
}


const User = mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required:false}
})


// esto le genera el token al usuario
User.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATE, {expiresIn: "7d"})
    return token
}


module.exports =  mongoose.model("User", User)