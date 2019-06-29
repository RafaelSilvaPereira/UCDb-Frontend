import {loginFeatures} from "../struct/login_features.js";
import {search_subject} from "../struct/search_features.js";
import {register_features} from "../struct/register_features.js";
export {render, loginButton, searchButton, registerButton};

function render(local,elementHTMLDescription) {
    local.innerHTML = elementHTMLDescription;
}
function loginButton(local, applicationHeader) {
    render(local,applicationHeader._loginButton);
    console.log(applicationHeader);
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