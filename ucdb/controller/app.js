/**
 * @Author: Rafael da Silva Pereira
 * Modulo de controle de delegação de responsabilidades do sistema.
 * apartir dos botões da view, renderizam seus respectivos html's e junto com eles suas funcionaldiades
 */

import {get_html_to_other_dom, other_dom} from "../view/scripts/get_other_html.js";
import {registerButton, searchButton, loginButton, rankingButton} from "../view/scripts/renderButtons.js"



/* cuida da parte do header do aplicação: main e nav-bar */
let applicationHeader = {_loginButton : null, _registerButton : null, _searchBar:null};
const $searchSubject = document.querySelector('[search-subject]');
const $registerUser = document.querySelector('[register-user]');
const $userLogin = document.querySelector('[user-login]');
const $subjectRanking = document.querySelector('[subjects-ranking]');
const $main = document.getElementById("main-content");

async function initialize() { /*apenas atribuindo os valores para os elementos que vão ser carregados na dom*/
    await get_html_to_other_dom("./view/struct/components/Register/register_button.html");
    applicationHeader._registerButton = other_dom;
    await get_html_to_other_dom("./view/struct/components/Login/login_button.html");
    applicationHeader._loginButton = other_dom;
    await get_html_to_other_dom("./view/struct/components/Search/search_bar.html");
    applicationHeader._searchBar = other_dom;
    await get_html_to_other_dom("./view/struct/components/Ranking/subjects_ranking.html");
    applicationHeader._ranking = other_dom;
}


/* Quando o botão de logar usuario for clicado a ação gerada por loginButton vai ser disparada*/
$userLogin.onclick = () => loginButton($main, applicationHeader);

/* Quando o botão de registrar usuario for clicado a ação gerada por registerButton vai ser disparada*/
$registerUser.onclick = () => registerButton($main, applicationHeader);

/* Quando o botão de busca for clicado a ação gerada por searchButton vai ser disparada*/
$searchSubject.onclick = () => searchButton($main, applicationHeader);

/* Quando o botão de ranking for clicado a ação gerada por subjectRanking vai ser disparada*/
$subjectRanking.onclick = () => rankingButton($main, applicationHeader);

/*ao sair da pagina remove as credenciais da seção  usuario, bem como qualquer vestigio da pagina do localstorage */
window.onbeforeunload = () => {window.localStorage.clear()};
window.onclose = () => {window.localStorage.clear()};

initialize();
