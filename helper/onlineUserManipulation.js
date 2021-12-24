module.exports = class onlineUserManipulation {
    constructor() {
        this.users = [];
    }
    addUser(id, username, _id, roomID = "public") {
        let user = this.getUserByUsername(username);
        if (!user) {
            let user = { id, username, _id, roomID };
            this.users.push(user);
        }
        return this.users;
    }
    removeUser(id) {
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUserByUsername(username) {
        return this.users.filter((user) => user.username === username)[0];
    }
    getUserByUserID(_id) {
        return this.users.filter((user) => user._id === _id)[0];
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getListUser(roomID = "public") {
        return this.users.filter((user) => user.roomID === roomID);
    }

}