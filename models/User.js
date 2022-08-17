class User {

    constructor(name, gender, birth, country, email, admin, password, photo, data){

        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country =country;
        this._email = email;
        this._admin =admin;
        this._password = password;
        this._photo = photo;
        this._data = data;
        this._register = moment().format("hh:mm:ss");
    }

    get register() {
        return this._register;
    }
    get name() {
        return this._name;
    }
    get gender() {
        return this._gender;
    }
    get birth() {
        return this._birth;
    }
    get country() {
        return this._country;
    }
    get email() {
        return this._email;
    }
    get admin() {
        return this._admin;
    }
    get password() {
        return this._password;
    }
    get photo() {
        return this._photo;
    }
    set photo(value) {
        this._photo = value;
    }
    set admin(value){
        this._admin = value;
    }
}