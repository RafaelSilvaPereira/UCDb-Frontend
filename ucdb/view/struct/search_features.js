import {isNumber} from "../../controller/util/util.js";
import {getData} from "../../controller/rest_controller.js";
import {loginButton} from "../scripts/renderButtons.js";
import {SubjectenericProfile} from "./SubjectGenericProfile.js";
import {SubjectProfile} from "./SubjectProfile.js"
export {search_subject}




function execSearchById(local, applicationHeader, applicationMain) {
    const accessToken = window.localStorage.___access_token___;
    if((!accessToken)){
        alert("sem token");
        loginButton(local,applicationHeader, applicationMain);
    } else {
        let searchBarValue = applicationMain._form.searchBar.value;
        if (!isNumber(searchBarValue)) {
            alert("Pesquise apenas pelo codigo de identificação da disciplina");
        } else {
            getData(`localhost:8080/api/v1/subjects/id/${searchBarValue}`, `Bearer ${accessToken}`)
                .then(response => {
                    let $subjectContent = document.getElementById("$subjectContent");
                    $subjectContent.innerHTML = "";
                    let comments = response.comments;
                    let $subject = new SubjectProfile(comments);

                    $subject.setAttribute("id", response.id);
                    console.log(response.id, response.name, response.likes, response.dislikes);
                    $subject.setAttribute("name", response.name);
                    $subject.setAttribute("likes", response.likes);
                    $subject.setAttribute("dislikes", response.dislikes);

                    $subjectContent.appendChild($subject);
                })
                .catch(err => console.log(err));
        }
    }
}

function createSubjects(local, response) {
    let $subjectContent = document.getElementById("$subjectContent");
    $subjectContent.innerHTML = "";
    response.forEach(subject => {
        let novo = new SubjectenericProfile();
        novo.setAttribute("name", subject.name);
        novo.setAttribute("id", subject.id);
        $subjectContent.appendChild(novo);
    })
}

function execSearchBySubjectName(local, applicationHeader, applicationMain) {
    let searchBarValue = applicationMain._form.searchBar.value;

    if (searchBarValue === "") {
        getData("localhost:8080/api/v1/subjects/").then(response => console.log(response));
    } else {
        getData(`localhost:8080/api/v1/subjects/search/${encodeURI(searchBarValue.toUpperCase())}`)
            .then(response => {
            createSubjects(document.getElementById("main-container"), response);
        });
    }

}

function search_subject(local, applicationHeader) {
    let applicationMain = {
        _form: document.getElementById("search-bar")
    };
    applicationMain._form.searchById.onclick = () => {
        execSearchById(local, applicationHeader, applicationMain);
    };
    applicationMain._form.searchBySubjectName.onclick = () => {
        execSearchBySubjectName(local, applicationHeader, applicationMain);
    };
}
