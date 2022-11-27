import { Request, Response } from "express";
const router = require("express").Router();
const User = require('../models/user')
const validate = require('../models/utils')
const bcrypt = require('bcrypt')

//REGISTER ROUTE

router.post("/", async (req: Request, res: Response) => {
    try {
        console.log('hola')
        console.log(req.body)
        const { error } = validate(req.body)
        if(error){
            return res.status(400).send({message: error.details[0].message})
        }
        console.log('hola2')
        const user = await User.findOne({email: req.body.email})
        console.log('hola3')
        if(user){
            return res.status(409).send({message: "User with this email already exists"})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        User
        // guardamos el user con la contraseña hasheada
        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created succesfully"})

    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Internal server Error!"})
    }
})

module.exports = router