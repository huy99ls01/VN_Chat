import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: {type: Boolean, default: false},
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

ContactSchema.statics = {
    createNew(item) {
        return this.create(item);
    },
    /**
     * Find all items that related with user
     * @param {string} userId 
     */
    finAllByUsers(userId) {
        return this.find({
            $or: [
                {"userId": userId},
                {"contactId": userId}
            ]
        }).exec();
    },
    /**
     * Check exist of 2 user
     * @param {string} userId 
     * @param {string} contactId 
     */
    checkExist(userId, contactId) {
        return this.findOne({
            $or: [
                {$and: [
                    {"userId": userId},
                    {"contactId": contactId}
                ]},
                {$and: [
                    {"userId": contactId},
                    {"contactId": userId}
                ]}
            ]
        }).exec();
    },
    /**
     * Remove request
     * @param {string} userId 
     * @param {string} contactId 
     */
    removeRequestContact(userId, contactId) {
        return this.remove({
            $and: [
                {"userId": userId},
                {"contactId": contactId}
            ]
        }).exec();
    }
};

module.exports = mongoose.model("contact", ContactSchema)
