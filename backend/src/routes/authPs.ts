const router = require("express").Router();
const cor_passport = require("passport");
const generateAuthToken = require('./utils')
import {Request, Response } from "express"
const User = require('../models/user')
const mongoose = require('mongoose')

router.get("/login/success", async(req: any, res: Response) => {
    console.log(req.user)
    if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
			token: generateAuthToken()
		});
        console.log(req.user._json)

        const user = await User.findOne({email: req.user._json.email})
        
        if(!user){
            console.log('entre')
            await new User({
                firstName: req.user._json.firstName || req.user._json.given_name,
                lastName: req.user._json.lastName || req.user._json.family_name,
                email:req.user._json.email
            }).save()
            console.log('creado')
        }
        console.log('opa')
        
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req: Request, res: Response) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", cor_passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	cor_passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);


router.get("/logout", (req: any , res: Response) => {
	
    req.logout();
    if(process.env.CLIENT_URL){
        res.redirect(process.env.CLIENT_URL);
    }
});

module.exports = router;