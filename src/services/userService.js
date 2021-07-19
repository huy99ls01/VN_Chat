import UserModel from "./../models/userModel";


/**
 * Update userInfo
 * @param {userId} id 
 * @param {data update} item 
 * @returns 
 */
let updateUser = (id, item) => {
    return UserModel.updateUser(id, item);
};

module.exports = {
    updateUser: updateUser
};