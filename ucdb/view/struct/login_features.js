import {postData} from "../../controller/rest_controller.js";
export {loginFeatures}


function loginFeatures(applicationHeader) {
    applicationHeader = {
        _form: document.getElementById("login-form"),
        _closeButton: document.querySelector("[close-pop-up]")
    };

    applicationHeader._closeButton.onclick = () => {
        document.getElementById("pop-up-container-id").style.display = 'none';
    };

    applicationHeader._form.submit.onclick = () => {
        const requestUser = {
            email: applicationHeader._form.email.value,
            password: applicationHeader._form.psw.value
        };
        postData("localhost:8080/api/v1/login/", requestUser)
            .then(response => {
                const tokenValue = response.token;
                window.localStorage.setItem("___access_token___", tokenValue);
                applicationHeader._closeButton.click();
            }).catch(err => console.log(err));
    };
}