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
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPEPSS);
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, amount } = req.body;
    try {
        const payment = yield stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "Clothe",
            payment_method: id,
            confirm: true
        });
        console.log(payment);
        return res.send({ message: 'Pago realizado con éxito!' });
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = router;
