import addNewContact from "./contact/addNewContact";

/**
 * 
 * @param io from socket library 
 */
let initSockets = (io) => {
    addNewContact(io);
}

module.exports = initSockets;
