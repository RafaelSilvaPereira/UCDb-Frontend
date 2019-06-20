class UserModel{
    constructor(firstName="", secondName="", email="", password="") {
        this.email = email;
        this.firstName = firstName;
        this.secondName = secondName;
        this.password = password;
    }
}

export {UserModel}