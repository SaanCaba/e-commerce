import { DataValidate } from "../models/user"
import {Request, Response } from "express"
const router = require('express').Router()
const User = require("../models/user")
const Joi = require("joi")
const bcrypt = require('bcrypt')


router.post("/", async (req: Request , res: Response) => {
    try {
        console.log(req.body)
        const{error} = validate(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        //validamos mail
        const user = await User.findOne({email: req.body.email})
        console.log(user)
        if(!user){
            return res.status(401).send({message: "Invalid email or password"})

        }
        //validamos password
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )
        if(!validPassword){
            return res.status(401).send({message: "Invalid email or password"})
        }
        // generamos token, y se lo damos al usuario logeado!
        const token = user.generateAuthToken()
        res.status(200).send({data: {token, user}, message: "Logged in succesfully"})
    } catch (error) {
        res.status(500).send({message: "Internal server error"})
    }   
})

const validate = (data : DataValidate) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")

    })

    return schema.validate(data)
}


module.exports = router