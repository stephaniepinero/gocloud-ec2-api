const express = require('express');
const router = express.Router();

const MyValidations = require("../helpers/validation.helper");
const Subscriptions = require("../models/Subscriptions");
const rutvalidator = require("chileanrutvalidator");

/* GET home page. */
router.post('/subscriptions', 
[
    MyValidations.postSubscriptionValidator
],
async (req, res) => {
    try {
        let body = req.body;
        const subscriptions = new Subscriptions();
        const rut = rutvalidator.formatRut(body.rut,false,false);
        const subscriptionId = `SUB#${rut}`;
        const SK = `${subscriptionId}#DATA`;
        const params = {
            name: body.name,
            phone: body.phone,
            email: body.email,
            rut
        }
        await subscriptions.create(subscriptionId, SK,params);
        res.status(200).send('The subscription was created');
        
    } catch (error) {
        console.error(`Error on adding a subscription: `, error);
        res.status(500).send('The subscription cannot be created')
    }
});


module.exports = router;