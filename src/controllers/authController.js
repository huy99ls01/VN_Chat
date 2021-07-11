let getLoginRegister = (req, res) => { 
    return res.render("auth/loginRegister");
};  

let getLogout = (req, rex) => { 
    //ds
};

module.exports = {
    getLoginRegister: getLoginRegister,
    getLogout: getLogout
};