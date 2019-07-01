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
        const requestUser = {
            email: applicationHeader._form.email.value,
            password: applicationHeader._form.psw.value
        };
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

                setTimeout(()=> {
                    loginButton(local, applicationHeader)
                }, 1000 * 60 * 60); // recriando o token

                applicationHeader._closeButton.click();
            }).catch(err => alert("algo de errado aconteceu, por favor tente novamente mais tarde"));
    };
}