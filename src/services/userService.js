import UserModel from "./../models/userModel";
import {transErrors} from "./../../lang/vi";
import bcrypt from "bcrypt";

const saltRound = 7;

/**
 * Update userInfo
 * @param {userId} id 
 * @param {data update} item 
 * @returns 
 */
let updateUser = (id, item) => {
    return UserModel.updateUser(id, item);
};

/**
 * Update password for user
 * @param {user id} id 
 * @param {Data update} item 
 * @returns 
 */
let updatePassword = (id, dataUpdate) => {
    //return UserModel.updateUser(id, item);
    return new Promise(async (resolve, reject) => { 
        let currentUser =  await UserModel.findUserById(id);   
        if (!currentUser) { 
            return reject(transErrors.account_undefined);
        }
        
        let checkCurrentPassword = await currentUser.comparePassword(dataUpdate.currentPassword);
        if (!checkCurrentPassword) { 
            return reject(transErrors.user_current_password_failed);
        }
        

        let salt = bcrypt.genSaltSync(saltRound);
        await UserModel.updatePassword(id, bcrypt.hashSync(dataUpdate.newPassword, salt));

        resolve(true);
    })
};

module.exports = {
    updateUser: updateUser,
    updatePassword: updatePassword
};