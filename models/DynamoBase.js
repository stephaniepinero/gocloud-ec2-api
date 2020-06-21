const AWS = require('aws-sdk');

class DynamoBase {

    /**
     * Por defecto las tablas pueden estar en distintas zonas geográficas.
     * Esta clase no se debería invocar de manera directa.
     * @param {*} region 
     */
    constructor(region = "us-west-2") {
        this.AWS = AWS;
        let DYNAMO_CONF = {
            region: region,
        };
        this.docClient = new AWS.DynamoDB.DocumentClient(DYNAMO_CONF);
    }

    /**
     * Esta función crea un registro en DynamoDB
     * @param {*} params 
     */
    save(params) {
        return new Promise((resolve, reject) => {
            // Call DynamoDB to add the item to the table
            this.docClient.put(params, function (err, data) {
                if (err) {
                    // console.log(err);
                    reject(err)
                } else {
                    // console.log("Success", data);
                    resolve(data);
                }
            });
        });
    }

    /**
     * Esta actualiza en DynamoDB
     * @param {*} params 
     */
    update(params) {
        return new Promise((resolve, reject) => {
            this.docClient.update(params, (err, data) => {
                if (err) {
                    console.error("Unable to update item. Error JSON:", err);
                    reject(err);
                } else {
                    console.log("UpdateItem succeeded:", data);
                    resolve(data.Attributes);
                }
            });
        }); // END PROMISE

    }

    /**
     * Esta función optiene un Item de DynamoDB
     * @param {*} params 
     */
    get(params) {
        return new Promise((resolve, reject) => {
            this.docClient.get(params, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        })
    }

    /**
     * Esta función hace un query en DynamoDB. Recordar usar el indice  correcto.
     * @param {*} params 
     */
    query(params) {
        return new Promise((resolve, reject) => {
            this.docClient.query(params, function (err, data) {
                if (err) {
                    console.log("Error", err);
                    reject(err);
                } else {
                    // console.log(data);
                    resolve(data);
                }
            });
        });
    }

    removeEmptyStringElements(obj) {
        for (var prop in obj) {
            if (typeof obj[prop] === 'object') { // dive deeper in
                this.removeEmptyStringElements(obj[prop]);
            } else if (obj[prop] === '') { // delete elements that are empty strings
                delete obj[prop];
            }
        }
        return obj;
    }


}

module.exports = DynamoBase;