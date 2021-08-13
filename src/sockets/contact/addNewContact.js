/**
 * @param io from socket.io from lib
 */
let addNewContact = async (io) => {
    io.on("connection", (socket) => {
        socket.on("add-new-contact", (data) => {
            let currentUser = { 
                id: socket.request.user._id,
                username: socket.request.user.username,
                avatar: socket.request.user.avatar
            };
            io.sockets.emit("response-add-new-contact", currentUser); 
        });
    });
};

module.exports = addNewContact;
