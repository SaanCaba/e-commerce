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
const router = require("express").Router();
const cor_passport = require("passport");
const generateAuthToken = require('./utils');
const User = require('../models/user');
const mongoose = require('mongoose');
router.get("/login/success", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,
            token: generateAuthToken()
        });
        console.log(req.user._json);
        const user = yield User.findOne({ email: req.user._json.email });
        if (!user) {
            console.log('entre');
            yield new User({
                firstName: req.user._json.firstName || req.user._json.given_name,
                lastName: req.user._json.lastName || req.user._json.family_name,
                email: req.user._json.email
            }).save();
            console.log('creado');
        }
        console.log('opa');
    }
    else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
}));
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});
router.get("/google", cor_passport.authenticate("google", ["profile", "email"]));
router.get("/google/callback", cor_passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
}));
router.get("/logout", (req, res) => {
    req.logout();
    if (process.env.CLIENT_URL) {
        res.redirect(process.env.CLIENT_URL);
    }
});
module.exports = router;
