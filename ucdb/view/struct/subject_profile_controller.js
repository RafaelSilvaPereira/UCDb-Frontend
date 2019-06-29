import {postData} from "../../controller/rest_controller.js";

const $like = document.getElementById("like");
const $dislike = document.getElementById("dislike");
const $comments = document.getElementById("comments");
let $likeCount = $like.firstElementChild;
let $dislikeCount = $dislike.firstElementChild;
let likeFlag = false;
let dislikeFlag = false;
const userToken = window.localStorage.___access_token___;
const subjectID = document.getElementById("subject-id").textContent;



$like.onclick = () => {
    try {
        if (!likeFlag && !dislikeFlag) { // 0 0
            if (!!userToken) {

                postData(`localhost:8080/api/v1/subjects/like/${subjectID}`, null, `Bearer ${userToken}`)

                $like.classList.add("active-like");
                $likeCount.innerText = "" + (parseInt($likeCount.textContent) + 1);
                likeFlag = true;
                $dislikeCount.innerText = "" + $dislikeCount.textContent;
                dislikeFlag = false;
            } else {
                throw new Error("User Token does not exist");
            }
        } else if (likeFlag && !dislikeFlag) {  // 1 0
            if (!!userToken) {
                $like.classList.remove("active-like");
                postData(`localhost:8080/api/v1/subjects/unlike/${subjectID}`, null, `Bearer ${userToken}`).catch(err => {throw  new Error()})
                $likeCount.innerText = "" + (parseInt($likeCount.textContent) - 1);
                likeFlag = false;
                $dislikeCount.innerText = "" + $dislikeCount.textContent;
                dislikeFlag = false; //
            } else {
                throw new Error("server error!")
            }
        } else if (!likeFlag && dislikeFlag) { // 0 1
            if (!!userToken) {
                postData(`localhost:8080/api/v1/subjects/like/${subjectID}`, null, `Bearer ${userToken}`).catch(err => {throw  new Error()}) // garantido pela api que o like remove o deslike

                $like.classList.add("active-like");
                $dislike.classList.remove("active-dislike");
                $likeCount.innerText = "" + (parseInt($likeCount.textContent) + 1);
                likeFlag = true;
                $dislikeCount.innerText = "" + (parseInt($dislikeCount.textContent) - 1);
                dislikeFlag = false;
            } else {
                throw  new Error()
            }
        }
    } catch (e) {
        alert("error....");
    }
};
$dislike.onclick = () => {
    try {
        if (!likeFlag && !dislikeFlag) { // 0 0
            if (!!userToken) {
                postData(`localhost:8080/api/v1/subjects/dislike/${subjectID}`, null, `Bearer ${userToken}`).catch(err => {throw  new Error()})
                $dislike.classList.add("active-dislike");
                $dislikeCount.innerText = "" + (parseInt($dislikeCount.textContent) + 1);
                dislikeFlag = true;
                $likeCount.innerText = "" + $likeCount.textContent;
                likeFlag = false;
            } else {
                throw new Error("server error!");
            }

        } else if (likeFlag && !dislikeFlag) {  // 1 0
            if (!!userToken) {
                postData(`localhost:8080/api/v1/subjects/dislike/${subjectID}`, null, `Bearer ${userToken}`);
                $like.classList.remove("active-like");
                $dislike.classList.add("active-dislike");
                $likeCount.innerText = "" + (parseInt($likeCount.textContent) - 1);
                likeFlag = false;
                $dislikeCount.innerText = "" + (parseInt($dislikeCount.textContent) + 1);
                dislikeFlag = true;
            } else {
                throw new Error();
            }
        } else if (!likeFlag && dislikeFlag) { // 0 1
            postData(`localhost:8080/api/v1/subjects/undislike/${subjectID}`, null, `Bearer ${userToken}`).catch(err => {throw  new Error()})
            $dislike.classList.remove("active-dislike");
            $dislikeCount.innerText = "" + (parseInt($dislikeCount.textContent) - 1);
            dislikeFlag = false;
            $likeCount.innerText = "" + $likeCount.textContent;
            likeFlag = false;
        }
    } catch (e) {
        alert("não deu certo....");
    }
}

