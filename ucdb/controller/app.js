import {get_html_to_other_dom, other_dom} from "../view/scripts/get_other_html.js";
import {render, registerButton, searchButton, loginButton} from "../view/scripts/renderButtons.js"



/* cuida da parte do header do aplicação: main e nav-bar */

let applicationHeader = {_loginButton : null, _registerButton : null, _searchBar:null};
const $searchSubject = document.querySelector('[search-subject]');
const $registerUser = document.querySelector('[register-user]');
const $userLogin = document.querySelector('[user-login]');
const $main = document.getElementById("main-content");

async function initialize() { /*apenas atribuindo os valores para os elementos que vão fazer parte do shadow dom*/
    await get_html_to_other_dom("./view/struct/register_button.html");
    applicationHeader._registerButton = other_dom;
    await get_html_to_other_dom("./view/struct/login_button.html");
    applicationHeader._loginButton = other_dom;
    await get_html_to_other_dom("./view/struct/search_bar.html");
    applicationHeader._searchBar = other_dom;
}


/* user login*/
$userLogin.onclick = () => loginButton($main, applicationHeader);

/* Register user */
$registerUser.onclick = () => registerButton($main, applicationHeader);

/* search option*/
$searchSubject.onclick = () => searchButton($main, applicationHeader);


window.onbeforeunload = () => {window.localStorage.clear()};
window.onclose = () => {window.localStorage.clear()};

initialize();
