/**
 * @Author: Marcelo Andrade - 117110910 / CC@UFCG
 * @Author: Áthila Matheus Barros Borges Matricula: 118210206. UFCG: Ciência da Computação.
 * @Author: Rafael da Silva Pereira Matricula: 117110921. UFCG: Ciência da Computação.
 *
 * Modulo responsavel por controlar o botão de registro.
 */


import {UserModel} from "../../../../model/user.js";
import {postData} from "../../../../controller/rest_controller.js";
export {register_features}


function register_features(applicationHeader) {
    applicationHeader = {
        _form: document.getElementById("register-form"),
        _closeButton: document.querySelector('[close-pop-up]')
    };


    applicationHeader._closeButton.onclick = () => {
        document.getElementById("pop-up-container-id").style.display = 'none';
    };

    applicationHeader._form.submit.onclick = () => {

        let form = applicationHeader._form;
        let valid = true;

        if (form.firstName.value.trim() === "") {
            valid = false;
            alert("Nome vazio invalido!");
        } else if (form.lastName.value.trim() === "") {

            valid = false;
            alert("Sobrenome vazio invalido!");
        } else if (form.email.value.trim() === "") {

            valid = false;
            alert("Email vazio invalido!");
        } else if (!form.email.value.includes("@")) {

            valid = false;
            alert("Email invalido, ausencia de '@'!");
        } else if (form.psw.value.trim() === "") {

            valid = false;
            alert("Senha vazia invalida!");
        } else if (form.psw.value.trim().length < 8) {

            valid = false;
            alert("Senha menor que oito caracteres!");
        }

        if (valid) {
            const user = new UserModel(
                form.firstName.value.trim(),
                form.lastName.value.trim(),
                form.email.value.trim(),
                form.psw.value.trim()
            );
            postData("students/", user)
                .then(response => {
                    const message = `o usuario ${response.firstName} ${response.secondName} teve cadastro com sucesso!`;
                    alert(message);

                    applicationHeader._closeButton.click();
                }).catch(err => alert("usuario já cadastrado"));
        }
    }
}