/**
 * @Author: Rafael da Silva Pereira Matricula: 117110921. UFCG: Ciência da Computação.
 * @UserModel: Classe que representa o student que sera enviado ao backend.
 */

export {UserModel}

class UserModel{
    constructor(firstName="", secondName="", email="", password="") {
        this.email = email;
        this.firstName = firstName;
        this.secondName = secondName;
        this.password = password;
    }
}
