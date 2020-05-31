const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLogin(data) {
    let errors = {};

    //convert empty fields to empty strings to use validator functions

    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //username checks
    if(Validator.isEmpty(data.username)){
        errors.username = "Email field is required";
    }
    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    return{
        errors,
        isValid: isEmpty(errors)
    };
};