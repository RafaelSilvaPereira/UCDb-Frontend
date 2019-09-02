/**
 * @Author: Rafael da Silva Pereira Matricula: 117110921. UFCG: Ciência da Computação.
 * @Author: Áthila Matheus Barros Borges Matricula: 118210206. UFCG: Ciência da Computação.
 * Modulo que controla o login do usuario.
 */
import {postData} from "../../../../controller/rest_controller.js";
import {loginButton} from "../../../scripts/renderButtons.js";
export {loginFeatures}


function loginFeatures(local,applicationHeader) {
    applicationHeader._form = document.getElementById("login-form");
    applicationHeader._closeButton= document.querySelector("[close-pop-up]");

    applicationHeader._closeButton.onclick = () => {
        document.getElementById("pop-up-container-id").style.display = 'none';
    };

    applicationHeader._form.submit.onclick = () => {
        window.localStorage.clear();
        const requestUser = {
            email: applicationHeader._form.email.value.trim(),
            password: applicationHeader._form.psw.value.trim()
        };
        let valid = true;
        if (requestUser.email.trim() === "") {
            valid = false;
            alert("Email não valido");
        } else if (!requestUser.email.includes("@")) {
            valid = false;
            alert("Email não valido");
        } else if (requestUser.password.trim() === "") {
            valid = false;
            alert("Sua senha deve pelo menos 8 caracteres");
        } else if (requestUser.password.trim().length < 8) {
            valid = false;
            alert("Sua senha deve pelo menos 8 caracteres");
        }
        if (valid) {
            postData("login/", requestUser)
                .then(response => {
                    const tokenValue = response.token;
                    window.localStorage.setItem("___access_token___", tokenValue);
                    window.localStorage.setItem("___user_email___", requestUser.email);
                    setTimeout(() => {
                        alert("seu login ira expirar em menos de 5 minutos, " +
                            "salve seu progresso que em menos de 5 minutos\nestaremos refazendo o seu login");
                        window.localStorage.clear();
                    }, 1000 * 60 * 55);

                    setTimeout(() => {
                        loginButton(local, applicationHeader)
                    }, 1000 * 60 * 60); // recriando o token

                    applicationHeader._closeButton.click();
                }).catch(() => alert("Não foi possivel fazer o login, provavelmente este login não existe"));
        }
    }
}