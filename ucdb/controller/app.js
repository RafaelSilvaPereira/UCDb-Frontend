import {get_html_to_other_dom, other_dom} from "../view/scripts/get_other_html.js";
import {UserModel} from "../model/user.js";
import {postData, getData} from "../controller/rest_controller.js";
import {isNumber, convertStringToValidUrlValue} from "./util/util.js"



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
    await get_html_to_other_dom("./view/struct/search_bar.html");
    applicationHeader._searchBar = other_dom;
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
    };

    applicationMain._form.submit.onclick = () => {
        const requestUser = {
            email: applicationMain._form.email.value,
            password: applicationMain._form.psw.value
        };
        console.log(JSON.stringify(requestUser));
        postData("localhost:8080/api/v1/login/",requestUser).then(response => console.log(response)).then(err => console.log(err))
    };
};


/* Register user */
$registerUser.onclick = () => {
    render(applicationHeader._registerButton);
    applicationMain = {
        _form: document.getElementById("register-form"),
        _closeButton: document.querySelector('[close-pop-up]')
    };

    applicationMain._closeButton.onclick = () => {
        document.getElementById("pop-up-container-id").style.display='none';
    };

    applicationMain._form.submit.onclick = () => {
        let form = applicationMain._form;
        const user = new UserModel(
            form.firstName.value,
            form.lastName.value,
            form.email.value,
            form.psw.value
        );
        console.log(JSON.stringify(user));
        postData("localhost:8080/api/v1/users/",user).then(response => console.log(response)).then(err => console.log(err))
    }

};


$searchSubject.onclick = () => {
    render(applicationHeader._searchBar);

    applicationMain = {
        _form : document.getElementById("search-bar")
    };

    let searchBarValue;

    applicationMain._form.searchById.onclick = () => {
        searchBarValue = applicationMain._form.searchBar.value;
        if(!isNumber(searchBarValue)) {
            alert("Pesquise apenas pelo codigo de identificação da disciplina");
        } else {
            getData(`localhost:8080/api/v1/subjects/id/${searchBarValue}`).then(response => console.log(response));
        }
    }

    applicationMain._form.searchBySubjectName.onclick = () => {
        searchBarValue = applicationMain._form.searchBar.value;
        if (searchBarValue === ""){
            getData("localhost:8080/api/v1/subjects/").then(response => console.log(response));
        } else {
            getData(`localhost:8080/api/v1/subjects/search/${convertStringToValidUrlValue(searchBarValue)}`).then(response => console.log(response));
        }
    }
};


initialize();
