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
        const user = new UserModel(
            form.firstName.value,
            form.lastName.value,
            form.email.value,
            form.psw.value
        );
        postData("students/", user)
            .then(response => {
                // console.log(response);
                const message = `bem vindo ${response.firstName} ${response.secondName}`;
                alert(message);
                applicationHeader._closeButton.click();
            }).catch(err => alert("usuario já cadastrado"));
    }
}