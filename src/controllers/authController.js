import e from "express";
import {validationResult} from "express-validator/check";

let getLoginRegister = (req, res) => { 
    return res.render("auth/master");
};  

let postRegister = (req, rex) => { 
    let errorArr = [];
    let validationErrors = validationResult(req);
    if (!validationResult(req).isEmpty()) {
        let errors = Object.values(validationErrors.mapped())
        errors.forEach(item => {
            errorArr.push(item.msg)
        });
        console.log(errorArr)
        return;
    }

    console.log(req.body)
};

module.exports = {
    getLoginRegister: getLoginRegister,
    postRegister: postRegister
};