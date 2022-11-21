const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')

export interface IUser {
    firstName : string
    lastName: string
    email:string
    password: string
}

export interface DataValidate {
    firstName?:string
    lastName?:string
    email: string
    lastname: string
}


const userSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}

})


// esto le genera el token al usuario
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATE, {expiresIn: "7d"})
    return token
}

const User: IUser = mongoose.model("user", userSchema)

const validate = (data : DataValidate) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")

    })
    return schema.validate(data)
};

module.exports = {User, validate}