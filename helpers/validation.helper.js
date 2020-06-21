const MyValidator = require("./MyValidator");

const postSubscriptionsRequired = [
    "name",
    "phone",
    "email",
    "rut"
];

/**
 * Validamos las variables requeridas y su formato.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.postSubscriptionValidator = ( req, res, next) =>{

    let body = req.body;
    let myValidator = new MyValidator();
    /**
     * Revisamos si las variables requeridas han sido enviadas
     */
    postSubscriptionsRequired.forEach(element => {
        myValidator.check(element, body, null, false);
    });

    myValidator.check("email", body, "email");
    myValidator.check("rut", body, "rut");
    
    let isValid = myValidator.isValid();
    
    if (!isValid) {
        console.log("Not passed Validations", myValidator.getErrors());
        return res.status(422).json({
            errors: myValidator.getErrors()
        });
    } else {
        console.log("Passed all validations.");
        next();
    }
}
