/**
 * @author Marcelo Andrade - 117110910 / CC@UFCG
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

        if (form.firstName.value === "") {
            valid = false;
            alert("Nome vazio invalido!");
        } else if (form.lastName.value === "") {

            valid = false;
            alert("Sobrenome vazio invalido!");
        } else if (form.email.value === "") {

            valid = false;
            alert("Email vazio invalido!");
        } else if (!form.email.value.includes("@")) {

            valid = false;
            alert("Email invalido, ausencia de '@'!");
        } else if (form.psw.value === "") {

            valid = false;
            alert("Senha vazia invalida!");
        } else if (form.psw.value.length < 8) {

            valid = false;
            alert("Senha menor que oito caracteres!");
        }

        if (valid) {
            const user = new UserModel(
                form.firstName.value,
                form.lastName.value,
                form.email.value,
                form.psw.value
            );
            postData("students/", user)
                .then(response => {
                    const message = `bem vindo ${response.firstName} ${response.secondName}`;
                    alert(message);
                    applicationHeader._closeButton.click();
                }).catch(err => alert("usuario já cadastrado"));
        }
    }
}