class user {
    constructor(username, password) {
        this._username = username;
        this._password = password;
        this._cash = 0;
    }
    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
    get cash() {
        return this._cash;
    }
    set username(username) {
        this._username = username;
    }
    set password(password) {
        this._password = password;
    }
    set cash(cash) {
        this._cash = cash;
    }
     toJSON() {
        return {
            username: this._username,
            password: this._password,
            cash: this._cash
        };
    }
}

module.exports = user;