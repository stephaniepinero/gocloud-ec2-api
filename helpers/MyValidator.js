const rutvalidator = require('chileanrutvalidator');
class MyValidator {

    constructor(debug = false) {
        this.errors = [];
        this.valid = true;
        this.debug = debug;
    }

    check(variable, body, type = null, optional = true) {
        // console.log("VARIABLE", variable, "OPCIONAL", optional);
        // console.log("Checking", variable, body[`${variable}`]);
        let variableValue = body[`${variable}`];
        if (variableValue == "undefined" || variableValue == null) {
            if (optional == false) {
                this.push(`${variable} is required`);
                return;
            }else{
                return;
            }
        }

        switch (type) {
            case "email":
                this.isEmail(variable, variableValue);
                break;
            case "rut":
                this.isRut(variable, variableValue);
                break;
            default:
                break;
        }
        return;
    }

    isNumber(variable, variableValue) {
        let number = Number(variableValue);
        console.log(number);
        if (isNaN(number)) {
            this.push(`${variable} debe de ser númerico.`);
        }
    }

    isRut(variable, variableValue) {

        if(!rutvalidator.validarRut(variableValue)){
            this.push(`${variable} [${variableValue}] is invalid.`);
        }
       
    }

    isEmail(variable, variableValue) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(String(variableValue).toLowerCase())) {
            console.log("Email no válido");
            this.push(`${variable} [${variableValue}] is invalid` );
        }


    }

    isUrl(variable, variableValue) {
        let regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (!regex.test(variableValue)) {
            console.log("Url NO válida", variable, variableValue);
            this.push(`${variable} no es una URL válida. ${variableValue}`);
        }
    }

    atLeastOne(data, arr){
        let exist = false;
        arr.forEach((element, idx, array) => {
            if(data[element]) exist = true;
            
            if(idx === array.length - 1 && !exist){
                this.push("Debes ingresar al menos un parametro válido");
            }
        });
    }   

    variableIn(variable, data, arr, optional = false){
        if( data[variable] == '' || data[variable] == 'undefined' ||  data[variable] == null){
            if(optional){
                return;
            } 
        }
        
        if(!arr.includes(data[variable])){
            this.push(`Valor de ${variable} inválido`);
        }
       
    }   

    push(errorMessage) {
        this.valid = false;
        this.errors.push(errorMessage);
    }

    isValid() {
        return this.valid;
    }

    getErrors() {
        return this.errors;
    }



}

module.exports = MyValidator;