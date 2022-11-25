const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')


export interface DataValidate {
    firstName?:string
    lastName?:string
    email: string
    lastname: string
}



const validate = (data : DataValidate) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")

    })
    return schema.validate(data)
};

module.exports = validate