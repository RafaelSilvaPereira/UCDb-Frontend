import {get_html_to_other_dom, other_dom} from "../view/scripts/get_other_html.js";
import {UserModel} from "../model/user.js";
import {postData} from "../controller/rest_controller.js";


/* cuida da parte do header do aplicação: main e nav-bar */

let applicationHeader = {_loginButton : null, _registerButton : null, _searchBar:null};
const $searchSubject = document.querySelector('[search-subject]');
const $registerUser = document.querySelector('[register-user]');
const $userLogin = document.querySelector('[user-login]');
const $main = document.getElementById("main-content");

/* cuida da parte do main da aplicacao */

let applicationMain = {};

/**/
function render(elementHTMLDescription) {
    $main.innerHTML = elementHTMLDescription;
}

async function initialize() { /*apenas atribuindo os valores para os elementos que vão fazer parte do shadow dom*/
    await get_html_to_other_dom("./view/struct/register_button.html");
    applicationHeader._registerButton = other_dom;
    await get_html_to_other_dom("./view/struct/login_button.html");
    applicationHeader._loginButton = other_dom;
}

/* user login*/
$userLogin.onclick = () => {

    render(applicationHeader._loginButton);

    applicationMain = {
        _form : document.getElementById("login-form"),
        _closeButton : document.querySelector("[close-pop-up]")
    };

    applicationMain._closeButton.onclick = () => {
        document.getElementById("pop-up-container-id").style.display='none';
    }

    applicationMain._form.submit.onclick = () => {
        const response = JSON.stringify(new UserModel("","",applicationMain._form.email.value, applicationMain._form.psw.value))
        console.log(response);
    }
}


/* Register user */
$registerUser.onclick = () => {
    render(applicationHeader._registerButton);
    applicationMain = {
        _form: document.getElementById("register-form"),
        _closeButton: document.querySelector('[close-pop-up]')
    };

    applicationMain._closeButton.onclick = () => {
        document.getElementById("pop-up-container-id").style.display='none';
    }

    applicationMain._form.submit.onclick = () => {
        let form = applicationMain._form;
        const user = new UserModel(
            form.firstName.value,
            form.lastName.value,
            form.email.value,
            form.psw.value
        );
        console.log(JSON.stringify(user));
        postData("localhost:8080/api/v1/users/",user).then(response => console.log(response)).console(err => console.log(err))
    }

}
let a = () => console.log("oi");
initialize();
a();