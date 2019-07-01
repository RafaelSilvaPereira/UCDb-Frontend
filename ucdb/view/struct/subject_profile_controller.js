import {postData} from "../../controller/rest_controller.js";
export {giveLike, giveDislike}

function giveLike(subjectID, $like, $dislike, $likeCount, $dislikeCount, subject={_userEnjoyed:false, _userDisliked:false}){
    const userToken = window.localStorage.___access_token___;
    try {
        if (!subject._userEnjoyed && !subject._userDisliked) { // 0 0
            if (!!userToken) {

                postData(`subjects/like/${subjectID}`, null, `Bearer ${userToken}`)
                    .catch(err => {throw  new Error()});

                $like.classList.add("active-like");
                $likeCount.innerText = "" + (parseInt($likeCount.textContent) + 1);
                $dislikeCount.innerText = "" + $dislikeCount.textContent;

                subject._userEnjoyed = true;
                subject._userDisliked = false;
            } else {
                throw new Error("User Token does not exist");
            }
        } else if (subject._userEnjoyed && !subject._userDisliked) {  // 1 0
            if (!!userToken) {
                $like.classList.remove("active-like");
                postData(`subjects/unlike/${subjectID}`, null, `Bearer ${userToken}`)
                    .catch(err => {throw  new Error()})
                $likeCount.innerText = "" + (parseInt($likeCount.textContent) - 1);
                $dislikeCount.innerText = "" + $dislikeCount.textContent;

                subject._userEnjoyed = false;
                subject._userDisliked = false; //
            } else {
                throw new Error("server error!")
            }
        } else if (!subject._userEnjoyed && subject._userDisliked) { // 0 1
            if (!!userToken) {
                postData(`subjects/like/${subjectID}`, null, `Bearer ${userToken}`)
                    .catch(err => {throw  new Error()}) // garantido pela api que o like remove o deslike

                $like.classList.add("active-like");
                $dislike.classList.remove("active-dislike");
                $likeCount.innerText = "" + (parseInt($likeCount.textContent) + 1);
                $dislikeCount.innerText = "" + (parseInt($dislikeCount.textContent) - 1);
                subject._userEnjoyed = true;
                subject._userDisliked = false;
            } else {
                throw  new Error()
            }
        }
    } catch (e) {
        console.log(e);
        alert("Algo deu errado no sistema, por favor tente outra vez mais tarde!");
    }
}
function giveDislike(subjectID, $like, $dislike, $likeCount, $dislikeCount, subject={_userEnjoyed:false, _userDisliked:false}) {
    const userToken = window.localStorage.___access_token___;
    try {
        if (!subject._userEnjoyed && !subject._userDisliked) { // 0 0
            if (!!userToken) {
                postData(`subjects/dislike/${subjectID}`, null, `Bearer ${userToken}`)
                    .catch(err => {throw  new Error()});
                $dislike.classList.add("active-dislike");
                $dislikeCount.innerText = "" + (parseInt($dislikeCount.textContent) + 1);
                subject._userDisliked = true;
                $likeCount.innerText = "" + $likeCount.textContent;
                subject._userEnjoyed = false;
            } else {
                throw new Error("server error!");
            }

        } else if (subject._userEnjoyed && !subject._userDisliked) {  // 1 0
            if (!!userToken) {
                postData(`subjects/dislike/${subjectID}`, null, `Bearer ${userToken}`)
                    .catch(err => {throw  new Error()});
                $like.classList.remove("active-like");
                $dislike.classList.add("active-dislike");
                $likeCount.innerText = "" + (parseInt($likeCount.textContent) - 1);
                subject._userEnjoyed = false;
                $dislikeCount.innerText = "" + (parseInt($dislikeCount.textContent) + 1);
                subject._userDisliked = true;
            } else {
                throw new Error();
            }
        } else if (!subject._userEnjoyed && subject._userDisliked) { // 0 1
            postData(`subjects/undislike/${subjectID}`, null, `Bearer ${userToken}`)
                .catch(err => {throw  new Error()});
            $dislike.classList.remove("active-dislike");
            $dislikeCount.innerText = "" + (parseInt($dislikeCount.textContent) - 1);
            subject._userDisliked = false;
            $likeCount.innerText = "" + $likeCount.textContent;
            subject._userEnjoyed = false;
        }
    } catch (e) {
        alert("Algo deu errado no sistema, por favor tente outra vez mais tarde!");
    }
}
