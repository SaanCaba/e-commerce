"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const User = require("../models/user");
const Joi = require("joi");
const bcrypt = require('bcrypt');
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        //validamos mail
        const user = yield User.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            return res.status(401).send({ message: "Invalid email or password" });
        }
        //validamos password
        const validPassword = yield bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid email or password" });
        }
        // generamos token, y se lo damos al usuario logeado!
        const token = user.generateAuthToken();
        res.status(200).send({ data: { token, user }, message: "Logged in succesfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}));
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};
module.exports = router;
