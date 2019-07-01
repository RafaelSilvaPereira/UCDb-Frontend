import {loginFeatures} from "../struct/login_features.js";
import {search_subject} from "../struct/search_features.js";
import {register_features} from "../struct/register_features.js";
import {ranking_features} from "../struct/ranking_features.js";
export {render, loginButton, searchButton, registerButton, rankingButton};

function render(local,elementHTMLDescription) {
    local.innerHTML = elementHTMLDescription;
}
function loginButton(local, applicationHeader) {
    render(local,applicationHeader._loginButton);
    loginFeatures(local, applicationHeader);
}

function searchButton(local,applicationHeader) {
    render(local,applicationHeader._searchBar);
    search_subject(local,applicationHeader);
}
function registerButton(local,applicationHeader) {
    render(local,applicationHeader._registerButton);
    register_features(local, applicationHeader);
}

function rankingButton(local,applicationHeader) {
    render(local, applicationHeader._ranking);
    ranking_features(local, applicationHeader);
}